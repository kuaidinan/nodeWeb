<template>
  <div class="checkbox">
      <label class="radio-item" v-for="(option,index) in options" :key="index">
          <input class="zm-input" @change="changeVal(currentValue)" type="radio" v-model="currentValue" :value="option.value">
          <span class="text" :class="option.value == currentValue?'active':''">{{option.label || option}}</span>
      </label>
  </div>
</template>
<script>
export default {
  name:'zmCheckBox',
  data(){
      return {
        currentValue: this.value
      }
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    value: Number
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },

    currentValue(val) {
      this.$emit('input', val);
    }
  },
  methods:{
      changeVal(val) {
          this.$emit('changeVal',val);
      }
  }
}
</script>
<style lang="scss" scoped>
    @import '~common/scss/util.scss';
    @import '~common/scss/via.scss';
    .checkbox{
        margin-right: -10px;
        .radio-item{
            position: relative;
            @include px2rem('margin-left',5px,37.5px);
            @include px2rem('margin-right',5px,37.5px);
            .zm-input{
                display: none;
            }
            .text{
                display: inline-block;
                @include px2rem('width',48px,37.5px);
                @include px2rem('height',25px,37.5px);
                @include px2rem('line-height',24px,37.5px);
                @include px2rem('border-radius',12.5px,37.5px);
                @include px2rem('font-size',15px,37.5px);
                border:1px solid $color-border;
                color:$color-text-ll;
                text-align: center;
                &.active{
                    border:1px solid $color-theme;
                    color:$color-theme;
                }
            }
        }
    }
</style>
