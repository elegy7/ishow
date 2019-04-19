<style lang="less" rel="stylesheet/less">
#baseForm {
    .i-upload .i-upload-prev {
        width: 100%;
    }
    .image-detail-warp {
        min-height: 100px;
        .image-detail {
            border-radius: 5px;
            width: 100px;
            height: 100px;
            background-size: 100% auto;
            background-position: center;
            background-repeat: no-repeat;
            background-color: rgba(0, 0, 0, 0.7);
        }
    }
}
</style>
<template>
  <div id="baseForm">
    <div class="form-group">
      <label>应用标题</label>
      <input type="text"
             class="form-control mt5"
             placeholder="未定义标题"
             v-model="show.title"
             data-valid="['required']" />
    </div>
    <!-- <div class="form-group">
            <label>页面切换动画</label><br>
            <button type="button" class="btn btn-outline-secondary" :class="{'active': show.swipeType==1}" @click="changeSwipeType(1)">
                滑动不变
            </button>
            <button type="button" class="btn btn-outline-secondary" :class="{'active': show.swipeType==2}" @click="changeSwipeType(2)">
                滑动渐小
            </button>
            <button type="button" class="btn btn-outline-secondary" :class="{'active': show.swipeType==3}" @click="changeSwipeType(3)">
                同时滑动
            </button>
        </div>
        <div class="form-group">
            <label>是否允许从最后一页翻到第一页</label><br>
            <button type="button" class="btn btn-outline-secondary" :class="{'active': show.allowLoop==1}" @click="changeAllowLoop(1)">
                允许
            </button>
            <button type="button" class="btn btn-outline-secondary" :class="{'active': show.allowLoop==0}" @click="changeAllowLoop(0)">
                不允许
            </button>
        </div>

        <hr data-am-widget="divider" style="" class="am-divider am-divider-default" />
        <p class="hr-title mt5">分割线下为选填内容</p> -->

    <div class="form-group">
      <div class="row">
        <div class="col-12">
          <file-upload label="背景音乐"
                       accept="audio/mp3"
                       :size="1024*1024*2"
                       :host="host"
                       ref="FileUpload"
                       v-model="show.musicUrl"></file-upload>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="row">
        <div class="col-4">
          <label>分享图片</label>
          <button class="btn btn-secondary btn-xs"
                  type="button"
                  @click="openModal">
            {{show.iconUrl ? '更改' : '选择'}}
          </button>
        </div>
        <div class="col-8 image-detail-warp">
          <div v-if="show.iconUrl"
               :style="{backgroundImage: 'url('+show.iconUrl+')' }"
               :data-src="show.iconUrl"
               class="image-detail">
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>分享文本</label>
        <textarea rows="3"
                  id="doc-ta-1"
                  style="width:100%;"
                  name="desc"
                  v-model="show.desc"></textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-secondary btn-block"
                @click="save">保存</button>
      </div>
    </div>
  </div>
</template>
<script>
import FileUpload from '../../../components/FileUpload.vue'
export default {
    props: ['show'],
    data() {
        return {
            host: Common.SERVER + '/show/save'
        }
    },
    methods: {
        changeLoading(e) {
            this.$parent.show.loadingType = e
        },
        changeSwipeType(e) {
            this.$parent.show.swipeType = e
        },
        changeAllowLoop(e) {
            this.$parent.show.allowLoop = e
        },
        openModal() {
            this.$parent.$refs.UploadStore.pick(src => {
                this.$emit('change', { src })
            })
        },
        save() {
            if (this.$refs.FileUpload.files.length) {
                // 上传图片并保存
                this.$refs.FileUpload.save(this.show, () => {
                    Common.msg('保存成功')
                })
            } else {
                // 只保存
                Common.fetch({
                    url: '/show/save',
                    data: this.show,
                    success() {
                        Common.msg('保存成功')
                    }
                })
            }
        }
    },
    components: {
        FileUpload
    },
    mounted() {
        $(this.$el).bindValid()
    }
}
</script>
