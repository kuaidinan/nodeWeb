<template>
    <div class="main-wrapper">
        <!--
        <head-step :titles="['个人信息','入职登记','相关经历']" :routers="['userInfo','registration','experience']" :currentIndex="currentIndex" @switchTab="switchTab"></head-step>
        -->
        <div class="main">
            <zm-title>个人资料 (必填)</zm-title>
            <div class="table-wrapper readonly large">
                <zm-cell :labelName="'姓名'" :class="{'is-danger': veeErrors.has('personName') }">
                    <input type="text" v-model="userInfo.personName" name="personName" v-validate="'required'"/>
                </zm-cell>
                <zm-cell :labelName="'手机号'" :class="{'is-danger': veeErrors.has('mobile') }">
                    <input  type="number" v-model="userInfo.mobile" name="mobile" v-validate="'isMobile|required'"/>
                </zm-cell>
                <zm-cell :labelName="'身份证号'" :class="{'is-danger': veeErrors.has('idNumber') }">
                    <input v-model="userInfo.idNumber" name="idNumber" v-validate="'required|isNumberId'"/>
                </zm-cell>
            </div>
            <div class="table-wrapper">
                <!--
                <zm-cell :labelName="'poppicker例子'" :class="{'is-danger': veeErrors.has('idNumber') }">
                    <popup-picker 
                        :title="''"
                        show-name
                        :data="list" 
                        v-model="test"
                        class="no-right"
                        ></popup-picker>
                    <img src="~common/images/arrow.png" class="img-arrow"></img>
                </zm-cell>
                -->
                <zm-cell :labelName="'性别'" :class="{'is-danger': veeErrors.has('personSex') }">
                    <zm-check-box :options="[{label:'男',value:1},{label:'女',value:0}]" v-model="userInfo.personSex" name="personSex" v-validate="'required'"></zm-check-box>
                </zm-cell>
                <zm-cell :labelName="'出生日期'" :class="{'is-danger': veeErrors.has('birthday') }">
                    <group class="vux-time">
                        <datetime v-model="userInfo.birthday"
                            :start-date="'1950-01-01'"
                            confirm-text="完成" cancel-text="出生日期"
                            year-row="{value}年" month-row="{value}月" day-row="{value}日"
                            class="zm-time no-right" name="birthday" v-validate="'required'" format="YYYY-MM-DD"></datetime>
                    </group>
                    <img src="~common/images/arrow.png" class="img-arrow"></img>
                </zm-cell>
            </div>
            <zm-title>户籍信息 (必填)</zm-title>
            <div class="table-wrapper">
                <zm-cell :labelName="'民族'" :class="{'is-danger': veeErrors.has('nation') }">
                    <input v-model="userInfo.nation" v-validate="'required'" name="nation" placeholder='例"回族"'/>
                </zm-cell>
                <zm-cell :labelName="'政治面貌'" :class="{'is-danger': veeErrors.has('politicalStatus') }">
                    <div class="input-div">
                        <select v-model="userInfo.politicalStatus" :class="{'zm-select-default':userInfo.politicalStatus === ''}" class="zm-select" name="politicalStatus" v-validate="'required'">
                            <option value="">请选择</option>
                            <option :value="item.itemCode" v-for="(item,index) in politicsStatus" :key="index">{{item.itemName}}</option>
                        </select>
                        <img src="~common/images/arrow.png" class="img-arrow"></img>
                    </div>
                </zm-cell>
                <zm-cell :labelName="'籍贯'" :class="{'is-danger': veeErrors.has('originPlace') }">
                    <input placeholder='例"湖北"' v-model="userInfo.originPlace" v-validate="'required'" name="originPlace"/>
                </zm-cell>
                <zm-cell :labelName="'户口性质'" :class="{'is-danger': veeErrors.has('houseHoldType') }">
                    <div class="input-div">
                        <select v-model="userInfo.houseHoldType" class="zm-select" :class="{'zm-select-default':userInfo.houseHoldType === ''}" name="houseHoldType" v-validate="'required'">
                            <option value="">请选择</option>
                            <option :value="item.itemCode" v-for="(item,index) in houseHoldType" :key="index">{{item.itemName}}</option>
                        </select>
                        <img src="~common/images/arrow.png" class="img-arrow"></img>
                    </div>
                </zm-cell>
                <zm-cell :labelName="'户籍地址'" :class="{'is-danger': veeErrors.has('homeAddress') }">
                    <group>
                        <x-textarea ref="homeAddress" v-model="userInfo.homeAddress" :show-counter="false" :rows="1" autosize name="homeAddress" v-validate="'required'" placeholder="以户口本信息为准"></x-textarea>
                    </group>
                </zm-cell>
                <zm-cell :labelName="'现居住地址'" :class="{'is-danger': veeErrors.has('presentAddress') }">
                    <group>
                        <x-textarea ref="presentAddress" v-model="userInfo.presentAddress" name="presentAddress" v-validate="'required'" :show-counter="false" :rows="1" autosize></x-textarea>
                    </group>
                </zm-cell>
            </div>
            <zm-title>紧急联系方式</zm-title>
            <div class="table-wrapper">
                <zm-cell :labelName="'紧急联系人'">
                    <input type="text" v-model="userInfo.emergencyContactName"/>
                </zm-cell>
                <zm-cell :labelName="'与其关系'">
                    <input type="text" v-model="userInfo.relationship"/>
                </zm-cell>
                <zm-cell :labelName="'紧急联系人电话'">
                    <input type="number" v-model="userInfo.emergencyContactTelephone" oninput="if(value.length>11)value=value.slice(0,11)">
                </zm-cell>
            </div>
            <zm-title>其他资料 (必填)</zm-title>
            <div class="table-wrapper">
                <zm-cell :labelName="'工作地点'" :class="{'is-danger': veeErrors.has('workCity') }">
                    <div class="input-div">
                        <select v-model="userInfo.workCity" class="zm-select" name="workCity" v-validate="'required'" :class="{'zm-select-default':userInfo.workCity === ''}">
                            <option value="">请选择</option>
                            <option :value="item.itemCode" v-for="(item,index) in workCity" :key="index">{{item.itemName}}</option>
                        </select>
                        <img src="~common/images/arrow.png" class="img-arrow"></img>
                    </div>
                </zm-cell>
                <zm-cell :labelName="'婚育状态'" :class="{'is-danger': veeErrors.has('marriageBearStatus') }">
                    <div class="input-div">
                        <select v-model="userInfo.marriageBearStatus" class="zm-select" name="marriageBearStatus" v-validate="'required'" :class="{'zm-select-default':userInfo.marriageBearStatus === ''}">
                            <option value="">请选择</option>
                            <option :value="item.itemCode" v-for="(item,index) in marriageBearStatus" :key="index">{{item.itemName}}</option>
                        </select>
                        <img src="~common/images/arrow.png" class="img-arrow"></img>
                    </div>
                </zm-cell>
            </div>
            <mt-button type="default" :plain="true" class="themefillbutton" @click="goNext()">下一步</mt-button>
        </div>
    </div>
</template>
<script>
    import zmCell from "base/zmCell/zmCell.vue";
    import zmTitle from "base/title/zmTitle.vue";
    import zmCheckBox from "base/zmCheckBox/zmCheckBox.vue";
    import zmField from "base/zmField/index.js";
    import getCode from "base/getCode/getCode.vue";
    // import headStep from "base/headstep/headstep.vue";
    import zmCellSwiper from 'base/zmCellSwiper/index.js';
    import toBlob from 'blueimp-canvas-to-blob';
    import {sysVersion,Storage} from "common/js/utils.js";

    import { Datetime,Group,XTextarea } from 'vux'

    import { getDicts,saveInfo,GetCodes,CheckCode,CheckEmp,getOrgs,SaveImg } from "api/common/dicts.js";
    import { getData } from "common/js/dom.js";
    const toastTime = '4000';
    const storage = new Storage();
    export default {
        name:'userinfo',
        data() {
            return {
                currentIndex:0,
                userInfo: {
                    personName: "",
                    personSex: null,
                    birthday: "",
                    idNumber: "",
                    mobile: "",
                    nation: "",
                    politicalStatus: "",
                    originPlace: "",
                    houseHoldType: "",
                    homeAddress: "",
                    presentAddress:"",
                    workCity:'',
                    marriageBearStatus:'',
                    emergencyContactName:'',
                    relationship:'',
                    emergencyContactTelephone:'',
                },
                code:'',
                codeFlag:false,
                orgs:[],
                workCity:[],
                edu:"",
                personType:"",
                marriageBearStatus:"",
                politicsStatus:"",
                houseHoldType:"",
                autoCompress: 1024 * 1024,
                quality:0.6,
                test:[],
                list:[[{
                    name: '2019届5班',
                    value: '1'
                    }, {
                    name: '2019届4班',
                    value: '2'
                }]],
                sexNum:''
            };
        },
        mounted() {
            scrollTo(0,0);
            // 政治面貌
            getDicts('POLITICS_STATUS').then((result) => {
                this.politicsStatus = result.data;
            })
            // 户口性质
            getDicts('HOUSEHOLD_TYPE').then((result) => {
                this.houseHoldType = result.data;
            });
            // 婚育状况
            getDicts('MARRIAGE_BEAR_STATUS').then((result) => {
                this.marriageBearStatus = result.data;
            })
            //工作地点
            getDicts('WORK_PLACE').then((result) => {
                this.workCity = result.data;
            });
            // 获取缓存中的数据
            this.$nextTick(() => {
                if(storage.getStorage('userinfo')) {
                    this.userInfo = storage.getStorage('userinfo');
                    this.$nextTick(() => {
                        this.$refs.presentAddress.updateAutosize();
                        this.$refs.homeAddress.updateAutosize();
                    })
                }
                if(storage.getStorage('authentication')) {
                    // {"data":{"personName":"徐强","idNumber":"320525199104113035","mobile":"13405243481","code":"736518","codeFlag":true}}
                    var option = storage.getStorage('authentication');
                    this.userInfo.personName = option.personName;
                    this.userInfo.idNumber = option.idNumber;
                    this.userInfo.mobile = option.mobile;
                    if(option.idNumber) {
                        this.userInfo.personSex = (option.idNumber.toString()[16]%2 === 1)?1:0
                    }
                }
            })
            // this.$refs.presentAddress.updateAutosize();
            // this.$refs.homeAddress.updateAutosize();
        },
        methods: {
            switchTab(router) {
                // storage.setStorage('userinfo',this.userInfo);
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
                        storage.setStorage('userinfo',this.userInfo);
                        return;
                    }
                })
            },
            validSex() {
                var idNumberString = this.userInfo.idNumber.toString();
                if(idNumberString.length === 18) {
                    this.sexNum = this.userInfo.idNumber.toString()[16]%2;
                } else if (idNumberString.length === 15) {
                    this.sexNum = this.userInfo.idNumber.toString()[14]%2;
                }
                if(this.sexNum !== this.userInfo.personSex) {
                    this.$messageBox({
                        title: '提示',
                        message:  '性别与身份证不符',
                        showCancelButton:false,
                        showConfirmButton:true,
                        alertClass:true,
                    });
                    return true;
                }
            },
            goNext() {
                if(this.validSex()) {
                    return;
                }
                this.$validator.validateAll().then(result => {
                    if (result) {
                        storage.setStorage('userinfo',this.userInfo);
                        this.$router.push({path:'/tab/registration'});
                        return;
                    }
                    console.log("Correct them veeErrors!");
                });
            },
        },
        components: {
            zmCell,
            zmTitle,
            zmCheckBox,
            getCode,
            zmField,
            // headStep,
            zmCellSwiper,
            Datetime,
            Group,
            XTextarea,
            // PopupPicker
        }
    };
</script>