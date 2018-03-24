<template>
    <div class="main-wrapper">
        <!--
        <head-step :titles="['个人信息','入职登记','相关经历']" :routers="['userInfo','registration','experience']" :currentIndex="currentIndex" @switchTab="switchTab"></head-step>
        -->
        <div class="main">
            <!--
            <zm-title>个人资料 *</zm-title>
            <div class="table-wrapper small">
                <zm-cell :labelName="'一级部门'" :class="{'is-danger': veeErrors.has('orgId') }">
                    <div class="input-div">
                        <select v-model="registration.orgId" class="zm-select" name="orgId" v-validate="'required'" :class="{'zm-select-default':registration.orgId === ''}">
                            <option value="">请选择</option>
                            <option :value="item.orgId" v-for="(item,index) in orgs" :key="index">{{item.orgName}}</option>
                        </select>
                        <i class="icon-right"></i>
                    </div>
                </zm-cell>
                <zm-cell :labelName="'用工形式'" :class="{'is-danger': veeErrors.has('personType') }">
                    <div class="input-div">
                        <select v-model="registration.personType" class="zm-select" name="personType" v-validate="'required'" :class="{'zm-select-default':registration.personType === ''}">
                            <option value="">请选择</option>
                            <option :value="item.itemCode" v-for="(item,index) in personType" :key="index">{{item.itemName}}</option>
                        </select>
                        <i class="icon-right"></i>
                    </div>
                </zm-cell>
                <zm-cell :labelName="'工作地点'" :class="{'is-danger': veeErrors.has('workCity') }">
                    <div class="input-div">
                        <select v-model="registration.workCity" class="zm-select" name="workCity" v-validate="'required'" :class="{'zm-select-default':registration.workCity === ''}">
                            <option value="">请选择</option>
                            <option :value="item.itemCode" v-for="(item,index) in workCity" :key="index">{{item.itemName}}</option>
                        </select>
                        <i class="icon-right"></i>
                    </div>
                </zm-cell>
                <zm-cell :labelName="'婚育状态'" :class="{'is-danger': veeErrors.has('marriageBearStatus') }">
                    <div class="input-div">
                        <select v-model="registration.marriageBearStatus" class="zm-select" name="marriageBearStatus" v-validate="'required'" :class="{'zm-select-default':registration.marriageBearStatus === ''}">
                            <option value="">请选择</option>
                            <option :value="item.itemCode" v-for="(item,index) in marriageBearStatus" :key="index">{{item.itemName}}</option>
                        </select>
                        <i class="icon-right"></i>
                    </div>
                </zm-cell>
            </div>
            -->
            <zm-title>工资卡信息(如没有公司可代办,必填)</zm-title>
            <div class="table-wrapper small">
                <zm-cell :labelName="'是否有招商银行卡'" :class="{'is-danger': veeErrors.has('hasBankCard') }">
                    <zm-check-box :options="[{label:'是',value:0},{label:'否',value:1}]" v-model="registration.hasBankCard" name="hasBankCard" v-validate="'required'"></zm-check-box>
                </zm-cell>
                <zm-cell :labelName="'支行信息'" v-if="registration.hasBankCard === 0" :class="{'is-danger': veeErrors.has('bankSubbranch') }">
                    <input  type="text" placeholder='例"张江支行"' v-model="registration.bankSubbranch" name="bankSubbranch" v-validate="'required'"/>
                </zm-cell>
                <zm-cell :labelName="'银行卡号'" v-if="registration.hasBankCard === 0" :class="{'is-danger': veeErrors.has('bankNumber') }">
                    <input  type="number" v-model="registration.bankNumber" name="bankNumber" v-validate="'required|isBankCard'"/>
                </zm-cell>
            </div>
            <div class="error" v-if="veeErrors.firstByRule('bankNumber','isBankCard')">{{veeErrors.firstByRule('bankNumber','isBankCard')}}</div>
            <zm-title v-if="registration.hasBankCard === 0">银行卡照片 (必填)</zm-title>
            <div class="uploader-wrapper" v-if="registration.hasBankCard === 0" style="margin-bottom:10px;">
                <zmUpload 
                    :imgUrl="require('common/images/card.png')" 
                    :fileName="'银行卡'"
                    :before-upload="beforeUpload"
                    :on-success="onSuccess"
                    :on-error="onError"
                    v-model="registration.bankCardPic"
                    :imageKey.sync="registration.bankCardPic"
                    :imageUrl.sync="registration.bankCardPicUrl"
                    :class="{'is-danger': veeErrors.has('bankCardPic') }"
                    :name="'bankCardPic'" v-validate="'required'">点击上传银行卡照片</zmUpload>
            </div>
            <zm-title>社保信息 (必填)</zm-title>
            <div class="table-wrapper small">
                <zm-cell :labelName="`是否在${workName}缴纳过社保`" :class="{'is-danger': veeErrors.has('hasSocialSecurityHis') }">
                    <zm-check-box :options="[{label:'是',value:1},{label:'否',value:0}]" v-model="registration.hasSocialSecurityHis" name="hasSocialSecurityHis" v-validate="'required'"></zm-check-box>
                </zm-cell>
                <!--
                <div v-for="(item, index) in registration.socialSecurityPlace" :key="index" v-if="registration.hasSocialSecurityHis === 0">
                    <zm-cell-swiper
                        :title="'缴纳过的城市'+(index+1)"
                        @deleteRow="deleteCity(index)"
                        :class="{'is-danger': veeErrors.has('socialSecurityPlace' + index) }"
                        :right="[
                            {
                            content: '删除',
                            style: { background: '#EF4C4F', color: '#fff'},
                            handler: () => deleteCity(index)
                            }
                        ]">
                            <input type="text" class="zm-input" v-model="registration.socialSecurityPlace[index]" :name="'socialSecurityPlace' + index" v-validate="'required'">
                    </zm-cell-swiper>
                </div>
                <zm-cell align="center"  v-if="registration.hasSocialSecurityHis === 0" >
                    <div class="add-box"  @click="addCity()">
                        <i class="icon-add add"></i>
                        <span class="text">添加</span>
                    </div>
                </zm-cell>
                -->
            </div>
            <zm-title>公积金信息 (必填)</zm-title>
            <div class="table-wrapper small">
                <zm-cell :labelName="`是否在${workName}缴纳过公积金`" :class="{'is-danger': veeErrors.has('hasHouseFundHis') }">
                    <zm-check-box :options="[{label:'是',value:1},{label:'否',value:0}]" v-model="registration.hasHouseFundHis" name="hasHouseFundHis" v-validate="'required'"></zm-check-box>
                </zm-cell>
                <zm-cell :labelName="'公积金账号'" :class="{'is-danger': veeErrors.has('fundNumber') }" v-if="registration.hasHouseFundHis === 1">
                    <input type="number" v-model="registration.fundNumber" name="fundNumber" v-validate="'required'"/>
                </zm-cell>
                <!--
                <div v-for="(item, index) in registration.accumulationFund" :key="index" class="aFund-wrapper" v-if="registration.hasHouseFundHis === 0">
                    <div class="aFundInfo">
                        <div class="aFundInfo-icon">
                            <img class="img" src="~common/images/cancel.png" width="16" height="16" @click="deleteFund(index)"/>
                        </div>
                        <div class="aFundInfo-cell">
                            <zm-cell-swiper
                                :title="'账号'"
                                :star="false"
                                :isiconshow="false"
                                :right="[
                                    {
                                    content: '删除',
                                    style: { background: '#EF4C4F', color: '#fff'},
                                    handler: () => deleteFund(index)
                                    }
                                ]">
                                <input type="number" class="zm-input large" v-model="item.accumulationFundCode">
                            </zm-cell-swiper>
                            <zm-cell :labelName="'缴纳地'" :class="{'is-danger': veeErrors.has('accumulationFundPlace' + index) }">
                                <input type="text" class="zm-input" v-model="item.accumulationFundPlace" :name="'accumulationFundPlace' + index" v-validate="'required'">
                            </zm-cell>
                        </div>
                    </div>
                </div>
                <zm-cell align="center"  v-if="registration.hasHouseFundHis === 0">
                    <div class="add-box"  @click="addFund()">
                        <i class="icon-add add"></i>
                        <span class="text">添加</span>
                    </div>
                </zm-cell>
                -->
            </div>
            <zm-title>证件资料 (必填)</zm-title>
            <div class="uploader-wrapper" style="margin-bottom:10px;">
                <zmUpload 
                    :imgUrl="require('common/images/ID card-front.png')" 
                    :fileName="'身份证'"
                    :before-upload="beforeUpload"
                    :on-success="onSuccess"
                    :on-error="onError"
                    v-model="registration.centificateFrontPic"
                    :imageKey.sync="registration.centificateFrontPic"
                    :imageUrl.sync="registration.centificateFrontPicUrl"
                    :class="{'is-danger': veeErrors.has('centificateFrontPic') }"
                    :name="'centificateFrontPic'" v-validate="'required'">点击上传身份证正面</zmUpload>
                <zmUpload 
                    :imgUrl="require('common/images/ID card-behind.png')" 
                    :fileName="'身份证'"
                    :before-upload="beforeUpload"
                    :on-success="onSuccess"
                    :on-error="onError"
                    v-model="registration.centificateBackPic"
                    :imageKey.sync="registration.centificateBackPic"
                    :imageUrl.sync="registration.centificateBackPicUrl"
                    :class="{'is-danger': veeErrors.has('centificateBackPic') }"
                    :name="'centificateBackPic'" v-validate="'required'">点击上传身份证反面</zmUpload>
            </div>
            <zm-title>个人照片 (必填)</zm-title>
            <div class="uploader-wrapper regist">
                <zmUpload 
                    :imgUrl="require('common/images/per-photo.png')" 
                    :keyName="'personalPic'"
                    :fileName="'个人照片'"
                    :before-upload="beforeUpload"
                    :on-success="onSuccess"
                    :on-error="onError"
                    v-model="registration.personalPic"
                    :imageKey.sync="registration.personalPic"
                    :imageUrl.sync="registration.personalPicUrl"
                    :class="{'is-danger': veeErrors.has('personalPic') }"
                    :name="'personalPic'" v-validate="'required'">
                        <div><span>点击上传个人照片</span></div>
                        <div><span>(白色背景上半身正面照)</span></div>
                    </zmUpload>
            </div>
            <mt-button type="default" :plain="true" class="themefillbutton" @click="goNext()">下一步</mt-button>
        </div>
    </div>
</template>
<script>
    import zmCell from 'base/zmCell/zmCell.vue';
    import zmTitle from 'base/title/zmTitle.vue';
    import zmCheckBox from 'base/zmCheckBox/zmCheckBox.vue';
    import getCode from 'base/getCode/getCode.vue';
    import zmCellSwiper from 'base/zmCellSwiper/index.js';
    import zmUpload from 'base/zmUpload/zmUpload.vue';
    // import headStep from "base/headstep/headstep.vue";
    import {sysVersion,Storage} from "common/js/utils.js";
    import toBlob from 'blueimp-canvas-to-blob';

    import dateTool from 'common/js/datetool.js';

    import { saveInfo,getOrgs,getDicts,SaveImg } from "api/common/dicts.js";
    const storage = new Storage();
    export default {
        name:'registration',
        data() {
            return {
                currentIndex:1,
                registration:{
                    orgId:"",
                    personType:"",
                    workCity:"",
                    marriageBearStatus:"",
                    hasBankCard:null,
                    bankSubbranch:"",
                    bankNumber:"",
                    hasSocialSecurityHis:null,
                    hasHouseFundHis:null,
                    fundNumber:"",
                    bankCardPic:'',
                    personalPic:'',
                    centificateFrontPic:'',
                    centificateBackPic:'',
                    bankCardPicUrl:'',
                    personalPicUrl:'',
                    centificateFrontPicUrl:'',
                    centificateBackPicUrl:''
                },
                imgArr:{
                    'bankCardPic':'',
                    'personalPic':'',
                    'centificateFrontPic':'',
                    'centificateBackPic':'',
                    'educationDegreePic0':'',
                    'educationDegreePic1':'',
                    'graduationCertificatePic0':'',
                    'graduationCertificatePic1':'',
                },
                // imgName:{
                //     'bankCardPic':'银行卡',
                //     'personalPic':'个人照片',
                //     'centificateFrontPic':'身份证',
                //     'centificateBackPic':'身份证',
                //     'educationDegreePic0':'毕业证',
                //     'educationDegreePic1':'毕业证',
                //     'graduationCertificatePic0':'学位证',
                //     'graduationCertificatePic1':'学位证',
                // },
                orgs:[],
                workPlace:[],
                value:'',
                txt:'',
                src:'',
                testdata:{},
                test:'',
                personType:"",
                marriageBearStatus:"",
                workCity:[],
                workID:''
            }
        },
        computed:{
            workName:function() {
                let result = '';
                this.workCity.map((item) => {
                    if(item.itemCode === this.workID) {
                        result = item.itemName.slice(0,2)
                    }
                })
                return result;
            }
        },
        methods:{
            beforeUpload(file) {
                if(!file.size) {
                    this.$toast({message: '未找到图片',position: 'center',duration: 1000});
                    return false;
                } else {
                    this.$indicator.open({text: '图片上传中'});
                }
            },
            onSuccess() {
                this.$indicator.close();
                this.$toast({message: '上传成功',position: 'center',duration: 1000});
            },
            onError() {
                this.$indicator.close();
                this.$messageBox({
                    title: '提示',
                    message:  '上传失败,请重新上传',
                    showCancelButton:false,
                    showConfirmButton:true,
                    alertClass:true,
                });
            },
            switchTab(router) {
                // storage.setStorage('registration',this.registration);
                // this.$router.push({path:`/${router}`});
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        if(storage.getStorage('userinfo') && router === 'userInfo') {
                            this.$router.push({path:`/${router}`});
                        } else if(storage.getStorage('registration') && router === 'registration') {
                            this.$router.push({path:`/${router}`});
                        } else if(storage.getStorage('experience') && router === 'experience') {
                            this.$router.push({path:`/${router}`});
                        }
                        storage.setStorage('registration',this.registration);
                        return;
                    }
                })
            },
            changeSocialSecurity(index) {
                if(index === 0) {
                    this.registration.socialSecurityPlace = [this.workName];
                }else if (index === 1) {
                    this.registration.socialSecurityPlace = [];
                }
            },
            changeAccumulationFund(index) {
                if(index === 0) {
                    this.registration.accumulationFund[0].accumulationFundPlace=this.workName;
                }else if (index === 1) {
                    this.registration.accumulationFund[0].accumulationFundPlace="";
                }
            },
            deleteCity(index) {
                this.registration.socialSecurityPlace.splice(index,1);
            },
            addCity(){
                this.registration.socialSecurityPlace.push('')
            },
            deleteFund(index) {
                this.registration.accumulationFund.splice(index,1);
            },
            addFund() {
                this.registration.accumulationFund.push({accumulationFundCode:'',accumulationFundPlace:''})
            },
            goNext() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        storage.setStorage('registration',this.registration);
                        this.$router.push({path:'/tab/experience'})
                        return;
                    }
                    console.log("Correct them errors!");
                });
            }
        },
        created() {
        },
        mounted() {
            scrollTo(0,0);
            // 用工形式
            getDicts('PERSON_TYPE').then((result) => {
                this.personType = result.data;
            });
            // 婚育状况
            getDicts('MARRIAGE_BEAR_STATUS').then((result) => {
                this.marriageBearStatus = result.data;
            })
            getOrgs().then(result => {
                if (result.code === '1') {
                    this.orgs = result.data.map((item) => {
                        return {'orgName':item.orgName,'orgId':item.orgId}
                    })
                }
            });
            //工作地点
            getDicts('WORK_PLACE').then((result) => {
                if (result.code === '1') {
                    this.workCity = result.data;
                }
            });
            // 获取缓存中的数据
            this.$nextTick(() => {
                if(storage.getStorage('registration')) {
                    this.registration = storage.getStorage('registration');
                }
                if(storage.getStorage('userinfo')) {
                    this.workID = storage.getStorage('userinfo').workCity;
                }
            })
        },
        components:{
            zmCell,
            zmTitle,
            zmCheckBox,
            getCode,
            zmCellSwiper,
            zmUpload,
            // headStep
        }
    }
</script>

