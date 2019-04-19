<style lang="less" rel="stylesheet/less">
#buttonForm {
    .simpleColorChooser {
        z-index: 98;
    }
}
</style>
<template>
  <form id="buttonForm">
    <div class="form-group row">
      <div class="col">
        <label>按钮文本</label>
        <input type="text"
               class="form-control"
               v-model="$parent.activeItem.text" />
      </div>
    </div>
    <div class="form-group">
      <label>按钮类型</label><br>
      <button type="button"
              class="btn btn-outline-secondary"
              :class="{'active': $parent.activeItem.btnType=='link'}"
              @click="changeBtnType('link')">
        链接按钮
      </button>
      <button type="button"
              class="btn btn-outline-secondary"
              :class="{'active': $parent.activeItem.btnType=='tel'}"
              @click="changeBtnType('tel')">
        电话按钮
      </button>
      <button type="button"
              class="btn btn-outline-secondary"
              :class="{'active': $parent.activeItem.btnType=='share'}"
              @click="changeBtnType('share')">
        分享按钮
      </button>
    </div>
    <div class="form-group">
      <label v-show="$parent.activeItem.btnType=='link'">超链接</label>
      <label v-show="$parent.activeItem.btnType=='tel'">电话号码</label>
      <input type="text"
             class="form-control"
             placeholder="必填"
             v-model="$parent.activeItem.href"
             v-show="$parent.activeItem.btnType!='share'" />
    </div>
    <div class="form-group row">
      <div class="col">
        <label>文字颜色</label>
        <input type="text"
               class="form-control colorInput"
               placeholder="文字颜色"
               v-model="$parent.activeItem.color" />
      </div>
      <div class="col">
        <label>背景色</label>
        <input type="text"
               class="form-control bgColorInput"
               placeholder="背景色"
               v-model="$parent.activeItem.bgColor" />
      </div>
    </div>
    <div class="form-group">
      <label>边框色</label>
      <input type="text"
             class="form-control borderColorInput"
             placeholder="边框色"
             v-model="$parent.activeItem.borderColor" />
    </div>
    <div class="form-group row">
      <div class="col">
        <label>字体大小</label>
        <input type="text"
               class="form-control"
               data-valid="['required']"
               v-model="$parent.activeItem.fontSize"
               placeholder="14px" />
      </div>
      <div class="col">
        <label>圆角度</label>
        <input type="text"
               class="form-control"
               v-model="$parent.activeItem.radius"
               placeholder="14px" />
      </div>
    </div>
    <div class="form-group row">
      <div class="col">
        <label>高</label>
        <input type="text"
               class="form-control"
               data-valid="['required','num']"
               v-model="$parent.activeItem.height" />
      </div>
      <div class="col">
        <label>宽</label>
        <input type="text"
               class="form-control"
               data-valid="['required','num']"
               v-model="$parent.activeItem.width" />
      </div>
    </div>
    <div class="form-group row">
      <div class="col">
        <label>上边距</label>
        <input type="text"
               class="form-control"
               data-valid="['required','num']"
               v-model="$parent.activeItem.translateY" />
      </div>
      <div class="col">
        <label>左边距</label>
        <input type="text"
               class="form-control"
               data-valid="['required','num']"
               v-model="$parent.activeItem.translateX" />
      </div>
    </div>
    <div class="form-group row">
      <div class="col">
        <label>层次</label>
        <input type="text"
               class="form-control"
               data-valid="['num']"
               placeholder="2"
               v-model="$parent.activeItem.zIndex" />
      </div>
    </div>
  </form>
</template>
<script>
export default {
    methods: {
        changeBtnType: function(e) {
            this.$parent.activeItem.btnType = e
            this.$parent.activeItem.href = ''
        }
    },
    mounted() {
        const self = this
        //初始化颜色控件
        $('.colorInput').simpleColor({
            boxWidth: '100%',
            boxHeight: 39,
            cellWidth: 20,
            cellHeight: 20,
            livePreview: true,
            displayCSS: {
                border: '1px solid #cccccc'
            },
            onSelect(hex) {
                self.$parent.activeItem.color = hex
                $('.item-little-actived').css({
                    color: hex
                })
            }
        })
        //初始化颜色控件
        $('.bgColorInput').simpleColor({
            boxWidth: '100%',
            boxHeight: 39,
            cellWidth: 20,
            cellHeight: 20,
            livePreview: true,
            displayCSS: {
                border: '1px solid #cccccc'
            },
            onSelect(hex) {
                self.$parent.activeItem.bgColor = hex
                $('.item-little-actived').css({
                    'background-color': hex
                })
            }
        })
        //初始化颜色控件
        $('.borderColorInput').simpleColor({
            boxWidth: '100%',
            boxHeight: 39,
            cellWidth: 20,
            cellHeight: 20,
            livePreview: true,
            displayCSS: {
                border: '1px solid #cccccc'
            },
            onSelect(hex) {
                self.$parent.activeItem.borderColor = hex
                $('.item-little-actived').css({
                    border: '1px solid ' + hex
                })
            }
        })
    }
}
</script>
