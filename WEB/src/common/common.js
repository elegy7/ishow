import { Valid, Util, Modal } from '@elegy7/spare'
import Viewer from '../assets/plugins/viewer'
import Toastr from 'toastr'
import '@elegy7/spare/No need to compile/toastr.less'
import '@elegy7/spare/No need to compile/prototype'
import '@elegy7/spare/No need to compile/fn'
export default {
    SERVER: '/api',
    Util,
    Valid,
    Modal,
    reloadAfterLogin: false, // 为true时, 登录完成后刷新页面
    init(Vue) {
        window.Common = this
        this.Util = Util
        this.Vue = Vue
        Valid.init()
        //初始化图片查看器
        initViewerEvent(this.viewer)
    },
    viewer: function(srcArr, index) {
        index = index || 0
        /*将图片生成图片查看器所需的li*/
        let lis = srcArr.map(one => {
            return `<li><img src="${one}"></li>`
        })
        $('#picViewer').remove()
        $('.viewer-container').remove()
        let $picViewer = $(`<ul id="picViewer" class="hide">${lis.join('')}</ul>`).appendTo('body')
        /*eslint-disable*/
        new Viewer($picViewer.last()[0])
        $picViewer.find(`img:eq(${index})`).trigger('click')
    },
    msg: function(toastrMessage, toastrHeading, toastrType) {
        switch (toastrType) {
            case 'danger':
                toastrType = 'error'
                break
            case 'warn':
                toastrType = 'warning'
                break
            default:
                toastrType = toastrType || 'success'
        }
        Toastr.options.timeOut = 1500
        Toastr.options.positionClass = 'toast-top-left'
        Toastr[toastrType](toastrMessage, toastrHeading)
    },
    srcWarp(url) {
        return url
    },
    clone(obj) {
        return $.extend(true, {}, obj)
    },
    fetch(config) {
        const successFunc = config.success || function() {}
        config.url = config.url.indexOf('http') == -1 ? this.SERVER + config.url : config.url
        if (['get', 'GET'].indexOf(config.type) == -1) {
            config.type = 'POST'
            config.headers = {
                'content-type': 'application/json;charset=utf-8'
            }
            config.data = JSON.stringify(config.data)
        }
        config.xhrFields = {
            withCredentials: true
        }

        config.success = res => {
            // 如果选择自行处理返回值
            if (config.native) {
                successFunc(res)
                return
            }
            if (res.status != 1) {
                config.final && config.final(res)
                if (res.status == 'SESSION_TIMEOUT') {
                    if (config.again) this.reloadAfterLogin = true
                    this.Vue.userinfo = {}
                    return
                }
                Common.msg(res.summary, '', 'warn')
            } else {
                successFunc(res.result, res)
            }
        }
        $.ajax(config)
    }
}

function initViewerEvent(viewer) {
    //阻止浏览器右键菜单
    $(document)
        .on('mouseover', '.image-detail', function(e) {
            document.oncontextmenu = function() {
                return false
            }
        })
        .on('mouseout', '.image-detail', function(e) {
            document.oncontextmenu = null
        })

    $(document).on('mouseup', '.image-detail', function(e) {
        e.stopPropagation()
        e.preventDefault()
        //只有右键点击时执行查看操作
        if (e.which != 3) return
        var src, srcIndex, srcArr, $target, index
        $target = $(e.target)
        if ($target[0].nodeName == 'IMG') {
            src = $target.closest('.image-detail').attr('src')
        } else {
            src = $target.attr('data-src')
            src = src || $target.closest('.image-detail').data('src')
        }
        //如果图片设置了data-src, 将它取出来以供图片查看器使用
        srcArr = $target.attr('data-srcs') ? $target.attr('data-srcs').split(',') : srcArr
        //如果是oss图片, 截取掉裁剪参数
        srcIndex = src.indexOf('?x-oss-process=image/resize')
        src = srcIndex == -1 ? src : src.slice(0, srcIndex)
        if (!src || src == location.href.split('#')[0]) return
        //如果是多张图片查看, 获取点击图片在图片列表中的位置
        srcArr = srcArr || [src]
        //如果src不是完整路劲, 则补全
        src = Common.srcWarp(src)
        srcArr = srcArr.map(item => {
            return Common.srcWarp(item)
        })
        index = srcArr.indexOf(src)
        //判断是否有多张图片, 如果没有, 则将单张加入图片组
        viewer(srcArr, index)
    })
}
