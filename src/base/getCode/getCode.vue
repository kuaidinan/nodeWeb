<template>
  <div class="btn" @click="getCode()">{{text === '获取验证码'?text:text+' s'}}</div>
</template>
<script>
const DEFAULTTIME = 60;
export default {
    data() {
        return {
            text:'获取验证码'
        }
    },
    methods: {
        getCode() {
            var flag = false;
            if (this.text === '获取验证码') {
                flag = true;
            } else {
                flag = false
            }
            this.$emit('click',flag);
        },
        countdown() {
            if (this.text === '获取验证码') {
                this.text = DEFAULTTIME;
                clearInterval(this.timer);
                this.timer = setInterval(() => {
                    this.text --;
                    if (this.text === 0) {
                        this.text = '获取验证码';
                        clearInterval(this.timer);
                    }
                },1000)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '~common/scss/util.scss';
    @import '~common/scss/via.scss';
    .btn{
        display: inline-block;
        @include px2rem('height',25px,37.5px);
        @include px2rem('line-height',24px,37.5px);
        @include px2rem('border-radius',12.5px,37.5px);
        box-sizing:border-box;
        border:1px solid $color-border;
        color:$color-text-ll;
        text-align: center;
        @include px2rem('font-size',15px,37.5px);
        white-space: nowrap;
        padding:0 8px;
        margin-right:-10px;
        &.active{
            border:1px solid $color-theme;
            color:$color-theme;
        }
    }
</style>
