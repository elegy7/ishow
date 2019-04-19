<style lang="less" rel="stylesheet/less">
@import '../../assets/style/support.less';

.content {
    overflow-y: hidden;
    width: 100%;
}

.box-1 {
    height: 100%;
    margin-left: 0px;
    margin-right: 30px;
    width: 220px;
    background-color: rgb(45, 45, 45);
    flex: 0 0 220px;

    .diy-scroll {
        width: 130px;
        height: 100%;
        padding-right: 130px;
        padding-left: 72px;
        overflow-y: hidden;
        margin: 0 auto;
        border-right: solid 1px @line;
        &:hover {
            .move-up,
            .move-down {
                display: inline-block;
            }
        }
    }

    .diy-scroll-btn {
        position: absolute;
        top: 50%;
        height: 100px;
        width: 30px;
        margin-left: 115px;

        .fa-angle-up,
        .fa-angle-down {
            border: 1px solid #dfdfdf;
            background-color: #efefef;
            color: #999;
            text-align: center;
            width: 25px;
            height: 20px;
            line-height: 20px;
            font-size: 20px;
            border-radius: 3px;
            text-decoration: none;
            &:hover {
                background-color: darken(#efefef, 10%);
            }
        }
    }

    .add-item {
        background-color: lighten(@black, 5%);
        width: 80%;
        cursor: pointer;
    }

    .img-list {
        position: relative;
        width: 130px;
        margin: 0 auto;
        padding: 30px 0 40px 0;

        .li-page {
            position: relative;
            border: 2px solid @gray;
            height: 154px;
            width: 104px;
            margin-bottom: 10px;
            cursor: pointer;
            list-style: none;

            .a-page {
                position: absolute;
                height: 450px;
                width: 300px;
                top: -150px;
                left: -100px;
                transform: scale(1/3, 1/3);
                -o-transform: scale(1/3, 1/3);
                -moz-transform: scale(1/3, 1/3);
                -webkit-transform: scale(1/3, 1/3);
                background-size: 100% 100%;
                overflow: hidden;
            }

            .for-check {
                position: absolute;
                top: 0;
                height: 100%;
                width: 100%;
                opacity: 0;
                z-index: 99;
            }

            .remove-page {
                position: absolute;
                top: 0px;
                right: 0px;
                margin-top: -7px;
                margin-right: -7px;
                z-index: 100;
            }
            &.selected {
                border-color: #00ffff;
            }
        }
    }

    .add-page {
        position: absolute;
        background-color: darken(rgb(203, 75, 75), 5%);
        color: white;
        left: 0px;
        padding: 10px;
        text-align: center;
        bottom: 0;
        right: 0px;
        z-index: 100;
        font-size: 14px;
        cursor: pointer;

        &:hover {
            background-color: rgb(203, 75, 75);
        }
    }

    .page-num {
        position: absolute;
        left: -50px;
        top: 50%;
        margin-top: -24px;
        height: 40px;
        width: 50px;
        color: white;
        font-size: 30px;
        color: @gray;
    }
    .move-up {
        position: absolute;
        left: -55px;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 3px;
        text-align: center;
        width: 30px;
        top: 10%;
        width: 30px;
        color: white;
        font-size: 20px;
        color: @gray;
        opacity: 0.3;
        display: none;
        &:hover {
            opacity: 1;
        }
    }

    .move-down {
        position: absolute;
        left: -55px;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 3px;
        text-align: center;
        width: 30px;
        bottom: 10%;
        width: 30px;
        color: white;
        font-size: 20px;
        color: @gray;
        opacity: 0.3;
        display: none;
        &:hover {
            opacity: 1;
        }
    }
}

.box-2 {
    position: relative;
    text-align: center;

    .nav-pills .nav-link {
        margin: 2px 0;
        border-color: #dfd7ca;
        color: #8e8c84;
        padding: 0.3rem 0.9rem;
        &:active,
        &:focus {
            background-color: white;
        }
        &.active {
            background-color: #f8f5f0;
        }
    }

    .option-area {
        position: relative;
        height: 100%;
        width: 100%;
        padding: 10px;
        background-color: white;
    }
}

.box-3 {
    height: 100%;
}

.box-4 {
    // padding-left: 7%;
    height: 620px;
    flex: 0 0 350px;

    button.prevBtn {
        margin: 20px 0 0 0;
        height: 50px;
        width: 150px;
        float: right;
    }

    button.saveBtn {
        margin: 20px 0 0 0;
        height: 50px;
        width: 150px;
        float: left;
    }

    button.publishBtn {
        margin: 20px 0 0 0;
        height: 50px;
        width: 200px;
        float: left;
    }

    .prev-warp {
        position: absolute;
        z-index: 10;
        height: 100%;
        min-height: 800px;
        background-color: white;
    }
}

.config-panel,
.preview-panel {
    height: 480px;
    width: 320px;
    background-color: rgb(45, 45, 45);
    position: relative;
    overflow: hidden; // float: left;

    &.config-panel {
        background-color: transparent;
        background-size: 100% 100%;
        background-position: cover;
        display: none;

        &.selected {
            display: inline-block;
        }
    }

    a {
        color: inherit;
    }
}
// 小元素
.item-little {
    position: absolute;
    opacity: 1;
    top: 0;
    left: 0;
    text-align: center;
    box-sizing: content-box !important;
}

.video-span,
.map_icon {
    background-position: center;
    background-size: 100% 100%;
}

#contextMenu {
    li {
        padding: 4px 0;
    }
}
.box-2,
.box-3,
.box-4 {
    padding-top: 20px;
}
</style>
<template>
  <div class="container-fluid">
    <div class="row content">
      <!-- 背景图列表 -->
      <div class="box-1 col-2">
        <div class="diy-scroll">
          <ul id="imgList"
              class="img-list diy-scroll-list">
            <li :class="['li-page', {'selected': page.pageIndex==pageIndex}]"
                v-for="(page, $index) in pagesList">
              <div class="a-page"
                   :style="{'background-image':'url('+page.src+')'}"
                   :data-id="page.id"
                   :data-index="page.pageIndex"></div>
              <img class="remove-page"
                   src="../../assets/images/close.png"
                   @click="removePage(page.id, page.pageIndex, $event)">
              <div class="for-check"
                   @click="checkPage(page)"></div>
              <div class="page-num">{{$index+1}}</div>
              <div class="move-up"
                   @click="switchPageIndex(page, pagesList[$index-1])"
                   v-if="$index!=0"><i class="fa fa-angle-up" /></div>
              <div class="move-down"
                   @click="switchPageIndex(page, pagesList[$index+1])"
                   v-if="$index!=pagesList.length-1"><i class="fa fa-angle-down" /></div>
            </li>
          </ul>
          <div class="add-page"
               @click="openModal">
            <span class="fa fa-plus"></span>
            &nbsp;
            <span>添加页面</span>
          </div>
          <div class="diy-scroll-btn">
            <a class="fa fa-angle-up"
               href="javascript:void(0);"
               @click="scrollToTop"></a>
            <a class="fa fa-angle-down"
               href="javascript:void(0);"
               @click="scrollToBottom"></a>
          </div>
        </div>
      </div>
      <!-- 背景图列表 -->

      <!-- 元素列表 -->
      <div class="box-2 col-2">
        <ul class="nav nav-pills">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle"
               data-toggle="dropdown"
               href="#"
               role="button"
               aria-haspopup="true"
               aria-expanded="false">添加组件</a>
            <div class="dropdown-menu"
                 x-placement="bottom-start"
                 style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 40px, 0px);">
              <a class="dropdown-item"
                 href="javascript:void(0);"
                 @click="openItemModal('image')">图片组件</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item"
                 href="javascript:void(0);"
                 @click="openItemModal('text')">文字组件</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item"
                 href="javascript:void(0);"
                 @click="openItemModal('button')">按钮组件</a>
            </div>
          </li>
        </ul>
        <br>
        <ul class="nav nav-pills flex-column">
          <li class="nav-item">
            <a :class="['nav-link', {'active': itemIndex===-1}]"
               href="javascript:void(0);"
               @click="checkItemMenu(-1)">
              基础设置&nbsp;&nbsp;&nbsp;
            </a>
          </li>
          <li class="nav-item not-uncheck"
              v-for="(item, $index) in activeItemsList"
              @click="checkItemMenu($index)">
            <a :class="['nav-link', {'active': $index==itemIndex}]"
               href="javascript:void(0);">
              {{itemFilter(item.itemType)}}
              <span class="fa fa-times fr mt5"
                    @click="removeItem($index, $event)"></span>
            </a>
          </li>
        </ul>
      </div>
      <!-- 元素列表 -->

      <!-- 控件配置 -->
      <div class="box-3 col-3">
        <div class="card">
          <div class="card-header">{{itemFilter(activeItem.itemType)}}</div>
          <div class="card-body not-uncheck">
            <base-form class="option-area base-form"
                       v-if="itemIndex===-1"
                       :show="show"
                       @change="baseChange"></base-form>
            <image-form class="option-area"
                        v-if="activeItem.itemType=='image'"></image-form>
            <text-form class="option-area"
                       v-if="activeItem.itemType=='text'"></text-form>
            <button-form class="option-area"
                         v-if="activeItem.itemType=='button'"></button-form>
          </div>
        </div>
      </div>

      <!-- 元素可视化配置 -->
      <div class="box-4 col">
        <!-- 动画选择 -->
        <animate-menu ref="AnimateMenu"
                      class="not-uncheck"></animate-menu>
        <!-- 动画选择 -->
        <!-- 预览窗口 -->
        <div class="prev-warp">
          <div id="configPanels"
               class="not-uncheck">
            <div class="config-panel default selected"
                 :style="'background-image:url('+ $root.bgimage +')'"
                 v-if="pagesList.length==0">
            </div>
            <div v-for="page in pagesList"
                 :class="['config-panel', {'selected': pageIndex == page.pageIndex}]"
                 :data-index="page.pageIndex"
                 :data-id="page.id"
                 :style="{'background-image':'url('+page.src+')'}"></div>
            <ul id="contextMenu"
                class="hiddenBox">
              <li @click="menuCopy">
                <i class="fa fa-copy"></i>&nbsp;复制</li>
              <li @click="menuCenter">
                <i class="fa fa-align-justify"></i>&nbsp;居中</li>
              <li @click="menuBefore">
                <i class="fa fa-arrow-up"></i>&nbsp;上移一层</li>
              <li @click="menuAfter">
                <i class="fa fa-arrow-down"></i>&nbsp;下移一层</li>
              <li @click="menuUncheck">
                <i class="fa fa-ban"></i>&nbsp;取消选中</li>
              <li @click="menuRemove">
                <i class="fa fa-trash"></i>&nbsp;&nbsp;删除</li>
            </ul>
          </div>
          <div class="row mt5">
            <div class="col-12">
              <button type="button"
                      class="btn btn-outline-secondary btn-block"
                      @click="changeBgimage">修改背景图</button>
            </div>
          </div>
          <div class="row mt10">
            <div class="col">
              <button type="button"
                      class="btn btn-secondary btn-block"
                      @click="toPreview">预览</button>
            </div>
            <!-- <div class="col">
              <button type="button"
                      class="btn btn-info btn-block"
                      @click="saveShow">保存</button>
            </div> -->
          </div>
        </div>
      </div>
      <!-- 元素可视化配置 -->

      <!-- 预览并发布窗口 -->
      <div class="modal"
           tabindex="-1"
           id="previewWin">
        <div class="modal-dialog">
          <div class="modal-content"
               style="width: 800px; height: 600px;">
            <div class="modal-header">
              <h5 class="modal-title">效果预览</h5>
              <button type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body row">
              <div class="col-7">
                <iframe id="previewPanel"
                        class="preview-panel">
                </iframe>
              </div>
              <div class="col-5">
                <div id="codeOutput"
                     class="am-fl"
                     style="margin-top:80px;"></div>
                <div style="padding: 15px 0;">(扫一扫二维码可以在手机上预览)</div>
                <button id="renderStatic"
                        type="button"
                        class="btn btn-outline-secondary"
                        v-show="!downlodUrl"
                        @click="renderStatic">
                  生成静态
                </button>
                <a id="download"
                   target="_blank"
                   rel="nofollow"
                   v-show="downlodUrl"
                   :href="downlodUrl">
                  <button type="button"
                          class="btn btn-primary"
                          @click="hideDownload">立即下载</button>
                </a>
                <button type="button"
                        class="btn btn-info"
                        style="margin-left:5px;"
                        @click="renderStatic">确认发布</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 预览并发布窗口 -->

      <!-- 图片库窗口 -->
      <upload-store ref="UploadStore"
                    :show="show"
                    v-if="isShowInited"></upload-store>
      <!-- 图片库窗口 -->
    </div>
  </div>
</template>

<script>
/* jquery插件 */
import '@elegy7/spare/No need to compile/mousewhell'
import '../../assets/plugins/jquery.transit.js'
import '../../assets/plugins/jquery.simple-color.js'
import '../../assets/plugins/jquery.qrcode.min.js'
import ItemRender from '../../common/itemRender.js'
import Move from '../../common/move'
/* form组件 */
import UploadStore from '../../components/UploadStore.vue'
import AnimateMenu from './inner/AnimateMenu.vue'
import BaseForm from './form/Base.vue'
import TextForm from './form/Text.vue'
import ImageForm from './form/Image.vue'
import ButtonForm from './form/Button.vue'

export default {
    data() {
        return {
            show: {},
            // 页面列表
            pagesList: [],
            // 组件列表
            itemsList: [],
            // 当前选中页面
            activePage: {},
            // 当前选中组件
            activeItem: {},
            // 下载地址
            downlodUrl: ''
        }
    },
    computed: {
        isShowInited() {
            return Object.keys(this.show).length > 0
        },
        showId() {
            return parseInt(this.$route.query.showId)
        },
        pageIndex() {
            return this.activePage.pageIndex || 1
        },
        itemIndex() {
            return this.activeItemsList.indexOf(this.activeItem)
        },
        activeItemsList() {
            return this.itemsList.filter(item => {
                return item.pageIndex == this.pageIndex
            })
        }
    },
    methods: {
        // 初始化全部页面
        initShow() {
            const self = this
            Common.fetch({
                url: '/show',
                data: {
                    id: this.showId
                },
                type: 'GET',
                again: true,
                success(data) {
                    self.show = data
                    self.pagesList = data.pages || []
                    // 如果传递了pageIndex, 选中对应的页面
                    self.initItem()
                },
                final(res) {
                    if (res.status == 'NOT_EXIST') {
                        self.$router.push('/')
                    }
                }
            })
        },
        // 初始化全部小元素 handlerType: 操作类型
        initItem(handlerType) {
            const self = this // 查询这个show的所有组件
            Common.fetch({
                url: '/item',
                data: {
                    showId: this.showId
                },
                type: 'GET',
                success(data) {
                    self.itemsList = data
                    self.$nextTick(function() {
                        if (handlerType == 'add') {
                            self.activeItem = self.itemsList[self.itemsList.length - 1]
                            self.scrollToPage()
                            $('.config-panel.selected')
                                .find('.item-little')
                                .last()
                                .trigger('mousedown')
                        }
                        if (handlerType == 'remove') {
                            self.activeItem = {}
                            self.scrollToPage()
                        }
                    })
                }
            })
        },
        // 选中一个页面
        checkPage(page) {
            this.activePage = page
            // 执行小元素动画
            this.$nextTick(() => {
                $('.config-panel.selected')
                    .find('.item-little')
                    .css({
                        opacity: 0
                    })
                    .each(function(index, element) {
                        let aType = $(element).attr('data-animate')
                        ItemRender.animate[aType]($(element))
                    })
            })
        },
        // 删除一个页面
        removePage(pageId, pageIndex, e) {
            console.log(pageId, pageIndex, e)
            const self = this
            Common.Modal.confirm('删除后数据无法恢复,确定删除这个页面吗?', '', function() {
                Common.fetch({
                    url: '/page/remove',
                    type: 'POST',
                    data: {
                        showId: self.showId,
                        id: pageId
                    },
                    success() {
                        // 更新页面列表
                        if ($('.config-panel.selected').attr('data-index') == pageIndex) {
                            $('.for-check')
                                .first()
                                .trigger('click')
                            self.scrollToTop()
                        }
                        $(`.config-panel[data-index='${pageIndex}']`).remove()
                        $(e.target)
                            .closest('li')
                            .remove()
                        // self.pagesList.splice($index, 1)
                    }
                })
            })
        },
        // 添加一个组件
        addItem(itemType, data, isCopy) {
            const self = this // 如果没有选中页面,则不添加

            if (!this.pageIndex == -1) {
                Common.msg('请先选中一个页面后再添加组件!', '', 'warning')
                return
            }
            let defaultAttr = {
                width: 100
            }
            if (itemType == 'text') {
                defaultAttr = {
                    height: 40,
                    width: 70,
                    text: '文字组件',
                    textAlign: 'center',
                    textWeight: 'inherit',
                    color: 'rgb(45,45,45)',
                    btnType: 'link',
                    fontSize: '14px'
                }
            }
            if (itemType == 'button') {
                defaultAttr = {
                    height: 40,
                    width: 150,
                    translateX: 85,
                    translateY: 400,
                    text: '按钮组件',
                    radius: '5px',
                    fontSize: '16px',
                    color: '#ffffff',
                    borderColor: '#e6e6e6',
                    bgColor: '#666699',
                    btnType: 'link',
                    href: 'http:// '
                }
            }
            // 组装参数
            if (!isCopy) {
                data = Object.assign(
                    data || {},
                    {
                        itemType: itemType,
                        pageIndex: this.pageIndex,
                        showId: this.showId
                    },
                    defaultAttr
                )
            }
            // 同步到数据库
            Common.fetch({
                url: '/item/add',
                type: 'POST',
                data: data,
                success() {
                    self.initItem(isCopy ? 'copy' : 'add')
                }
            })
        },
        // 移除一个组件
        removeItem(index, e) {
            const self = this
            let itemId = this.activeItemsList[index].id
            e && e.stopPropagation()
            if (!itemId) {
                Common.msg('请选中一个元素进行删除', '', 'warning')
                return
            }
            Common.Modal.confirm('确定要删除这个组件吗?', '', function() {
                Common.fetch({
                    url: '/item/remove',
                    data: {
                        id: itemId
                    },
                    success() {
                        self.initItem('remove')
                        self.uncheck()
                    }
                })
            })
        },
        // 选中组件菜单
        checkItemMenu(index, handle) {
            // 防止事件触发死循环
            if (handle) return
            // 暂存当前选中组件
            if (index === -1) {
                if (!$.isEmptyObject(this.activeItem)) {
                    this.activeItem = {}
                } else {
                    return
                }
                this.uncheck()
            } else {
                this.activeItem = this.activeItemsList[index]
            }
            // 选中预览图窗口中对应组件
            if (index != -1) {
                $('.config-panel.selected')
                    .find('.item-little')
                    .eq(index)
                    .trigger('mousedown')
            } else {
                $('#configPanels').trigger('handClick')
            }
        },
        // 更新预览图
        toPreview() {
            if (!this.pagesList.length) {
                Common.msg('请先添加页面', '', 'warning')
                return
            }
            const href = window.location.origin + '/app?showId=' + this.showId
            // 预览前先保存
            this.saveShow(true)
            $('#codeOutput')
                .html('')
                .qrcode({
                    width: 200,
                    height: 200,
                    correctLevel: 0,
                    text: href
                })
            $('#previewPanel').attr('src', href + '&showMenu=1')
            $('#previewWin').modal('show')
        },
        saveItem(item, callback) {
            item.delay = item.delay && parseInt(item.delay)
            item.speed = item.speed && parseInt(item.speed)
            Common.fetch({
                url: '/item/update',
                data: item,
                success() {
                    callback && callback()
                }
            })
        },
        // 整体保存
        saveShow(noMsg) {
            const self = this
            const pass = $('.base-form').fireValid()
            if (!pass) return
            let saved = 0
            // 保存基础配置
            Common.fetch({
                url: '/show/save',
                data: {
                    swipeType: this.show.swipeType,
                    allowLoop: this.show.allowLoop,
                    loadingType: this.show.loadingType,
                    desc: this.show.desc,
                    iconUrl: this.show.iconUrl,
                    title: this.show.title || '未定义标题'
                },
                native: true,
                success(result) {
                    if (result['status'] == 1) {
                        if (saved > 0 || self.itemsList.length == 0) {
                            if (noMsg != true) {
                                Common.msg('保存成功')
                                // 修改title
                                let result = self.$root.showList.find(item => item.id == self.showId)
                                result.title = self.show.title
                            }
                        }
                        saved++
                    } else {
                        if ($('#loginModal').css('display') == 'none') {
                            $('#previewWin').modal('close')
                            self.$root.unlogin(window.location.href)
                        }
                    }
                }
            })
            // 保存小元素配置
            /* if (this.itemsList.length == 0) return
            let arr = this.itemsList.map((item, i) => {
                return {
                    _id: this.itemsList[i].id,
                    src: this.itemsList[i].src,
                    height: this.itemsList[i].height,
                    width: this.itemsList[i].width,
                    translateX: this.itemsList[i].translateX,
                    translateY: this.itemsList[i].translateY,
                    animate: this.itemsList[i].animate,
                    delay: this.itemsList[i].delay,
                    speed: this.itemsList[i].speed,
                    zIndex: this.itemsList[i].zIndex,
                    href: this.itemsList[i].href,
                    color: this.itemsList[i].color,
                    bgColor: this.itemsList[i].bgColor,
                    borderColor: this.itemsList[i].borderColor,
                    radius: this.itemsList[i].radius,
                    text: this.itemsList[i].text,
                    textAlign: this.itemsList[i].textAlign,
                    shadow: this.itemsList[i].shadow,
                    fontSize: this.itemsList[i].fontSize,
                    btnType: this.itemsList[i].btnType,
                    origin: this.itemsList[i].origin,
                    phone: this.itemsList[i].phone
                }
            })
            Common.fetch({
                url: '/item/save',
                data: {
                    data: JSON.stringify(arr)
                },
                native: true,
                success(result) {
                    if (result['status'] == 1) {
                        // 手动更新左侧列表预览
                        $('.a-page .item-little').remove()
                        $('.a-page').each(function(index, element) {
                            ItemRender.renderItem(element, self.itemsList)
                        })
                        if (saved > 0) {
                            if (noMsg != true) Common.msg('保存成功')
                        }
                        saved++
                    } else {
                        if ($('#loginModal').css('display') == 'none') {
                            self.$root.unlogin(window.location.href)
                        }
                    }
                }
            }) */
        },
        // 生成静态zip
        renderStatic() {
            Common.fetch({
                url: '/show/renderStatic',
                data: {
                    showId: Common.Util.getRequest()['showId']
                },
                success: result => {
                    this.downlodUrl = location.origin + '/' + result
                    $('#renderStatic').hide()
                }
            })
        },
        // 下载静态zip
        hideDownload() {
            this.downlodUrl = ''
        },
        // 组件复制
        menuCopy() {
            let $item = $('.item-little-actived'),
                itemType,
                data = {}

            if ($item[0].nodeName == 'IMG') {
                itemType = 'image'
            } else if ($item[0].nodeName == 'ARTICLE') {
                itemType = 'text'
            } else {
                Common.msg('只能复制图片或文字或按钮组件', '', 'warning')
                return
            }
            Object.assign(data, this.activeItem, {
                id: undefined,
                translateX: 0,
                translateY: 0,
                showId: this.showId
            })
            this.saveItem(this.activeItem, () => {
                this.addItem(itemType, data, true)
            })
        },
        // 组件上移一层
        menuBefore() {
            $('.item-little-actived').css('zIndex', ++this.activeItem.zIndex)
        },
        // 组件下移一层
        menuAfter() {
            $('.item-little-actived').css('zIndex', --this.activeItem.zIndex)
        },
        // 组件删除
        menuRemove() {
            this.removeItem(this.itemIndex)
        },
        // 组件取消选中
        menuUncheck() {
            this.uncheck()
        },
        // 组件居中
        menuCenter() {
            this.activeItem.translateX = parseInt(160 - this.activeItem.width / 2)
            $('.item-little-actived').css('x', this.activeItem.translateX)
            $('.item-little-actived').trigger('handChange', true)
        },
        // 选择图片进行页面添加
        openModal() {
            const self = this
            this.$refs.UploadStore.pick((src, imageId) => {
                Common.fetch({
                    url: '/page/add',
                    data: {
                        showId: this.showId,
                        imageId
                    },
                    type: 'POST',
                    success(data) {
                        data.src = src + '?' + new Date().getTime()
                        // 手动触发compiled事件以更新图片列表
                        self.pagesList.push(data)
                        self.$nextTick(function() {
                            self.scrollToBottom(() => (self.activePage = data))
                        })
                    }
                })
            }, 'page')
        },
        // 选择图片进行组件添加
        openItemModal(itemType) {
            if (itemType == 'image') {
                this.$refs.UploadStore.pick((src, imageId) => {
                    this.addItem(itemType, { imageId })
                }, 'default')
            } else {
                this.addItem(itemType)
            }
        },
        // 修改背景图
        changeBgimage() {
            this.$refs.UploadStore.pick((src, imageId) => {
                const $selected = $('.config-panel.selected')
                const pageId = $selected.data('id')
                const pageIndex = $selected.data('index')
                Common.fetch({
                    url: '/page/update',
                    type: 'POST',
                    data: {
                        imageId,
                        id: pageId
                    },
                    success() {
                        $(`div[data-index=${pageIndex}]`).css({ backgroundImage: `url(${src})` })
                    }
                })
            }, 'page')
        },
        // 修改页面顺序
        switchPageIndex(from, to) {
            const self = this
            Common.fetch({
                url: '/page/switchPageIndex',
                type: 'POST',
                data: { from, to },
                success() {
                    self.initShow()
                }
            })
        },
        itemFilter(value) {
            switch (value) {
                case 'text':
                    value = '文字组件'
                    break
                case 'image':
                    value = '图片组件'
                    break
                case 'button':
                    value = '按钮组件'
                    break
                case 'video':
                    value = '视频组件'
                    break
                case 'map':
                    value = '地图组件'
                    break
                default:
                    value = '基础设置'
            }
            return value
        },
        scrollToPage() {
            const top = $('.selected .a-page').offset().top - 900
            if (top < 0) return
            $('.diy-scroll-list').css({ top: -top })
        },
        // 页面列表向上滚动到顶
        scrollToTop(callback) {
            callback = typeof callback == 'function' ? callback : function() {}
            $('.diy-scroll-list').animate({ top: 0 }, 300, callback)
        },
        // 页面列表向下滚动到底
        scrollToBottom(callback) {
            const $nav = $('.diy-scroll-list')
            const scrollTopMax = $nav[0].offsetHeight - $('.diy-scroll')[0].offsetHeight
            callback = typeof callback == 'function' ? callback : function() {}
            /* 如果已经到顶就不滚动了 */
            if (-$nav[0].offsetTop >= scrollTopMax) return
            $nav.animate({ top: -scrollTopMax }, 300, callback)
        },
        // 取消组件选中
        uncheck() {
            this.activeItem = {}
            $('.item-block-plugin').remove()
            $('.item-little-actived').removeClass('item-little-actived')
            this.$refs.AnimateMenu && this.$refs.AnimateMenu.hide()
        },
        baseChange(show) {
            this.show.iconUrl = show.src
        }
    },
    watch: {
        showId() {
            this.pagesList = []
            this.initShow()
        },
        // 页面列表
        pagesList(newVal) {
            if (!newVal.length) return
            // 渲染页面上的小元素
            this.$nextTick(() => {
                this.checkPage(newVal[0])
            })
        },
        // 小元素列表
        itemsList() {
            const self = this
            $('.item-little').remove()
            $('.diy-scroll-list')[0].style.top = 0
            $('.config-panel').each(function(index, element) {
                ItemRender.renderItem(element, self.itemsList)
            })
            $('.a-page').each(function(index, element) {
                ItemRender.renderItem(element, self.itemsList)
            })
        }, // 当前选中小元素
        activeItem: {
            handler(newval, oldval) {
                // 显示&隐藏右侧动画选择栏
                const itemType = newval.itemType
                if (itemType == 'image' || itemType == 'button' || itemType == 'text') {
                    !this.$refs.AnimateMenu.shown && this.$refs.AnimateMenu.show()
                } else {
                    // this.$refs.AnimateMenu.hide()
                    $('.block-spot').hide()
                }

                /* 必须是选中的小元素从元素渲染层面发生改变后才进行样式设置 */
                this.$nextTick(() => {
                    // 保存组件
                    if (oldval.itemType && JSON.stringify(newval) != JSON.stringify(oldval)) {
                        console.log('invoke save')
                        this.saveItem(oldval)
                    }
                    // console.log('activeItem', newval)
                    let $activedItem = $('.item-little-actived')
                    if ($activedItem.length == 0) {
                        return
                    }
                    $activedItem.css({
                        x: newval.translateX,
                        y: newval.translateY,
                        height: newval.height,
                        width: newval.width,
                        zIndex: newval.zIndex,
                        borderRadius: newval.radius,
                        fontSize: newval.fontSize
                    })
                    if (itemType == 'text' || itemType == 'button') {
                        $activedItem.text(newval.text)
                    }
                    $activedItem.trigger('handChange', true)
                })
            },
            deep: true
        }
    },
    components: {
        AnimateMenu,
        UploadStore,
        BaseForm,
        ImageForm,
        TextForm,
        ButtonForm
    },
    mounted() {
        // 模块初始化
        this.initShow()
        // 绑定第三方事件
        initSideBarScroll(this)
        initMove(this)
        // 点击空白处将组件取消选中
        $(document).on('click', e => {
            if (!$(e.target).closest('.not-uncheck').length && !$.isEmptyObject(this.activeItem)) {
                this.uncheck()
            }
        })
    }
}
// 初始化侧边图片列表栏模拟滚动条事件
function initSideBarScroll() {
    // 鼠标滚动事件
    $('.diy-scroll').mousewheel(function(e, detail) {
        let $nav = $(this).find('.diy-scroll-list')
        this.scrollTopMax = $nav[0].offsetHeight - this.offsetHeight
        // 阻止原生事件
        e.preventDefault()
        if (detail == -1) {
            if (-$nav[0].offsetTop >= this.scrollTopMax) return
            $nav[0].style.top = $nav[0].offsetTop - 50 + 'px'
        }
        if (detail == 1) {
            if ($nav[0].offsetTop >= 0) return
            $nav[0].style.top = $nav[0].offsetTop + 50 + 'px'
        }
    })
}
// 初始化组件拖动缩放插件
function initMove($Vue) {
    Move.init({
        parent: '#configPanels',
        child: '.item-little',
        check(e) {
            // 选中左侧组件列表中对应的组件
            let $target = $(e.target),
                $itemLittles = $target.closest('.config-panel').find('.item-little'),
                index = $itemLittles.index($target)
            $Vue.checkItemMenu(index, true)
            $Vue.activeItem = $Vue.activeItemsList[index]
        },
        rightCheck(e) {
            $('body')
                .off('click')
                .on('click', function() {
                    $('#contextMenu').hide()
                })
            $('#contextMenu').show()
            $('#contextMenu').css({
                position: 'fixed',
                backgroundColor: 'white',
                listStyle: 'none',
                cursor: 'pointer',
                paddingLeft: 5,
                zIndex: 1000,
                width: 100,
                top: e.pageY,
                left: e.pageX
            })
        },
        change(e) {
            if (!$Vue.activeItem) return
            $Vue.activeItem.height = parseInt(e.height)
            $Vue.activeItem.width = parseInt(e.width)
            $Vue.activeItem.translateX = parseInt(e.position.left)
            $Vue.activeItem.translateY = parseInt(e.position.top) // 按钮文字居中

            if (['button', 'text'].includes($Vue.activeItem.itemType)) {
                $('.item-little-actived').css({
                    'line-height': e.height + 'px'
                })
            }
        }
    })
}
</script>
