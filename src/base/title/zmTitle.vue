<template>
  <div class="zmTitle"><slot></slot></div>
</template>
<script>
export default {
  name:'zmTitile'
}
</script>
<style lang="scss" scoped>
    @import '~common/scss/util.scss';
    @import '~common/scss/via.scss';
    .zmTitle{
        color:$color-text-l;
        @include px2rem('font-size',15px,37.5px);
        @include px2rem('padding-left',10px,37.5px);
        @include px2rem('margin-bottom',7px,37.5px);
        // @include px2rem('margin-top',10px,37.5px);
        @include px2rem('height',21px,37.5px);
        @include px2rem('line-height',21px,37.5px);
    }
</style>

