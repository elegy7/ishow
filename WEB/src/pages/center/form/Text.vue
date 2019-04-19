<style lang="less">
#textForm {
    .simpleColorChooser {
        z-index: 98;
    }

    .text-align-box {
        .fa {
            padding: 10px;
            font-size: 16px;
            cursor: pointer;
        }
    }
}
</style>
<template>
  <form id="textForm">
    <div class="form-group">
      <label>文字内容</label>
      <textarea class="form-control"
                rows="3"
                style="width:100%;"
                v-model="$parent.activeItem.text"></textarea>
    </div>
    <div class="form-group row text-align-box">
      <div class="col">
        <span class="fa fa-bold"
              :class="{'selected':$parent.activeItem.textWeight=='bold'}"
              @click="changeWeight"></span>
      </div>
      <div class="col">
        <span class="fa fa-align-left"
              :class="{'selected':$parent.activeItem.textAlign=='left'}"
              @click="changeAlign('left')"></span>
      </div>
      <div class="col">
        <span class="fa fa-align-center"
              :class="{'selected':$parent.activeItem.textAlign=='center'}"
              @click="changeAlign('center')"></span>
      </div>
      <div class="col">
        <span class="fa fa-align-right"
              :class="{'selected':$parent.activeItem.textAlign=='right'}"
              @click="changeAlign('right')"></span>
      </div>
      <div class="am-u-sm-4">&nbsp;</div>
    </div>
    <div class="form-group row">
      <div class="col">
        <label>文字颜色</label>
        <input type="text"
               class="form-control am-form-field colorInput"
               placeholder="文字颜色"
               v-model="$parent.activeItem.color" />
      </div>
      <div class="col">
        <label>背景色</label>
        <input type="text"
               class="form-control am-form-field bgColorInput"
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
               v-model="$parent.activeItem.radius" />
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
        changeAlign: function(e) {
            this.$parent.activeItem.textAlign = e
            $('.item-little-actived').css('text-align', e)
        },
        changeWeight: function() {
            this.$parent.activeItem.textWeight = this.$parent.activeItem.textWeight == 'bold' ? 'inherit' : 'bold'
            $('.item-little-actived').css('font-weight', this.$parent.activeItem.textWeight)
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
                console.log(hex)
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
