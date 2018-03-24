<template>
    <div class="main-wrapper">
        <!--
        <head-step :titles="['个人信息','入职登记','相关经历']" :routers="['userInfo','registration','experience']" :currentIndex="currentIndex" @switchTab="switchTab"></head-step>
        -->
        <div class="main">
            <zm-title>教育信息 (必填)</zm-title>
                <div class="add-box-wrapper">
                    <div v-for="(item,index) in experience.education" :key="index" class="add-box-li">
                        <div class="table-wrapper add-box" :class="{'no-border':(item.education !== '' && !item.internship),'has-eduadd':experience.education.length > 1}">
                            <zm-cell-swiper
                                :title="'毕业院校'"
                                :star="false"
                                :class="{'is-danger': veeErrors.has('university' + index) }"
                                :isiconshow="experience.education.length > 1"
                                @deleteRow="deleteEducation(index)"
                                :right="[
                                    {
                                    content: '删除',
                                    style: { background: '#EF4C4F', color: '#fff', width:'76px','text-align':'center','font-size':'15px'},
                                    handler: () => deleteEducation(index)
                                    }
                                ]">
                                    <input type="text" class="zm-input large" v-model="item.university" placeholder='例"武汉理工大学"' :name="'university' + index" v-validate="'required'">
                            </zm-cell-swiper>
                            <zm-cell :labelName="'起止时间'" :hasIcon="experience.education.length > 1" :class="{'is-danger': veeErrors.has('educationTimeStart' + index) || veeErrors.has('educationTimeEnd' + index)}">
                                <div class="input-div vux-time-wrapper">
                                    <group class="vux-time small">
                                        <datetime 
                                            ref="startTime"
                                            placeholder="开始时间"
                                            confirm-text="完成" cancel-text="开始时间"
                                            year-row="{value}年" month-row="{value}月" day-row="{value}日"
                                            :start-date="'1950-01-01'"
                                            v-model="item.educationTimeStart"
                                            :name="'educationTimeStart' + index" 
                                            v-validate="'required'"
                                            class="zm-time no-right small" format="YYYY-MM-DD"></datetime>
                                    </group>
                                    <span class="word">至</span>
                                    <group class="vux-time small">
                                        <datetime 
                                            placeholder="结束时间"
                                            confirm-text="完成" cancel-text="结束时间"
                                            year-row="{value}年" month-row="{value}月" day-row="{value}日"
                                            :start-date="'1950-01-01'"
                                            v-model="item.educationTimeEnd"
                                            class="zm-time no-right" format="YYYY-MM-DD"
                                            :name="'educationTimeEnd' + index" 
                                            @on-confirm="Internship(index)"
                                            v-validate="'required'"></datetime>
                                    </group>
                                </div>
                                <img src="~common/images/arrow.png" class="img-arrow"></img>
                            </zm-cell>
                            <zm-cell :labelName="'专业'" :hasIcon="experience.education.length > 1" :class="{'is-danger': veeErrors.has('major' + index) }">
                                <input class="zm-input" v-model="item.major" placeholder='例"机械自动化"' :name="'major' + index" v-validate="'required'">
                            </zm-cell>
                            <zm-cell :labelName="'学历'" :hasIcon="experience.education.length > 1" :class="{'is-danger': veeErrors.has('education' + index),'no-border':(item.education !== '' && !item.internship)}">
                                <div class="input-div">
                                    <select v-model="item.education" class="zm-select" :name="'education' + index" v-validate="'required'" :class="{'zm-select-default':item.education === ''}">
                                        <option value="">请选择</option>
                                        <option :value="item.itemCode" v-for="(item, index) in edu" :key="index">{{item.itemName}}</option>
                                    </select>
                                    <img src="~common/images/arrow.png" class="img-arrow"></img>
                                </div>
                            </zm-cell>
                        </div>
                        <zm-title v-if='item.education !== "" && !item.internship'>证件资料</zm-title>
                        <div class="uploader-wrapper" style="margin-bottom:7px;" v-if='item.education !== "" && !item.internship'>
                            <!--
                            <zmUpload 
                                :imgUrl="require('common/images/diploma.png')" 
                                :keyName="'educationDegreePic' + index"
                                :fileName="'毕业证'"
                                :before-upload="beforeUpload"
                                :on-success="onSuccess"
                                :on-error="onError"
                                v-model="imgArr[`educationDegreePic${index}`]"
                                :imageKey.sync="imgArr[`educationDegreePic${index}`]"
                                :imageUrl.sync="imgUrl[`educationDegreePic${index}`]"
                                :class="{'is-danger': veeErrors.has('educationDegreePic' + index) }"
                                :name="'educationDegreePic' + index" v-validate="'required'">点击上传毕业证图片</zmUpload>
                            <zmUpload 
                                :imgUrl="require('common/images/award.png')" 
                                :keyName="'graduationCertificatePic' + index"
                                :fileName="'学位证'"
                                :before-upload="beforeUpload"
                                :on-success="onSuccess"
                                :on-error="onError"
                                v-model="imgArr[`graduationCertificatePic${index}`]"
                                :imageKey.sync="imgArr[`graduationCertificatePic${index}`]"
                                :imageUrl.sync="imgUrl[`graduationCertificatePic${index}`]">点击上传学位证图片</zmUpload>
                                -->
                            <zmUpload 
                                :imgUrl="require('common/images/diploma.png')" 
                                :keyName="'educationDegreePic' + index"
                                :fileName="'毕业证'"
                                :before-upload="beforeUpload"
                                :on-success="onSuccess"
                                :on-error="onError"
                                v-model="item.educationDegreePicKey"
                                :imageKey.sync="item.educationDegreePicKey"
                                :imageUrl.sync="item.educationDegreePicUrl"
                                :class="{'is-danger': veeErrors.has('educationDegreePic' + index) }"
                                :name="'educationDegreePic' + index" v-validate="'required'">点击上传毕业证图片</zmUpload>
                            <zmUpload 
                                :imgUrl="require('common/images/award.png')" 
                                :keyName="'graduationCertificatePic' + index"
                                :fileName="'学位证'"
                                :before-upload="beforeUpload"
                                :on-success="onSuccess"
                                :on-error="onError"
                                v-model="item.graduationCertificatePicKey"
                                :imageKey.sync="item.graduationCertificatePicKey"
                                :imageUrl.sync="item.graduationCertificatePicUrl">点击上传学位证图片</zmUpload>
                        </div>              
                    </div>
                </div>
            <div class="table-wrapper" style="border-radius:0;margin-bottom:0px;" v-if="experience.education.length <= 1">
                <zm-cell align="center">
                    <div class="add-box" @click="addEducation()">
                        <i class="icon-add add"></i>
                        <span class="text">添加</span>
                    </div>
                </zm-cell>
            </div>
            <zm-title style="margin-top:10px;">工作经历</zm-title>
            <div class="add-box-wrapper">
                <div v-for="(item,index) in experience.work" :key="index" class="add-box-li">
                    <div class="table-wrapper add-box" :class="{'has-add':experience.work.length > 2}">
                        <zm-cell-swiper
                            :title="'公司名称'"
                            :star="false"
                            :isiconshow="experience.work.length > 1"
                            @deleteRow="deletework(index)"
                            :right="[
                                {
                                content: '删除',
                                style: { background: '#EF4C4F', color: '#fff', width:'76px','text-align':'center','font-size':'15px'},
                                handler: () => deletework(index)
                                }
                            ]">
                                <input type="text" class="zm-input large" v-model="item.companyName">
                        </zm-cell-swiper>
                        <zm-cell :labelName="'起止时间'" :star="false" :hasIcon="experience.work.length > 1">
                            <div class="input-div">
                                <group class="vux-time small">
                                    <datetime 
                                        placeholder="开始时间"
                                        confirm-text="完成" cancel-text="开始时间"
                                        year-row="{value}年" month-row="{value}月" day-row="{value}日"
                                        :start-date="'1950-01-01'"
                                        v-model="item.workTimeStart"
                                        class="zm-time no-right" format="YYYY-MM"></datetime>
                                </group>
                                <span class="word">至</span>
                                <group class="vux-time small">
                                    <datetime 
                                        placeholder="结束时间"
                                        confirm-text="完成" cancel-text="结束时间"
                                        year-row="{value}年" month-row="{value}月" day-row="{value}日"
                                        :start-date="'1950-01-01'"
                                        v-model="item.workTimeEnd"
                                        class="zm-time no-right" format="YYYY-MM"></datetime>
                                </group>
                            </div>
                            <img src="~common/images/arrow.png" class="img-arrow"></img>
                        </zm-cell>
                        <zm-cell :labelName="'职位名称'" :star="false" :hasIcon="experience.work.length > 1">
                            <input class="zm-input" v-model="item.positionName">
                        </zm-cell>
                        <zm-cell :labelName="'HR 姓名'" :star="false" :hasIcon="experience.work.length > 1">
                            <input class="zm-input" v-model="item.HRName">
                        </zm-cell>
                        <zm-cell :labelName="'HR 联系方式'" :star="false" :hasIcon="experience.work.length > 1">
                            <input class="zm-input" v-model="item.HRContact" type="number" oninput="if(value.length>11)value=value.slice(0,11)">
                        </zm-cell>
                    </div>
                </div>
            </div>
            <div class="table-wrapper addwork" style="border-radius:0;" v-if="experience.work.length <= 2">
                <zm-cell align="center">
                    <div class="add-box" @click="addwork()">
                        <i class="icon-add add"></i>
                        <span class="text">添加</span>
                    </div>
                </zm-cell>
            </div>
            <mt-button type="default" :plain="true" class="themefillbutton" @click="goNext()">提交审核</mt-button>
        </div>
    </div>
</template>
<script>
    import zmCell from 'base/zmCell/zmCell.vue';
    import zmTitle from 'base/title/zmTitle.vue';
    import zmCheckBox from 'base/zmCheckBox/zmCheckBox.vue';
    import zmCellSwiper from 'base/zmCellSwiper/index.js';
    import zmUpload from 'base/zmUpload/zmUpload.vue';
    import getCode from 'base/getCode/getCode.vue';
    // import headStep from "base/headstep/headstep.vue";

    import toBlob from 'blueimp-canvas-to-blob';
    import {sysVersion,Storage} from "common/js/utils.js";

    import { Datetime,Group } from 'vux'

    import { saveInfo,getDicts,SaveImg } from "api/common/dicts.js";
    const storage = new Storage();
    const toastTime = '4000';
    export default {
        name:'experience',
        data() {
            return {
                currentIndex:2,
                experience:{
                    education:[
                        {
                            university:"",
                            major:"",
                            educationTimeStart:null,
                            educationTimeEnd:null,
                            // educationTimeStart:"2000-01-01",
                            // educationTimeEnd:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
                            education:"",
                            diploma:[],
                            degreeCertificate:[],
                            internship:true,
                            educationDegreePicKey:null,
                            educationDegreePicUrl:null,
                            graduationCertificatePicKey:null,
                            graduationCertificatePicUrl:null,
                        }
                    ],
                    work:[
                        {
                            companyName:"",
                            workTimeStart:"",
                            workTimeEnd:"",
                            positionName:"",
                            HRName:"",
                            HRContact:""
                        }
                    ]
                },
                registration:{
                    personType:0
                },
                // imgArr:{
                //     educationDegreePic0:'',
                //     educationDegreePic1:'',
                //     graduationCertificatePic0:'',
                //     graduationCertificatePic1:'',
                // },
                // imgUrl:{
                //     educationDegreePic0:'',
                //     educationDegreePic1:'',
                //     graduationCertificatePic0:'',
                //     graduationCertificatePic1:'',
                // },
                imgName:{
                    'educationDegreePic0':'毕业证',
                    'educationDegreePic1':'毕业证',
                    'graduationCertificatePic0':'学位证',
                    'graduationCertificatePic1':'学位证',
                },
                edu:"",
                txt:'',
                file:[],
                files1:[],
                files2:[],
                files3:[],
                src:''
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
            onSuccess(result) {
                this.$nextTick(() => {
                    this.$validator.validate(result.keyName)
                })
                this.$indicator.close();
                this.$toast({message: '上传成功',position: 'center',duration: 1000});
            },
            onError() {
                this.$indicator.close();
                this.$messageBox({
                    title: '提示',
                    message:  '上传失败,请重新上传',
                    showCancelButton: '确定'
                });
            },
            addEducation() {
                this.experience.education.push({
                    university:"",
                    major:"",
                    educationTimeStart:null,
                    educationTimeEnd:null,
                    education:"",
                    diploma:[],
                    degreeCertificate:[],
                    internship:true,
                    educationDegreePicKey:'',
                    educationDegreePicUrl:'',
                    graduationCertificatePicKey:'',
                    graduationCertificatePicUrl:'',
                })
            },
            addwork() {
                this.experience.work.push({
                    companyName:"",
                    workTimeStart:"",
                    workTimeEnd:"",
                    positionName:"",
                    HRName:"",
                    HRContact:""
                })
            },
            deleteEducation(index) {
                this.$messageBox({
                    title: '',
                    message: '是否确认删除',
                    showConfirmButton:true,
                    showCancelButton:true,
                    alertClass:false,
                    type:'confirm'
                }).then((result) => {
                    if(result === 'confirm') {
                        if(this.experience.education.length > 1) {
                            this.experience.education.splice(index,1);
                        } else {
                            this.$messageBox({
                                title: '提示',
                                message:  '至少需要一条教育经历',
                                showCancelButton:false,
                                showConfirmButton:true,
                                alertClass:true,
                            });
                        }
                    }
                });
            },
            deletework(index) {
                this.$messageBox({
                    title: '',
                    message: '是否确认删除',
                    showConfirmButton:true,
                    showCancelButton:true,
                    alertClass:false,
                    type:'confirm'
                }).then((result) => {
                    if(result === 'confirm') {
                        this.experience.work.splice(index,1);
                    }
                });
            },
            switchTab(router) {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        if(storage.getStorage('userinfo') && router === 'userInfo') {
                            this.$router.push({path:`/${router}`});
                        } else if(storage.getStorage('registration') && router === 'registration') {
                            this.$router.push({path:`/${router}`});
                        } else if(storage.getStorage('experience') && router === 'experience') {
                            this.$router.push({path:`/${router}`});
                        }
                        storage.setStorage('experience',this.experience);
                        // storage.setStorage('imgArr',this.imgArr);
                        // storage.setStorage('imgUrl',this.imgUrl);
                        return;
                    }
                })
            },
            goNext() {
                let userInfo = this.userInfo;
                let experience = this.experience;
                let registration = this.registration;
                // var valid = [
                //     {filed:userInfo.personName,msg:'姓名未填写'},
                //     {filed:userInfo.mobile,msg:'手机号未填写'},
                //     {filed:userInfo.idNumber,msg:'身份证号未填写'},
                //     {filed:userInfo.birthday,msg:'出生日期未选择'},
                //     {filed:userInfo.nation,msg:'名族未填写'},
                //     {filed:userInfo.politicalStatus,msg:'政治面貌未选择'},
                // ];
                // if(!this.validatePop(valid)) {
                //     return;
                // }
                this.$validator.validateAll().then(result => {
                    if (result) {
                        // 验证经历的时间
                        let validateEdu = this.experience.education.map((item) => {
                            let option={
                                educationTimeStart:item.educationTimeStart,
                                educationTimeEnd:item.educationTimeEnd
                            }
                            return option;
                        })
                        for(var i=0;i<validateEdu.length;i++) {
                            if (validateEdu[i].educationTimeStart > validateEdu[i].educationTimeEnd) {
                                this.$messageBox({
                                    title: '提示',
                                    message:  '教育信息的开始时间不能大于结束时间',
                                    showCancelButton:false,
                                    showConfirmButton:true,
                                    alertClass:true,
                                });
                                return;
                            }
                        }

                        let validateWork = this.experience.work.map((item) => {
                            let option={
                                workTimeStart:item.workTimeStart,
                                workTimeEnd:item.workTimeEnd
                            }
                            return option;
                        })

                        for(var i=0;i<validateWork.length;i++) {
                            if(validateWork[i].workTimeStart && validateWork[i].workTimeEnd) {
                                if (validateWork[i].workTimeStart > validateWork[i].workTimeEnd) {
                                    this.$messageBox({
                                        title: '提示',
                                        message:  '工作经验的开始时间不能大于结束时间',
                                        showCancelButton:false,
                                        showConfirmButton:true,
                                        alertClass:true,
                                    });
                                    return;
                                }
                            }
                        }
                        storage.setStorage('experience',this.experience);
                        // storage.setStorage('imgArr',this.imgArr);
                        // storage.setStorage('imgUrl',this.imgUrl);

                        var formData = new window.FormData();
                        // 个人信息
                        for(var key in userInfo) {
                            if (userInfo[key] !== "") {
                                formData.append(key,userInfo[key]);
                            }
                        }
                        // 入职登记
                        for(var key in registration) {
                            if((key === 'bankSubbranch' || key === 'bankNumber') && registration.hasBankCard === 0) {
                                formData.append(key,registration[key]);
                            } else if(key === 'fundNumber' && registration.hasHouseFundHis === 1){
                                formData.append(key,registration[key]);
                            } else if ((key === 'hasSocialSecurityHis' || key === 'hasHouseFundHis' || key === 'orgId'|| key === 'personType'|| key === 'workCity'|| key === 'marriageBearStatus' || key === 'bankCardPic' || key === 'personalPic' || key === 'centificateFrontPic' || key === 'centificateBackPic') && registration[key] !== "") {
                                formData.append(key,registration[key]);
                            }
                        }
                        // 相关经历
                        let educationData = experience.education.map((item,index) => {
                            let option = {
                                graduateSchool:item.university,
                                major:item.major,
                                startDate:item.educationTimeStart,
                                endDate:item.educationTimeEnd,
                                education:item.education,
                            }
                            return option;
                        })

                        formData.append('educationExperience',JSON.stringify(educationData));

                        let workOption = experience.work.map((item,index) => {
                            let option = {
                                companyName:item.companyName,
                                hrName:item.HRName,
                                hrMobile:item.HRContact,
                                jobName:item.positionName
                            }
                            if (item.workTimeStart) {
                                option.startDate = item.workTimeStart
                            }
                            if (item.workTimeEnd) {
                                option.endDate = item.workTimeEnd
                            }
                            return option;
                        })
                        formData.append('workExperience',JSON.stringify(workOption));

                        // 照片
                        for(var i=0;i<this.experience.education.length;i++) {
                            if(!this.experience.education[i].internship) {
                                formData.append(`educationDegreePic${i}`,this.experience.education[i].educationDegreePicKey)
                                formData.append(`graduationCertificatePic${i}`,this.experience.education[i].graduationCertificatePicKey)
                            }
                        }
                        // for(let key in this.imgArr) {
                        //     formData.append(key,this.imgArr[key])
                        // }

                        // 添加用工形式
                        var isInternship = false
                        for(var i=0;i<this.experience.education.length;i++) {
                            if(this.experience.education[i].internship) {
                                isInternship = true;
                                break;
                            }
                        }
                        if(isInternship) {
                            formData.append('personType','1')
                        } else {
                            formData.append('personType','0')
                        }

                        // 发出请求
                        this.$indicator.open({text: '数据较多,请耐心等待'});
                        saveInfo(formData).then((result) => {
                            if (result.data.code === '1') {
                                this.$router.push({path:'/result'});
                            } else {
                                this.$messageBox({
                                    title: '提示',
                                    message:  result.data.message,
                                    showCancelButton:false,
                                    showConfirmButton:true,
                                    alertClass:true,
                                });
                            }
                            this.$indicator.close();
                        }).catch((result) => {
                            this.$indicator.close();
                            this.$messageBox({
                                title: '提示',
                                message:  '保存超时，请稍后重试',
                                showCancelButton:false,
                                showConfirmButton:true,
                                alertClass:true,
                            });
                        })
                        setTimeout(() => {
                            this.$indicator.close();
                        },60000)
                        return;
                    }
                });
            },
            Internship(index) {
                let nowDate = new Date();
                this.$nextTick(() => {
                    this.experience.education.forEach((item) => {
                        if(new Date(item.educationTimeEnd) > nowDate) {
                            item.internship = true;
                        } else {
                            item.internship = false;
                        }
                    })
                })

            },
            validatePop(valid) {
                var temp = [];
                for(var i = 0;i<valid.length;i++) {
                    if(valid[i].filed === "" || valid[i].filed === null) {
                        this.$messageBox({
                            title: '提示',
                            message:  valid[i].msg,
                            showCancelButton:false,
                            showConfirmButton:true,
                            alertClass:true,
                        });
                        return false;
                        break;
                    }
                }
                return true;
            }
        },
        mounted() {
            scrollTo(0,0);
            getDicts('PERSON_EDUCATION_EXP').then((result) => {
                this.edu = result.data;
            });
            // 获取缓存中的数据
            this.$nextTick(() => {
                if(storage.getStorage('userinfo')) {
                    this.userInfo = storage.getStorage('userinfo');
                }
            });
            // 获取缓存中的数据
            this.$nextTick(() => {
                if(storage.getStorage('registration')) {
                    this.registration = storage.getStorage('registration');
                }
            });
            // 获取缓存中的数据
            this.$nextTick(() => {
                if(storage.getStorage('experience')) {
                    this.experience = storage.getStorage('experience');
                }
            });
            // // 获取缓存中的数据
            // this.$nextTick(() => {
            //     if(storage.getStorage('imgArr')) {
            //         this.imgArr = storage.getStorage('imgArr');
            //     }
            // });
            // // 获取缓存中的数据
            // this.$nextTick(() => {
            //     if(storage.getStorage('imgUrl')) {
            //         this.imgUrl = storage.getStorage('imgUrl');
            //     }
            // });
        },
        // watch: {
        //     'imgArr.educationDegreePic0':{
        //         handler:function(val,oldVal){
        //             var edu = this.experience.education[0];
        //             var nowDate = new Date();
        //             if(edu && (new Date(edu.educationTimeEnd) <= nowDate)) {
        //                 this.$nextTick(() => {
        //                     this.$validator.validate('educationDegreePic0')
        //                 })
        //             }
        //         }
        //     },
        //     'imgArr.educationDegreePic1':{
        //         handler:function(val,oldVal){
        //             var edu = this.experience.education[1];
        //             var nowDate = new Date();
        //             if(edu && (new Date(edu.educationTimeEnd) <= nowDate)) {
        //                 this.$nextTick(() => {
        //                     this.$validator.validate('educationDegreePic1')
        //                 })
        //             }
        //         }
        //     }
        // },
        components:{
            zmCell,
            zmTitle,
            zmCheckBox,
            getCode,
            zmCellSwiper,
            // headStep,
            Datetime,
            Group,
            zmUpload,
        }
    }
</script>
