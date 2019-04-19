<style lang="less" rel="stylesheet/less">
@import url('../../assets/style/support.less');
/*确认裁剪按钮*/
.jcrop-cut-btn {
    position: relative;
    margin-top: -42px;
    border: 2px solid;
    border-radius: 5px;
    top: 70px;
    left: 50%;
    margin-left: -45px;
    width: 90px;
    height: 36px;
    line-height: 34px;
    color: #ffffff;
    border-color: #ffffff;
    text-align: center;
    cursor: pointer;
}

.jcrop-cut-btn:hover {
    color: #e6e6e6;
    border-color: #e6e6e6;
}

.compile-upload {
    height: 100%;
    width: 100%;
    position: fixed;
    background-color: #2d2d2d;
    top: 0px;
    overflow-y: auto;
    z-index: 10000;
    display: none;
}

.compile-upload-edit {
    width: 100%;
    height: 800px;
    margin: auto;
    margin-top: 75px;
    .jcrop-tracker {
        max-width: 100%;
        max-height: 900px;
        img {
            width: 100%;
        }
    }
}

.compile-upload-close {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-color: @red;
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 15px;
    transform: scale(0.7);
    transform-origin: top;
}

.compile-upload-close:before {
    position: absolute;
    background-color: #ffffff;
    top: 28px;
    right: 9px;
    width: 42px;
    height: 4px;
    content: '';
    transform: rotate(45deg);
}

.compile-upload-close:after {
    position: absolute;
    background-color: #ffffff;
    top: 28px;
    right: 9px;
    width: 42px;
    height: 4px;
    content: '';
    transform: rotate(-45deg);
}

.compile-upload-close .public {
    position: absolute;
    background-color: #ffffff;
    top: 28px;
    right: 9px;
    width: 42px;
    height: 4px;
    content: '';
}

.jcrop-holder {
    display: inline-block;
}
.jcrop-holder #preview-pane {
    display: block;
    position: absolute;
    z-index: 2000;
    top: 0px;
    right: -380px;
    padding: 0;
    border: 3px rgb(255, 255, 255) solid;
    border-bottom-width: 9px;
    background-color: white;
    border-radius: 6px;
    /* -webkit-box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2); */
}

#preview-pane .preview-container {
    overflow: hidden;
    width: 320px;
    height: 480px;
}

.anchorBL {
    display: none;
}
</style>
<template>
  <!-- 图片裁剪层-->
  <div class="compile-upload">
    <div class="compile-upload-close"
         @click="close"></div>
    <div class="compile-upload-edit row">
      <div class="col-9 text-center">
        <img id="preview"
             :src="src">
      </div>
      <div class="col-2">
        <div id="preview-pane">
          <div class="preview-container">
            <img id="jcropPreview"
                 class="jcrop-preview"
                 :src="src">
          </div>
          <iframe name="submitIform"
                  style="display:none;"></iframe>
          <form id="JcropForm"
                enctype="multipart/form-data"
                method="post"
                style="display:inline;">
            <input type="hidden"
                   id="x1"
                   name="x1">
            <input type="hidden"
                   id="y1"
                   name="y1">
            <input type="hidden"
                   id="w"
                   name="w">
            <input type="hidden"
                   id="h"
                   name="h">
            <input type="hidden"
                   id="targetW"
                   name="targetW"
                   value="640">
            <input type="hidden"
                   id="targetH"
                   name="targetH"
                   value="960">
          </form>
          <div @click="complete"
               class="jcrop-cut-btn">完成</div>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
  <!-- 图片裁剪层-->
</template>

<script>
import './jquery.Jcrop.js'
import './jquery.Jcrop.css'
const area = [0, 0, 400, 600]
let callback, closeCallback
export default {
    data() {
        return {
            src: '',
            jcropApi: null
        }
    },
    methods: {
        //完成图片裁剪
        complete() {
            let params = $('#JcropForm').serJson()
            params.use = 'page'
            params.x1 = params.x1 || area[0]
            params.y1 = params.y1 || area[1]
            params.w = params.w || area[2]
            params.h = params.h || area[3]
            callback(params)
            $('.compile-upload').fadeOut(300)
        },
        //关掉裁剪窗口
        close(path) {
            $('.compile-upload').fadeOut(300, () => {
                $('.jcrop-holder').remove()
                this.jcropApi && this.jcropApi.release()
                closeCallback(typeof path == 'string' ? path : undefined)
            })
        },
        //选择图片后打开裁剪窗口
        initCrop(src, func, afterClose) {
            const self = this
            /*Jcrop部分代码*/
            let boundx,
                boundy,
                $pcnt,
                $pimg,
                xsize,
                ysize,
                $img = document.createElement('img')
            callback = func || function() {}
            closeCallback = afterClose || function() {}
            this.src = src
            $img.onload = function() {
                $('.compile-upload').fadeIn(300)
                $pcnt = $('#preview-pane .preview-container')
                $pimg = $('#preview-pane .preview-container img')
                xsize = $pcnt.width()
                ysize = $pcnt.height()
                /* eslint-disable */
                self.jcropApi = $.Jcrop('#preview', {
                    onChange: updatePreview,
                    onSelect: updatePreview,
                    allowSelect: false,
                    aspectRatio: 2 / 3,
                    boxHeight: 768,
                    boxWidth: 960,
                    minSize: [40, 60],
                    // maxSize: [360,640],
                    onSelect(e) {
                        $('#x1').val(Math.floor(e.x))
                        $('#y1').val(Math.floor(e.y))
                        $('#w').val(Math.floor(e.w))
                        $('#h').val(Math.floor(e.h))
                    }
                })
                /* eslint-enable */
                // Use the API to get the real image size
                const bounds = self.jcropApi.getBounds()
                boundx = bounds[0]
                boundy = bounds[1]
                self.jcropApi.setSelect(area)
                /*此段代码为了修复一个bug*/
                /* if (time == 1) {
                    $('.compile-upload').hide()
                    time++
                    $('#' + inputId).trigger('handChange')
                    return
                } */
                /*此段代码为了修复一个bug*/
            }
            $img.src = src

            //即时更新裁剪预览图内的内容
            function updatePreview(c) {
                if (parseInt(c.w) > 0) {
                    const rx = xsize / c.w
                    const ry = ysize / c.h

                    $pimg.css({
                        width: Math.round(rx * boundx) + 'px',
                        height: Math.round(ry * boundy) + 'px',
                        marginLeft: '-' + Math.round(rx * c.x) + 'px',
                        marginTop: '-' + Math.round(ry * c.y) + 'px'
                    })
                }
            }
        }
    },
    mounted() {
        $(this.$el).appendTo('body')
    }
}
</script>
