<style lang="less" rel="stylesheet/less">
#imageModal {
    @red: #555;
    .upload-wrapper {
        margin: 0 auto;
        height: 600px;
        padding: 0;
        margin-left: -1px;
        margin-bottom: -1px;
        -ms-user-select: none;
        -webkit-user-select: none;
        -o-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }

    .upload-container {
        border: 0px solid #dadada;
        color: #838383;
        font-size: 12px;
        margin-top: 10px;
        background-color: #fff;
        width: 920px;
        /* height: 100%; */
        .form-group {
            margin-bottom: 0;
        }
    }

    .modal-content {
        width: 924px;
    }

    .upload-side {
        position: relative;
        width: 100px;
        height: 100%; //background-color: #DFD7CA;
        float: left;
    }

    .upload-menu {
        position: absolute;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        height: 30%;
        top: 10px;
    }

    .upload-menu li {
        position: relative;
        color: white;
        background-color: darken(@red, 5%);
        height: 40px;
        width: 100%;
        padding-left: 10px;
        line-height: 40px;
        margin-bottom: 15px;
        cursor: pointer;
    }

    .upload-menu li.selected {
        color: white;
        background-color: darken(@red, 5%);
    }

    .upload-menu li.selected:before {
        position: absolute;
        background-color: darken(@red, 5%);
        height: 10px;
        width: 10px;
        content: '';
        transform: rotateZ(45deg);
        right: -5px;
        top: 15px;
    }

    .upload-menu li:hover,
    .upload-menu li.selected:hover:before {
        background-color: @red;
    }

    .upload-container {
        border-left: 0px;
        padding-left: 120px;
    }

    .upload-side {
        select {
            position: absolute;
            margin: 0;
            width: 100%;
            top: 30%;
            padding-left: 5px;
            padding-right: 25px;
            border-radius: 0;
        }

        .upload-change {
            position: absolute;
            bottom: 0;
            width: 100%;
            left: 0;
            border-radius: 0;
        }
    }
    .i-upload .i-upload-prev {
        width: 96px;
        margin-left: 2px;
        margin-right: 2px;
    }
    .cus-upload {
        margin-top: 4px;
    }
}
</style>
<template>
  <div id="imageModal"
       class="modal fade"
       tabindex="-1"
       role="dialog"
       data-backdrop="static">
    <div class="modal-dialog"
         role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title"
              id="exampleModalLabel">图片库</h6>
          <button type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body upload-wrapper">
          <div class="upload-side">
            <ul class="upload-menu">
              <li :class="{'selected': storeMode=='USER'}"
                  @click="choiceStorage('USER')">我的图库</li>
              <li :class="{'selected': storeMode=='SYS'}"
                  @click="choiceStorage('SYS')">系统图库</li>
            </ul>
            <select v-model="filterShowId"
                    class="custom-select">
              <!-- <option value="-1">全部</option> -->
              <option :value="one.id"
                      v-for="one in showList">{{one.title}}</option>
            </select>
            <button type="button"
                    class="btn btn-info upload-change"
                    v-show="storeMode=='USER'"
                    @click="toggleEditState">{{editing?'退出编辑':'进入编辑'}}</button>
          </div>
          <div class="upload-container">
            <image-upload ref="ImageUpload"
                          v-model="imgstr"
                          :multiple="true"
                          :maximum="3"
                          :size="1024 * 128"
                          :readonly="!editing"
                          :is-crop="isCrop"
                          :param="param"
                          :readonly-imgs="[$root.bgimage]"></image-upload>
            <button class="btn btn-outline-primary btn-sm btn-min cus-upload"
                    type="button"
                    v-if="editing && isCrop">
              选择图片并裁剪
              <i-upload ref="Upload"
                        name="files"
                        v-model="files"
                        :multiple="false"
                        :size="size"
                        :post-action="uploadHost"
                        @input-file="inputFile"
                        @input-filter="imageFilter"
                        @input="afterUpload" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <Crop ref="Crop"></Crop>
  </div>
</template>

<script>
import ImageUpload from './ImageUpload.vue'
import IUpload from 'vue-upload-component'
import uploadEmit from '../common/uploadEmit.js'
import Crop from '../components/crop/Crop.vue'
let afterChoice
export default {
    props: ['show'],
    mixins: [new uploadEmit('files')],
    data() {
        return {
            /* 选择的图片库 */
            filterShowId: this.show.id,
            /* 图库模式 */
            storeMode: 'USER',
            editing: false,
            imgs: [],
            imgstr: '',
            //是否进行裁剪
            isCrop: false,
            size: 1024 * 1024
        }
    },
    computed: {
        showList() {
            if (this.storeMode == 'USER' && this.$root.userinfo.type !== 0) {
                return this.$root.userShowList
            } else {
                return this.$root.sysShowList
            }
        },
        param() {
            return {
                use: this.isCrop ? 'page' : 'default',
                showId: this.filterShowId
            }
        }
    },
    methods: {
        openModal() {
            $('#imageModal')
                .modal('show')
                .on('hide.bs.modal', () => {
                    afterChoice = null
                    this.editing = false
                    this.$refs.ImageUpload.reset()
                })
        },
        hideWin() {
            $('#imageModal').modal('hide')
        },
        choiceStorage(storeMode) {
            if (storeMode == 'SYS') this.editing = false
            this.storeMode = storeMode
        },
        getImgstr(use) {
            const self = this
            Common.fetch({
                url: '/image/getImages',
                type: 'GET',
                data: {
                    use: use || 'default'
                },
                success(data) {
                    let arr = []
                    data.forEach(item => {
                        if (item.showId == self.filterShowId) {
                            arr.push(item.src)
                        }
                    })
                    self.imgs = data
                    self.imgstr = arr.length ? arr.join(',') : self.$root.bgimage
                    //手动重新给oldValue赋值
                    self.$refs.ImageUpload.oldValue = self.imgstr.split(',')
                }
            })
        },
        pick(func, use) {
            const self = this
            this.isCrop = use == 'page'
            afterChoice = afterChoice || func || function() {}
            self.getImgstr(use)
            self.openModal()
        },
        toggleEditState: function() {
            this.editing = !this.editing
        },
        remove: function() {
            const self = this
            let $lis = $('#uploader.edit').find('.state-complete.selected'),
                ids = [],
                srcs = []
            $lis.each(function(index, dom) {
                ids.push($(dom).data('id'))
                srcs.push(
                    $(dom)
                        .find('.imgWrap img')
                        .attr('src')
                )
            })
            if (ids.length == 0) {
                Message.warning('请先选中要删除的图片')
                return
            }
            Common.fetch({
                url: '/image/removeImages',
                type: 'POST',
                data: {
                    ids: JSON.stringify(ids),
                    srcs: JSON.stringify(srcs)
                },
                success: function(result) {
                    if (result['status'] == 1) {
                        Message.success('删除成功')
                        exports.initImgs()
                    } else {
                        if ($('#loginModal').css('display') == 'none') {
                            //Header.unlogin(window.location.href)
                            self.hideWin()
                        }
                    }
                }
            })
        },
        openCrop(path, afterClose) {
            const self = this
            this.$refs.Crop.initCrop(
                path,
                function(data) {
                    data.path = path.replace('/', '')
                    Common.fetch({
                        url: '/image/crop',
                        data,
                        success(data) {
                            self.$refs.Crop.close(data.path)
                        }
                    })
                },
                afterClose
            )
        },
        afterUpload(files) {
            console.log('files', files)
            const file = files[files.length - 1]
            if (!file || file.active) return
            if (file.success) {
                this.openCrop(file.response.result[0].src, src => {
                    for (const file of file.response.result) {
                        // 加上时间错是为了避免缓存问题
                        src = file.src + '?' + new Date().getTime()
                        this.imgstr += this.imgstr ? ',' + src : src
                        this.imgs.push(file)
                    }
                })
            } else {
                this.$refs.Upload.active = true
            }
        }
    },
    watch: {
        show(newval) {
            this.filterShowId = newval.id
        },
        filterShowId() {
            this.imgstr = this.getImgstr(this.isCrop ? 'page' : 'default')
        },
        showList(newval) {
            this.filterShowId = this.storeMode == 'USER' ? this.show.id : newval[0].id
        }
    },
    components: {
        IUpload,
        ImageUpload,
        Crop
    },
    mounted() {
        const self = this
        // 绑定选择图片点击事件
        $(this.$el).on('click', '.i-upload-prev', function(e) {
            // 删除图片
            if (e.target.className != 'i-upload-remove') {
                // 编辑模式下选择图片不进行回调函数执行
                if (self.editing) return
                if (!self.imgs.length) {
                    Common.msg('默认图仅做展示，请先上传图片后进行选择', '', 'warning')
                    return
                }
                // 获得图片src和id传入pick回调函数
                let src = this.getAttribute('data-src').split('?')[0],
                    imgObj = self.imgs.find(item => {
                        if (item.src == src) return item.id
                    })
                afterChoice(src, imgObj.id)
                self.hideWin()
            }
        })
    }
}
</script>
