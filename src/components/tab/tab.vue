<template>
  <div class="tab">
    <head-step :router="true" 
        :titles="['个人信息','入职登记','相关经历']" 
        :routers="['/tab/userInfo','/tab/registration','/tab/experience']" 
        @switchTab="switchTab"></head-step>
    <div class="tab-wrapper">
        <transition name="fade">
            <router-view></router-view>
        </transition>   
    </div>
  </div>
</template>

<script>
    import headStep from "base/headstep/headstep.vue";
    import {Storage} from "common/js/utils.js";
    const storage = new Storage();
    export default {
        name: 'app',
        methods:{
            switchTab(router) {
                var userInfoStore = storage.getStorage('userinfo');
                var registration = storage.getStorage('registration');
                var experience = storage.getStorage('experience');
                if(userInfoStore && router === '/tab/userInfo') {
                    this.$router.push({path:`${router}`});
                } else if(registration && router === '/tab/registration') {
                    this.$router.push({path:`${router}`});
                } else if(experience && router === '/tab/experience') {
                    this.$router.push({path:`${router}`});
                }
            }
        },
        components:{
            headStep
        }
    }
</script>
<style lang="scss">
  @import '~common/scss/via.scss';
  @import '~common/scss/util.scss';
  @import '~common/scss/global.scss';
  .tab{
    height:100%;
    overflow-x:hidden;
    background: #F8F8F8;
    .fade-enter-active, .fade-leave-active{
        transition: all 0.25s ease;
    }
    .fade-enter, .fade-leave-active{
        opacity: 0;
    }
    .tab-wrapper{
        // @include px2rem('padding-top',56px,37.5px);
    }
  }
</style>