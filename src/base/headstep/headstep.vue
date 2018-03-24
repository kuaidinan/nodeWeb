<template>
    <div class="header">
        <ul class="header-ul">
            <li @click="changeTab(index)" v-for="(item,index) in titles" :key="index" class="tab-box" :class="{'active':activeIndex >= index}">
                <span class="tabname">{{item}}</span>
                <span class="index">{{index + 1}}</span>
            </li>       
        </ul>
        <div class="header-bottom"></div>
    </div>
</template>
<script>
    export default {
        props:{
            titles:Array,
            routers:{
                type:Array,
                default:[]
            },
            currentIndex:Number,
            router:{
                type:Boolean,
                default:false
            }
        },
        computed: {
            activeIndex() {
                if(this.router) {
                    return this.routers.indexOf(this.$route.path);
                } else {
                    return this.currentIndex;
                }
            }
        },
        methods:{
            changeTab(index) {
                this.$emit('switchTab', this.routers[index]);
            }
        },
    }
</script>
<style lang="scss" scoped>
    @import '~common/scss/util.scss';
    @import '~common/scss/via.scss';
    .header{
        background:white;
        .header-ul{
            display: flex;
            // position:fixed;
            // width:100%;
            // z-index:222;
            // background:white;
            @include px2rem('height',56px,37.5px);
            .tab-box{
                flex:1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color:#999999;
                border-bottom:5px solid #cccccc;
                position: relative;
                &.active{
                    color:$color-theme;
                    border-bottom:5px solid $color-theme;
                    .index{
                        border:2px solid $color-theme;
                    }
                }
                .tabname{
                    font-weight:900;
                    @include px2rem('font-size',15px,37.5px);
                }
                .index{
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    @include px2rem('width',24px,37.5px);
                    @include px2rem('height',24px,37.5px);
                    @include px2rem('border-radius',12px,37.5px);
                    @include px2rem('font-size',18px,37.5px);
                    border:2px solid #cccccc;
                    @include px2rem('bottom',-14px,37.5px);
                    left:50%;
                    transform:translate(-50%,0);
                    background: white;
                }
            }
        }
        .header-bottom{
            width:100%;
            @include px2rem('height',10px,37.5px);
            background: #F4F5F7;
        }
    }

</style>