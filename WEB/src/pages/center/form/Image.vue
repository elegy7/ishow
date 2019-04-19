<style lang="less" rel="stylesheet/less" scoped>
.image-detail-warp {
    background-color: rgba(0, 0, 0, 0.8);
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    img {
        max-width: 100%;
    }
}
</style>
<template>
  <div id="imageForm">
    <div class="form-group">
      <div class="row">
        <div class="col-4">
          <label>元素图片</label>
          <button class="btn btn-secondary btn-xs"
                  type="button"
                  @click="openModal">
            {{$parent.activeItem.src ? '更改' : '选择'}}
          </button>
        </div>
        <div class="col-7 image-detail-warp">
          <img class="image-detail"
               :src="$parent.activeItem.src">
        </div>
        <div class="col-1"></div>
      </div>
    </div>
    <br>
    <br>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label>高</label>
          <div class="am-u-sm-4">
            <input type="text"
                   class="form-control"
                   data-valid="['required','num']"
                   v-model="$parent.activeItem.height" />
          </div>
        </div>
      </div>
      <div class="col">

        <div class="form-group">
          <label>宽</label>
          <div class="am-u-sm-4">
            <input type="text"
                   class="form-control"
                   data-valid="['required', 'num']"
                   v-model="$parent.activeItem.width" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label>左边距</label>
          <div class="am-u-sm-4">
            <input type="text"
                   class="form-control"
                   data-valid="['required', 'num']"
                   v-model="$parent.activeItem.translateX" />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label>上边距</label>
          <div class="am-u-sm-4">
            <input type="text"
                   class="form-control"
                   data-valid="['required', 'num']"
                   v-model="$parent.activeItem.translateY" />
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label>层次</label>
      <div class="am-u-sm-4">
        <input type="text"
               class="form-control"
               data-valid="['num']"
               placeholder="2"
               v-model="$parent.activeItem.zIndex" />
      </div>
    </div>

    <hr data-am-widget="divider"
        style=""
        class="am-divider am-divider-default" />
    <p class="hr-title mt5">分割线下为选填内容</p>

    <div class="form-group">
      <label>超链接</label>
      <input type="text"
             class="form-control"
             placeholder="填写超链接可以将图片设置为隐式按钮"
             v-model="$parent.activeItem.href" />
    </div>
  </div>

</template>
<script>
export default {
    props: ['value'],
    methods: {
        openModal() {
            this.$parent.$refs.UploadStore.pick(src => {
                this.$parent.activeItem.src = src
                this.$forceUpdate()
                $('.item-little-actived').attr('src', src)
            }, 'default')
        }
    }
}
</script>
