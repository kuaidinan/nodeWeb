<template>
    <div class="main-wrapper">
        <div class="img-header">
            <span class="text">身份校验</span>
            <img class="img" src="~common/images/zheng.png" width="70" height="110" @click="deleteFund(index)"/>
        </div>
        <div class="main">
            <div class="table-wrapper nomargin">
                <zm-cell :labelName="'姓名'" :class="{'is-danger': veeErrors.has('personName') }">
                    <input type="text" v-model="authentication.personName" name="personName" v-validate="'required'"/>
                </zm-cell>
                <zm-cell :labelName="'身份证号'" :class="{'is-danger': veeErrors.has('idNumber') }">
                    <input v-model="authentication.idNumber" name="idNumber" v-validate="'required|isNumberId'"/>
                </zm-cell>
                <zm-cell :labelName="'手机号'" :class="{'is-danger': veeErrors.has('mobile') }">
                    <input type="number" :class="{'codepass':authentication.codeFlag}" :readonly="authentication.codeFlag" v-model="authentication.mobile" name="mobile" v-validate="'isMobile|required'"/>
                </zm-cell>
                <zm-cell :labelName="'验证码'" :class="{'is-danger': veeErrors.has('code') }">
                    <div class="input-div">
                        <input type="number" :class="{'codepass':authentication.codeFlag}" :readonly="authentication.codeFlag" class="zm-input" style="padding-right:5px;display:block;" v-model="authentication.code" v-validate="'required'" name="code"/>
                        <get-code @click="getCode" ref="code" :class="{'codeactive':authentication.mobile && !veeErrors.has('mobile')}"></get-code>
                    </div>
                </zm-cell>
            </div>
            <div class="error">{{veeErrors.firstByRule('idNumber','isNumberId') || veeErrors.firstByRule('mobile','isMobile')}}</div>
            <mt-button type="default" :plain="true" class="themefillbutton" @click="goNext()">下一步</mt-button>
        </div>
    </div>
</template>
<script>
    import zmCell from "base/zmCell/zmCell.vue";
    import zmTitle from "base/title/zmTitle.vue";
    import getCode from "base/getCode/getCode.vue";
    import {Storage} from "common/js/utils.js";

    import { GetCodes,CheckCode,CheckEmp } from "api/common/dicts.js";

    const toastTime = '4000';
    const storage = new Storage();
    export default {
        name:'authentication',
        data() {
            return {
                authentication:{
                    personName:'',
                    idNumber:'',
                    mobile:'',
                    code:'',
                    codeFlag:false,
                },
                codeClassFlag:true
            }
        },
        mounted() {
            this.$nextTick(() => {
                if(storage.getStorage('authentication')) {
                    this.authentication = storage.getStorage('authentication');
                }
            })
        },
        methods:{
            getCode(val) {
                if(this.authentication.codeFlag) return;
                this.$validator.validate('mobile').then(result => {
                    if (result) {
                        if (val) {
                            // this.codeClassFlag = false;
                            this.$refs.code.countdown();
                            GetCodes(this.authentication.mobile).then((result) => {})
                        }
                        return;
                    }
                });
            },
            blurCode() {
                this.$validator.validate('mobile').then(result => {
                    if (result) {
                        if(!this.authentication.code) return;
                        CheckCode({mobile:this.authentication.mobile,code:this.authentication.code}).then((result) => {
                            if (result.code === '1') {
                                this.authentication.codeFlag = true;
                            } else {
                                this.$messageBox({
                                    title: '提示',
                                    message:  result.message,
                                    showCancelButton:false,
                                    showConfirmButton:true,
                                    alertClass:true,
                                });
                                this.authentication.codeFlag = false;
                            }
                        })
                        return false;
                    }
                });
            },
            goNext() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        if(storage.getStorage('authentication')) {
                            this.$router.push({path:'/tab/userInfo'})
                            return;
                        }
                        this.checkValid();

                        // CheckCode({mobile:this.authentication.mobile,code:this.authentication.code}).then((result) => {
                        //     if (result.code === '1') {
                        //         CheckEmp({personName:this.authentication.personName, idNumber:this.authentication.idNumber}).then((result) => {
                        //             if(result.code === '1') {
                        //                 storage.setStorage('authentication',this.authentication);
                        //                 this.$router.push({path:'/tab/userInfo'})
                        //             } else {
                        //                 this.$messageBox({
                        //                     title: '提示',
                        //                     message:  result.message,
                        //                     showCancelButton:false,
                        //                     showConfirmButton:false,
                        //                     alertClass:true,
                        //                 });
                        //             }
                        //         })
                        //     } else {
                        //         this.$messageBox({
                        //             title: '提示',
                        //             message:  result.message,
                        //             showCancelButton:false,
                        //             showConfirmButton:false,
                        //             alertClass:true,
                        //         });
                        //         this.authentication.codeFlag = false;
                        //     }
                        // })
                        return;
                    }
                    console.log("Correct them veeErrors!");
                });
            },
            checkValid() {
                var option = {};
                option = {
                    personName:this.authentication.personName,
                    idNumber:this.authentication.idNumber,
                    mobile:this.authentication.mobile,
                    verificationCode:this.authentication.code
                }
                CheckEmp(option).then((result) => {
                    if(result.code === '1') {
                        storage.setStorage('authentication',this.authentication);
                        this.$router.push({path:'/tab/userInfo'})
                    } else {
                        this.$messageBox({
                            title: '提示',
                            message:  result.message,
                            showCancelButton:false,
                            showConfirmButton:true,
                            alertClass:true,
                        });
                    }
                })
            }
        },
        components:{
            zmCell,
            zmTitle,
            getCode,
        }
    };
</script>

<style lang="scss" scoped>
  @import "~common/scss/util.scss";
  @import "~common/scss/via.scss";
  .main-wrapper{
        position:absolute;
        width:100%;
        height:100%;
        top:0;
        left:0;
        .img-header{
            @include px2rem("height",126px,37.5px);
            background: #F76459;
            position:relative;
            .text{
                position:absolute;
                @include px2rem("font-size",20px,37.5px);
                color: #FFFFFF;
                line-height: 20px;
                @include px2rem("left",30px,37.5px);
                @include px2rem("bottom",11px,37.5px);
            }
            .img{
                position:absolute;
                right:0;
                bottom:0;
            }
        }
        .main {
            background: $color-background;
            height:100%;
            @include px2rem("padding-left",10px,37.5px);
            @include px2rem("padding-right",10px,37.5px);
            @include px2rem("padding-top",30px,37.5px);

        }
        .codeactive{
            color:$color-theme;
            border-color:$color-theme;
        }
  }
</style>