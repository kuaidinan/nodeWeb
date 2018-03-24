<template>
  <a class="mint-cell" :href="href" ref="mintcell">
    <span class="mint-cell-mask" v-if="isLink"></span>
    <div class="mint-cell-left">
      <slot name="left"></slot>
    </div>
    <div class="mint-cell-wrapper">
      <div class="mint-cell-title">
        <slot name="icon">
          <i v-if="icon" class="mintui" :class="'mintui-' + icon"></i>
        </slot>
        <slot name="title">
          <img class="zmicon" src="~common/images/cancel.png" width="16" height="16" @click="deleteRow()" v-if="isiconshow"/>
          <!--
          <i class="icon-jian zmicon" @click="deleteRow()" v-if="isiconshow"></i>
          -->
          <span class="mint-cell-text" v-text="title"></span>
          <span class="text" v-if="title && star"><i class="star">*</i></span>
          <span v-if="label" class="mint-cell-label" v-text="label"></span>
        </slot>
      </div>
      <div class="mint-cell-value" :class="{ 'is-link' : isLink }">
        <slot>
          <span v-text="value"></span>
        </slot>
      </div>
      <i v-if="isLink" class="mint-cell-allow-right"></i>
    </div>
    <div class="mint-cell-right">
      <slot name="right"></slot>
    </div>
  </a>
</template>

<script>
// if (process.env.NODE_ENV === 'component') {
//   require('mint-ui/packages/font/style.css');
// }

/**
 * mt-cell
 * @module components/cell
 * @desc 单元格
 * @param {string|Object} [to] - 跳转链接，使用 vue-router 的情况下 to 会传递给 router.push，否则作为 a 标签的 href 属性处理
 * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .mintui-xxx）
 * @param {string} [title] - 标题
 * @param {string} [label] - 备注信息
 * @param {boolean} [is-link=false] - 可点击的链接
 * @param {string} [value] - 右侧显示文字
 * @param {slot} - 同 value, 会覆盖 value 属性
 * @param {slot} [title] - 同 title, 会覆盖 title 属性
 * @param {slot} [icon] - 同 icon, 会覆盖 icon 属性，例如可以传入图片
 *
 * @example
 * <mt-cell title="标题文字" icon="back" is-link value="描述文字"></mt-cell>
 * <mt-cell title="标题文字" icon="back">
 *   <div slot="value">描述文字啊哈</div>
 * </mt-cell>
 */
export default {
  name: 'mt-cell',

  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    value: {},
    star:{
      type:Boolean,
      default:false
    },
    isiconshow:{
      type:Boolean,
      default:true
    }
  },

  computed: {
    href() {
      if (this.to && !this.added && this.$router) {
        const resolved = this.$router.match(this.to);
        if (!resolved.matched.length) return this.to;

        this.$nextTick(() => {
          this.added = true;
          this.$el.addEventListener('click', this.handleClick);
        });
        return resolved.fullPath || resolved.path;
      }
      return this.to;
    }
  },

  methods: {
    handleClick($event) {
      $event.preventDefault();
      this.$router.push(this.href);
    },
    deleteRow() {
      this.$emit('deleteRow')
    }
  }
};
</script>
<style lang="scss" scoped>
    @import '~common/scss/util.scss';
    @import '~common/scss/via.scss';
    .mint-cell{
      &-wrapper{
        color:$color-text-d;
        font-size: 15px;
        background:white;
        border-bottom:1px solid #eeeeee;
        line-height: 50px;
        height: 50px;
        .mint-cell-title{
          display: flex;
          align-items: center;
          .zmicon{
            color:$color-theme;
            margin-right:10px;
          }
          .text{
            color:$color-text-d;
            font-size: 15px;
            white-space:nowrap;
            .star{
                color:$color-theme;
                padding-left: 5px;
                font-style: normal;
            }
          }
        }
      }
    }
</style>
