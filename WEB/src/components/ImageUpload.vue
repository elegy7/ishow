<style lang="less" rel="stylesheet/less">
@import '../assets/style/support.less';
/*上传相关样式*/
.pt5 {
    padding-top: 5px;
}
.cus-upload {
    position: relative;
    margin: 0;
    .file-uploads,
    .file-uploads input[type='file'] {
        position: absolute;
        cursor: pointer;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
}

.ee-invalid-tip-warp.in-upload {
    position: relative;
    input[name='filehidden'] {
        height: 0;
        width: 0;
        border: 0;
        background-color: transparent;
        color: transparent;
    }
    .ee-invalid-tip-box {
        position: absolute;
        top: 0;
        width: 200px;
    }
}

.i-upload {
    max-width: 100%;
    max-height: 210px;
    overflow-y: auto;
    position: relative;
    .i-upload-remove {
        background-color: @green-title;
        width: 24px;
        height: 24px;
        position: absolute;
        right: 0;
        top: 0;
        border-radius: 100%;
        color: white;
        text-align: center;
        padding-top: 4px;
        font-size: 14px;
        z-index: 6;
        cursor: pointer;
        line-height: 16px;
        &:after {
            font-size: 20px;
            content: '×';
            color: white;
        }
    }
    .i-upload-prev {
        position: relative;
        display: inline-block;
        width: 200px;
        height: 140px;
        background-position: center;
        background-size: cover;
        &.multiple {
            width: 100px;
            height: 70px;
        }
        &.big {
            width: 200px;
            height: 140px;
        }
        .i-upload-prev-progress {
            position: absolute;
            bottom: 0;
            width: 100%;
            font-size: 12px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            text-align: center;
            display: inline-block;
            padding: 1px 3px;
        }
    }
    .btn-crop {
        position: absolute;
        border-radius: 3px;
        border-color: white;
        color: white;
        min-width: 80%;
        left: 10%;
        top: 40%;
        z-index: 5;
        display: none;
    }
    .i-upload-prev-crop {
        display: inline-block;
        position: relative;
    }
    .i-upload-prev-crop:hover {
        .crop-shadow {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 4;
        }
        .btn-crop {
            display: inline-block;
        }
    }
    .box {
        /*把.box中的内容最多分为4列,会根据浏览器的大小变化,但是不会超过4列*/
        column-count: 7;
        /*规定每列列宽最小为200px*/
        column-width: auto;
        /*规定每列的间隙为1em*/
        column-gap: 0;
        /*盒子宽度为1000px*/
        width: 100%;
        /*实现盒子水平居中*/
        margin: 0 auto;
        &.big {
            column-width: 420px;
        }
        &.small {
            column-width: 100%;
        }
        img {
            /*上下左右5px的内填充*/
            padding: 5px;
            /*上下左右5px的外边距*/
            margin: 5px;
            /*圆角边框*/
            border-radius: 5px;
            /*盒子阴影*/
            box-shadow: 0px 0px 5px gray;
        }
    }
}
</style>
<template>
  <div class="form-group">
    <label class="control-label"
           v-if="label && !labelHidden">
      <span v-text="label"></span>
      <span class="font-red-sunglo"
            v-show="isRequire">*</span>
    </label>

    <div class="i-upload"
         v-show="oldValue.length||files.length">
      <div v-if="!files.length||multiple"
           class="box"
           :class="{'small': !isCrop, 'big': isCrop}">
        <div v-for="file in oldValue"
             class="i-upload-prev-crop">
          <img class=" i-upload-prev o"
               :class="{'multiple': multiple, 'image-detail': readonly, 'small': !isCrop, 'big': isCrop}"
               :title="readonly?'右键点击可查看大图':''"
               :data-srcs="oldValue.join(',')"
               :data-src="file"
               :src="file" />
          <span class="i-upload-remove"
                @click="removeFileUrl(file)"
                v-show="!readonly && rImgs.indexOf(file)==-1"></span>
          <!-- <div :style="style(file)"
               v-if="isCrop"
               class="i-upload-prev-crop i-upload-prev o big"
               :class="{'multiple': multiple, 'image-detail': readonly}"
               :title="readonly?'右键点击可查看大图':''"
               :data-src="file"
               :data-srcs="oldValue.join(',')">
          </div> -->

        </div>
      </div>
      <div :style="style(file.blob)"
           :class="{'multiple': multiple, 'big': isCrop, 'uploaded': filterRes(file)!=''}"
           :data-src="filterRes(file)"
           v-for="file in files"
           class="i-upload-prev n"
           v-show="file.response.status != 1">
        <span class="i-upload-remove"
              @click="removeFile(file)"></span>
        <span class="i-upload-prev-progress"
              v-show="file.progress">{{file.progress}}%</span>
      </div>
    </div>
    <div class="pt5"
         v-if="!readonly && !isCrop">
      <button class="btn btn-outline-primary btn-sm btn-min cus-upload"
              type="button"
              @click="picker"
              v-show="total && filesTotal>=total">
        选择图片
      </button>
      <button class="btn btn-outline-primary btn-sm cus-upload"
              type="button"
              v-show="!(total && filesTotal>=total)">
        选择图片
        <i-upload ref="Upload"
                  v-model="files"
                  name="files"
                  :multiple="multiple"
                  :maximum="total || 0"
                  :size="size||0"
                  :post-action="uploadHost"
                  @input-file="inputFile"
                  @input-filter="imageFilter">
        </i-upload>
      </button>
      <button class="btn btn-primary btn-sm"
              v-show="files.length && !($refs.Upload && $refs.Upload.uploaded)"
              @click.prevent="$refs.Upload.active = true"
              type="button">开始上传
      </button>
    </div>
    <div class="ee-invalid-tip-warp in-upload"
         v-if="validate">
      <input type="text"
             :data-valid="validate"
             :data-label="label"
             :value="value"
             name="filehidden">
      <div class="ee-invalid-tip-box"></div>
    </div>
    <span class="help-block"
          v-text="filterHelptext"
          v-if="filterHelptext"></span>
  </div>
</template>
<script>
/*props: total 可上传的总图片数, maximum 一次可选择的图片数, size 允许最大字节数*/
import uploadEmit from '../common/uploadEmit.js'
import IUpload from 'vue-upload-component'
/*eslint-disable*/
export default {
    name: 'ImageUpload',
    mixins: [new uploadEmit('files')],
    props: [
        'placeholder',
        'value',
        'validate',
        'mask',
        'readonly',
        'label',
        'labelHidden',
        'multiple',
        'total',
        'maximum',
        'size',
        'accept',
        'isCrop',
        'param',
        'readonlyImgs'
    ],
    computed: {
        filesTotal() {
            var oldTotal = this.oldValue.length
            var newTotal = this['files'].length
            return oldTotal + newTotal
        },
        filterHelptext() {
            if (this.helptext) return this.helptext
            if (this.size) {
                return `每张图不能大于${(this.size / (1024 * 1024)).toFixed(1)}M`
            }
        },
        rImgs() {
            return this.readonlyImgs || []
        }
    },
    methods: {
        style(url) {
            return { backgroundImage: `url('${Common.srcWarp(url)}')` }
        },
        check() {
            /*因为如果选择了图片但没点上传图片按钮的话, value的值不会变, 这里专门做一个检查图片是否上传的功能*/
            return this.$refs.Upload.uploaded
        },
        filterRes(file) {
            return typeof file.response == 'string' ? JSON.parse(file.response).result : ''
        },
        picker(e) {
            Common.msg(`最多只能上传${this.total}张图片`, '', 'info')
        }
    },
    components: {
        IUpload
    },
    mounted() {
        $(this.$el).bindValid()
    }
}
</script>
