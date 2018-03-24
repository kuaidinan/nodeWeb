<template>
  <div class="zmCell" :class="align">
        <span class="text" :class="{'has-icon':hasIcon}">{{labelName}}<i class="star" v-if="labelName && star">*</i></span>
        <slot></slot>
  </div>
</template>
<script>
export default {
  name:'zmCell',
  props:{
      labelName:{
          type:String
      },
      star:{
          type:Boolean,
          default:false
      },
      align:{
          type:String,
          default:''
      },
      hasIcon:{
          type:Boolean,
          default:false
      }
  }
}
</script>
<style lang="scss" scoped>
    @import '~common/scss/via.scss';
    @import "~common/scss/util.scss";
    .zmCell{
        // display:flex;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;
        background:white;
        border-bottom:1px solid #eeeeee;
        line-height: 50px;
        min-height: 50px;
        align-items:flex-start;
        position:relative;
        align-items:center;
        .vux-time{
            flex:auto;
            &.small{
                @include px2rem('width',75px,37.5px);
            }
            .no-right{
               .weui-cell_access  .weui-cell__ft::after{
                    display:none!important;
                }
                .ux-cell-primary::after{
                    background:red;
                    display:none!important;
                }
                .vux-datetime-value::after{
                    background:red;
                    display:none!important;
                }
            }
            // .zm-time{
            //     width:100%;
            //     line-height: 50px;
            //     height:50px;
            // }
        }
        input,textarea{
            @include px2rem('padding-right',10px,37.5px);
            flex-grow:1;
            flex-shrink:1;
            flex-basis:0;
            flex:auto;
        }
        .input-div{
            // display:inline-block;
            display:flex;
            align-items:center;
            flex-grow:1;
            flex-shrink:1;
            height:50px;
        }
        .img-arrow{
            @include px2rem('width',10px,37.5px);
            @include px2rem('height',10px,37.5px);
            position:absolute;
            @include px2rem('right',-6px,37.5px);
            top:calc(50% - 1px);
            // top:23px;
            transform:translate(0,-50%);
        }
        &.center{
            justify-content: center;
        }
        &.textarea{
            // display:flex;
            // align-items:center;
            // justify-content: space-between;
            // line-height: 70px;
            min-height: 50px;
            .text{
                // display:flex;
                // align-items:flex-start;
                @include px2rem('margin-bottom',21px,37.5px);
            }
        }
        &:last-child{
            border:1px solid transparent;
        }
        &.is-danger{
            border-bottom:1px solid $color-theme!important;
            // margin-bottom:-1px;
            .text{
                color:$color-theme;
            }
            // &:after{
            //     right:0;
            //     top:center;
            //     content:'123';
            //     color:red;
            //     display:inline-block;
            // }
        }
        &.no-border{
            border:none;
        }
        .text{
            color:$color-text-d;
            @include px2rem('font-size',15px,37.5px);
            white-space:nowrap;
            .star{
                color:$color-theme;
                padding-left: 5px;
                font-style: normal;
            }
            &.has-icon{
                padding-left:25px;
            }
        }
        .add-box{
            .text{
                color:$color-theme;
            }
        }
    }
</style>

