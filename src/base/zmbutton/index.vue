<template>
    <button class="zm-button" @click="clickbtn" :class="btnclass">
        <slot></slot>
    </button>
</template>
<script>
export default {
  name: 'zm-button',
  props:{
      btnclass:{
          type:String,
          default:'default'
      }
  },
  methods:{
      clickbtn(){
          this.$emit('click')
      }
  }
}
</script>
<style lang="scss">
    @import '~common/scss/util.scss';
    .zm-button{
        width: 100%;
        min-width:0px;
        @include px2rem('border-radius',12px,37.5px);
        @include px2rem('height',24px,37.5px);
        @include px2rem('line-height',24px,37.5px);
        border:none;
        outline: none;
        box-sizing:border-box;
        @include px2rem('font-size',15px,37.5px);
        &.white{
            color:white;
            border:1px solid white;
            background:rgba(0, 0, 0, 0);
            &:active{
                background:darken(white,5%);
                background:rgba(0, 0, 0, 0.1);
            }
        }
        &.rewhite{
            color:#5F5F5F;
            background:white;
            &:active{
                background:darken(#5F5F5F,5%);
                background:darken(white,5%);
            }
        }
    }
</style>

