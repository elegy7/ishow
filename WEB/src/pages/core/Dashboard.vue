<style lang="less" rel="stylesheet/less" scoped>
.am-slider.am-slider-default {
    height: 800px;
    margin: 0;
}

.banner-btn {
    position: absolute;
    left: 22%;
    top: 60%;
    background-color: #ff4848;
    border: 1px solid white;
    color: white;
    border-radius: 5px;
    width: 150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: inline-block;
    transition-duration: 2s;
    -moz-transition-duration: 2s;
    /* Firefox 4 */
    -webkit-transition-duration: 2s;
    /* Safari 和 Chrome */
    -o-transition-duration: 2s;
    /* Opera */
}
.main-img {
    position: absolute;
    top: 50px;
    bottom: 50px;
    width: 100%;
    background: url('../../assets/images/bging.jpg') no-repeat;
    background-size: cover;
    background-position: center;
}
</style>
<template>
  <div class="main-img">
    <img src="../../assets/images/leftimg1.png">
    <!-- <router-link to="/main" class="banner-btn">创建应用+</router-link> -->
  </div>
</template>
