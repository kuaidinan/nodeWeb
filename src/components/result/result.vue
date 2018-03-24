<template>
  <div class="result-wrapper">
    <img class="signup-img" src="~common/images/result.png" alt="">
    <h2 class="title">您的信息已提交!</h2>
    <h4 class="subTitle">请等待HR审核</h4>
    <h4 class="subTitle">有任何问题HR会跟您电话联系</h4>
  </div>
</template>
<script>
    import {Storage} from "common/js/utils.js";
    const storage = new Storage();
    export default {
      name:'result',
      mounted() {
        storage.removeStorage('authentication');
        storage.removeStorage('userinfo');
        storage.removeStorage('registration');
        storage.removeStorage('experience');
        storage.removeStorage('imgArr');
        storage.removeStorage('imgUrl');
      }
    }
</script>
<style lang="scss" scoped>
    @import '~common/scss/util.scss';
    @import '~common/scss/via.scss';
    .result-wrapper{
      position:absolute;
      width:100%;
      top:0;
      left:0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      background: #F4F5F7;
      height:100%;
      .signup-img{
        @include px2rem('width',141px,37.5px);
        @include px2rem('height',141px,37.5px);
        @include px2rem('margin-bottom',38px,37.5px);
        @include px2rem('margin-top',88px,37.5px);
      }
      .title{
        @include px2rem('font-size',20px,37.5px);
        color: #666666;
        letter-spacing: 0.04px;
        line-height: 20px;
        @include px2rem('margin-bottom',10px,37.5px);
      }
      .subTitle{
        @include px2rem('font-size',15px,37.5px);
        color: #999999;
        letter-spacing: 0.14px;
        line-height: 20px;
        letter-spacing: 0.14px;
      }
    }
</style>

