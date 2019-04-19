<style lang="less" rel="stylesheet/less">
.warpper {
    height: 100%;
    max-height: inherit;
    overflow: hidden;
}
</style>
<template>
  <div class="warpper">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../pages/core/Header.vue'
import Footer from '../pages/core/Footer.vue'
export default {
    components: {
        Header,
        Footer
    }
}
</script>
