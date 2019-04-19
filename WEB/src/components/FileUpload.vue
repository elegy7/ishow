<style lang="less">
@import '../assets/style/support.less';

.file-upload-warp {
    .full {
        width: 100%;
        height: 100%;
    }
    &.exists {
        .input-group {
            padding-right: 125px;
            .input-group-addon {
                width: 65px;
                right: 60px;
            }
        }
    }
    &.hide-btn {
        .input-group {
            padding-right: 0;
            .input-group-addon,
            fileremove {
                display: none;
            }
        }
    }
    .fileinput-new,
    .fileinput-exists {
        width: 100px;
        height: 34px !important;
        line-height: 34px !important;
    }
    .input-group {
        position: relative;
        width: 100%;
        padding-right: 90px;
        input {
            background-color: transparent;
            cursor: default;
        }
        .input-group-addon {
            &:hover,
            &:active {
                background-color: darken(@gray, 10%);
            }
            position: absolute;
            right: 1px;
            display: inline-block;
            width: 90px;
            background-color: @gray;
            color: white;
            text-align: center;
            top: 0;
            height: 34px;
            span {
                height: 100%;
                line-height: 20px;
            }
            .i-upload {
                position: absolute;
                border: none;
                left: 0;
                top: 0;
            }
        }
        .fileremove {
            &:hover,
            &:active {
                background-color: darken(@red, 10%);
            }
            background-color: @red;
            position: absolute;
            right: 0;
            top: 0;
            height: 34px;
            width: 60px;
            color: white;
            text-align: center;
            line-height: 34px;
            cursor: pointer;
        }
        .fileinput-white {
            background-color: @red;
            color: white;
            margin-right: -60px;
            &:hover {
                background-color: darken(@red, 10%);
                color: white;
            }
        }
    }
}
</style>
<template>
  <div class="form-group ee-invalid-tip-warp file-upload-warp"
       :class="{'exists': value, 'hide-btn': readonly}">
    <div>
      <div class="readonly-shadow"
           v-if="readonly"></div>
      <label class="control-label"
             v-if="label && !labelHidden">
        <span v-text="label"></span>
        <span class="font-red-sunglo"
              v-show="isRequire">*</span>
      </label>
      <div class="input-group">
        <input class="form-control"
               :value="filesval"
               :title="filesval"
               :data-label="label"
               :data-valid="validate"
               readonly />
        <div class="input-group-addon">
          <div style="position: absolute;left:0;right:0;"
               class="full cus-upload">
            <i-upload ref="Upload"
                      name="files"
                      v-model="files"
                      :size="size"
                      :maximum="1"
                      :accept="accept"
                      :post-action="host || uploadFileHost"
                      @input-file="inputFile"
                      @input-filter="inputFilter">
            </i-upload>
          </div>
          <span class="fileinput-new"
                v-show="!value">选择</span>
          <span class="fileinput-exists"
                v-show="value">变更</span>
        </div>
        <span class="fileremove"
              data-dismiss="fileinput"
              @click="fileRemove"
              v-if="!readonly && value">删除</span>
        <!-- <span class="fileremove fileinput-white"
                @click="$refs.Upload.active = true"
                v-show="files.length&&!files[0].success">上传</span> -->
      </div>
    </div>
    <div class="ee-invalid-tip-box"></div>
  </div>
</template>
<script>
/*eslint-disable*/
import uploadEmit from '../common/uploadEmit'
export default {
    mixins: [new uploadEmit('files')],
    props: ['name', 'placeholder', 'value', 'validate', 'mask', 'readonly', 'label', 'labelHidden', 'helptext', 'accept', 'size', 'host'],
    computed: {
        filesval() {
            //return this.value ? this.value : this.files.length ? this.files[0].name+'等'+this.files.length+'个文件' : ''
            return this.value ? this.value : this.files.length ? this.files[0].name : ''
        }
    },
    data() {
        return {
            isRequire: this.validate && this.validate.indexOf('required') != -1,
            param: {},
            afterSave: () => {}
        }
    },
    methods: {
        fileRemove() {
            this.files = []
            this.$emit('input', '')
        },
        save(data, callback) {
            this.param = data
            this.afterSave = callback
            this.$refs.Upload.active = true
        }
    },
    watch: {
        status(newavl) {
            if (newavl == 200) {
                // 文件上传成功后status会变成200, 此时调用保存成功的回调
                this.afterSave()
                // 将status值还原, 以便下一次上传能触发回调
                this.status = 0
            }
        }
    },
    components: {
        IUpload: require('vue-upload-component')
    },
    mounted() {
        $(this.$el).bindValid()
    }
}
</script>
