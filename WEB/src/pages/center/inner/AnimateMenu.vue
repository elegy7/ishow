<style lang="less" rel="stylesheet/less">
@import '../../../assets/style/support.less';
.animate-warp {
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    padding: 0 15px;
}
#animateOption {
    position: absolute;
    left: 10px;
    top: 0;
    width: 100%;
    max-width: 240px;
    border: 1px solid @line;
    padding: 15px 10px;
    border-radius: 5px;
    .btn-outline-secondary {
        margin: 5px;
    }
    .form-group.col-10 {
        padding-left: 20px;
    }
}
</style>
<template>
  <div class="animate-warp">
    <div id="animateOption"
         class="right-side-bar">
      动画选择:
      <br>
      <br>
      <button type="button"
              class="btn btn-md btn-outline-secondary"
              :class="{'active': $parent.activeItem.animate=='none'}"
              @click="changeAnimate('none')">
        无动画
      </button>

      <button type="button"
              class="btn btn-md btn-outline-secondary"
              :class="{'active': $parent.activeItem.animate=='fadeIn'}"
              @click="changeAnimate('fadeIn')">
        渐显
      </button>

      <button type="button"
              class="btn btn-md btn-outline-secondary"
              :class="{'active': $parent.activeItem.animate=='smallToBig'}"
              @click="changeAnimate('smallToBig')">
        自小变大
      </button>

      <button type="button"
              class="btn btn-md btn-outline-secondary"
              :class="{'active': $parent.activeItem.animate=='turnLoop'}"
              @click="changeAnimate('turnLoop')">
        旋转出现
      </button>

      <button type="button"
              class="btn btn-md btn-outline-secondary"
              :class="{'active': $parent.activeItem.animate=='jump'}"
              @click="changeAnimate('jump')">
        跳动出现
      </button>

      <button type="button"
              class="btn btn-md btn-outline-secondary"
              :class="{'active': $parent.activeItem.animate=='downToUp'}"
              @click="changeAnimate('downToUp')">
        从下到上移动
      </button>

      <button type="button"
              class="btn btn-md btn-outline-secondary"
              :class="{'active': $parent.activeItem.animate=='upToDown'}"
              @click="changeAnimate('upToDown')">
        从上到下移动
      </button>

      <button type="button"
              class="btn btn-md btn-outline-secondary"
              :class="{'active': $parent.activeItem.animate=='leftToRight'}"
              @click="changeAnimate('leftToRight')">
        从左到右移动
      </button>
      <button type="button"
              class="btn btn-md btn-outline-secondary"
              :class="{'active': $parent.activeItem.animate=='rightToLeft'}"
              @click="changeAnimate('rightToLeft')">
        从右到左移动
      </button>

      <button type="button"
              class="btn btn-md btn-outline-secondary"
              :class="{'active': $parent.activeItem.animate=='afterTurnBefore'}"
              @click="changeAnimate('afterTurnBefore')">
        从后向前翻转
      </button>
      <button type="button"
              class="btn btn-md btn-outline-secondary"
              :class="{'active': $parent.activeItem.animate=='beforeTurnAfter'}"
              @click="changeAnimate('beforeTurnAfter')">
        从前向后翻转
      </button>

      <button type="button"
              class="btn btn-md btn-outline-secondary"
              :class="{'active': $parent.activeItem.animate=='leftTurnRight'}"
              @click="changeAnimate('leftTurnRight')">
        从左向右翻转
      </button>
      <button type="button"
              class="btn btn-md btn-outline-secondary"
              :class="{'active': $parent.activeItem.animate=='rightTurnLeft'}"
              @click="changeAnimate('rightTurnLeft')">
        从右向左翻转
      </button>
      <br>
      <br>
      <div class="row">
        <div class="form-group col-10">
          <label>动画持续时间(ms)</label>
          <input type="number"
                 class="form-control"
                 data-valid="['required','num']"
                 v-model="$parent.activeItem.speed"
                 @keyup="changeAnimate2" />
        </div>
        <div class="form-group col-10">
          <label>动画延迟时间(ms)</label>
          <input type="number"
                 class="form-control"
                 data-valid="['required','num']"
                 v-model="$parent.activeItem.delay"
                 @keyup="changeAnimate2" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ItemsRender from '../../../common/itemRender.js'
export default {
    data() {
        return {
            shown: false
        }
    },
    methods: {
        //选择动画
        changeAnimate(animateType) {
            const $item = $('.item-little-actived')
            this.$parent.activeItem.animate = animateType
            $item.attr('data-animate', animateType)
            //立即执行选择的动画
            $item.attr('data-delay', 0)
            setTimeout(() => {
                ItemsRender.animate[animateType]($item)
            }, 100)
        },
        //选择动画时常和延迟
        changeAnimate2(e) {
            $('.item-little-actived').attr({
                'data-delay': this.$parent.activeItem.delay,
                'data-speed': this.$parent.activeItem.speed
            })
        },
        show() {
            this.shown = true
            $('#animateOption').transition(
                {
                    x: $('.animate-warp')[0].offsetWidth - 15
                },
                300
            )
        },
        hide() {
            this.shown = false
            $('#animateOption').transition(
                {
                    x: 0
                },
                300
            )
        }
    }
}
</script>
