<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: 'app',
    }
</script>
<style lang="scss">
  @import '~common/scss/via.scss';
  @import '~common/scss/util.scss';
  @import '~common/scss/global.scss';
  #app{
    height:100%;
    overflow-x: hidden;   
    overflow-y: auto;  
    -webkit-overflow-scrolling: touch;
    .fade-enter-active, .fade-leave-active{
      transition: all 0.25s ease;
    }
    .fade-enter, .fade-leave-active{
      opacity: 0;
    }
  }
</style>