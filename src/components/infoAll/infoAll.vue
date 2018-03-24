<template>
    <div>
        <head-step :titles="['个人信息','入职登记','相关经历']" :currentIndex="currentIndex" @switchTab="switchTab"></head-step>
        <div class="main" v-if="currentIndex === 0">
            <zm-title>个人资料 *</zm-title>
            <div class="table-wrapper">
                <zm-cell :labelName="'姓名'" :class="{'is-danger': veeErrors.has('personName') }">
                    <input type="text" v-model="userInfo.personName" name="personName" v-validate="'required'"/>
                </zm-cell>
                <zm-cell :labelName="'性别'" :class="{'is-danger': veeErrors.has('personSex') }">
                    <zm-check-box :options="[{label:'男',value:1},{label:'女',value:0}]" v-model="userInfo.personSex" name="personSex" v-validate="'required'"></zm-check-box>
                </zm-cell>
                <zm-cell :labelName="'出生日期'" :class="{'is-danger': veeErrors.has('birthday') }">
                    <group class="vux-time">
                        <datetime v-model="userInfo.birthday"
                            :start-date="'1950-01-01'"
                            class="zm-time" name="birthday" v-validate="'required'" format="YYYY-MM-DD"></datetime>
                    </group>
                </zm-cell>

                <zm-cell :labelName="'身份证号'" :class="{'is-danger': veeErrors.has('idNumber') }">
                    <input v-model="userInfo.idNumber" name="idNumber" v-validate="'required'"/>
                </zm-cell>
            </div>

            <div class="table-wrapper">
                <zm-cell :labelName="'民族'" :class="{'is-danger': veeErrors.has('nation') }">
                    <input v-model="userInfo.nation" v-validate="'required'" name="nation" placeholder="例(回族)"/>
                </zm-cell>
                <zm-cell :labelName="'政治面貌'" :class="{'is-danger': veeErrors.has('politicalStatus') }">
                    <div class="input-div">
                        <select v-model="userInfo.politicalStatus" :class="{'zm-select-default':userInfo.politicalStatus === ''}" class="zm-select" name="politicalStatus" v-validate="'required'">
                            <option value="">请选择</option>
                            <option :value="item.itemCode" v-for="(item,index) in politicsStatus" :key="index">{{item.itemName}}</option>
                        </select>
                        <i class="icon-right"></i>
                    </div>
                </zm-cell>
                <zm-cell :labelName="'籍贯'" :class="{'is-danger': veeErrors.has('originPlace') }">
                    <input placeholder="例(湖北武汉)" v-model="userInfo.originPlace" v-validate="'required'" name="originPlace"/>
                </zm-cell>
                <zm-cell :labelName="'户口性质'" :class="{'is-danger': veeErrors.has('houseHoldType') }">
                    <div class="input-div">
                        <select v-model="userInfo.houseHoldType" class="zm-select" :class="{'zm-select-default':userInfo.houseHoldType === ''}" name="houseHoldType" v-validate="'required'">
                            <option value="">请选择</option>
                            <option :value="item.itemCode" v-for="(item,index) in houseHoldType" :key="index">{{item.itemName}}</option>
                        </select>
                        <i class="icon-right"></i>
                    </div>
                </zm-cell>
                <zm-cell :labelName="'户籍地址'" :class="{'is-danger': veeErrors.has('homeAddress') }" class="textarea">
                    <textarea v-model="userInfo.homeAddress" name="homeAddress" v-validate="'required'" placeholder="以户口本信息为准"></textarea>
                    <!--
                    <mt-field type="textarea" v-model="userInfo.homeAddress" name="homeAddress" v-validate="'required'"></mt-field>
                    -->
                </zm-cell>
            </div>

            <div class="table-wrapper">
                <zm-cell :labelName="'手机号'" :class="{'is-danger': veeErrors.has('mobile') }">
                    <input  type="number" :class="{'codepass':codeFlag}" :readonly="codeFlag" v-model="userInfo.mobile" name="mobile" v-validate="'isMobile|required'"/>
                </zm-cell>
                <zm-cell :labelName="'验证码'" :class="{'is-danger': veeErrors.has('code') }">
                    <div class="input-div">
                        <input type="number" @change="blurCode()" :class="{'codepass':codeFlag}" :readonly="codeFlag" class="zm-input" style="padding-right:5px;display:block;" v-model="code" v-validate="'required'" name="code"/>
                        <get-code @click="getCode" ref="code"></get-code>
                    </div>
                </zm-cell>
            </div>

            <mt-button type="default" :plain="true" class="themefillbutton" @click="goNext()">下一步</mt-button>
        </div>
        <div class="main" v-if="currentIndex === 1">
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
            <zm-title>工资卡信息(如没有公司可代办) *</zm-title>
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
            <zm-title v-if="registration.hasBankCard === 0">银行卡照片 *</zm-title>
            <div class="uploader-wrapper" v-if="registration.hasBankCard === 0">
                <zmUpload 
                    :imgUrl="require('common/images/ID card-front.png')" 
                    :keyName="'bankCardPic'"
                    v-model="imgUrl.bankCardPic"
                    :imageUrl.sync="imgUrl.bankCardPic"
                    @file-upload="uploadFile" 
                    :class="{'is-danger': veeErrors.has('bankCardPic') }"
                    :name="'bankCardPic'" v-validate="'required'">点击上传银行卡照片</zmUpload>
                <!--
                <div class="upload">
                    <file-upload
                    post-action="/upload/post"
                    @input-file="inputFile1"
                    @input-filter="inputFilter1"
                    v-model="registration.bankCardPic"
                    :class="{'is-danger': veeErrors.has('bankCardPic') }"
                    :name="'bankCardPic'" v-validate="'required'"
                    accept="image/*"
                    ref="bankCardPic">
                        <div class="imgbox" v-if="!registration.bankCardPic.length">
                            <img src="~common/images/per-photo.png" alt="">
                            <span class="text">点击上传银行卡照片</span>
                        </div>
                        <div class="imgbox"  v-if="registration.bankCardPic.length">
                            <img class="img-delete" src="~common/images/delete.png" @click.stop.prevent="$refs.bankCardPic.clear()" alt="" width="17" height="17">
                            <img :src="file.blob" v-for="(file,index) in registration.bankCardPic" :key="index">
                        </div>
                    </file-upload>
                </div>
                -->
            </div>
            <zm-title>社保信息 *</zm-title>
            <div class="table-wrapper small">
                <zm-cell :labelName="'是否缴纳过社保'" :class="{'is-danger': veeErrors.has('isSocialSecurity') }">
                    <zm-check-box :options="[{label:'是',value:0},{label:'否',value:1}]" v-model="registration.isSocialSecurity" name="isSocialSecurity" v-validate="'required'"></zm-check-box>
                </zm-cell>
                <div v-for="(item, index) in registration.socialSecurityPlace" :key="index" v-if="registration.isSocialSecurity === 0">
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
                <zm-cell align="center"  v-if="registration.isSocialSecurity === 0" >
                    <div class="add-box"  @click="addCity()">
                        <i class="icon-add add"></i>
                        <span class="text">添加</span>
                    </div>
                </zm-cell>
            </div>
            <zm-title>公积金信息 *</zm-title>
            <div class="table-wrapper small">
                <zm-cell :labelName="'是否缴纳过公积金'" :class="{'is-danger': veeErrors.has('isBuyAccumulationFund') }">
                    <zm-check-box :options="[{label:'是',value:0},{label:'否',value:1}]" v-model="registration.isBuyAccumulationFund" name="isBuyAccumulationFund" v-validate="'required'"></zm-check-box>
                </zm-cell>
                <div v-for="(item, index) in registration.accumulationFund" :key="index" class="aFund-wrapper" v-if="registration.isBuyAccumulationFund === 0">
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
                <zm-cell align="center"  v-if="registration.isBuyAccumulationFund === 0">
                    <div class="add-box"  @click="addFund()">
                        <i class="icon-add add"></i>
                        <span class="text">添加</span>
                    </div>
                </zm-cell>
            </div>
            <zm-title>证件资料 *</zm-title>
            <div class="uploader-wrapper">
                <zmUpload 
                    :imgUrl="require('common/images/ID card-front.png')" 
                    :keyName="'centificateFrontPic'"
                    v-model="imgUrl.centificateFrontPic"
                    :imageUrl.sync="imgUrl.centificateFrontPic"
                    @file-upload="uploadFile" 
                    :class="{'is-danger': veeErrors.has('centificateFrontPic') }"
                    :name="'centificateFrontPic'" v-validate="'required'">点击上传身份证正面</zmUpload>
                <zmUpload 
                    :imgUrl="require('common/images/ID card-behind.png')" 
                    :keyName="'centificateBackPic'"
                    v-model="imgUrl.centificateBackPic"
                    :imageUrl.sync="imgUrl.centificateBackPic"
                    @file-upload="uploadFile" 
                    :class="{'is-danger': veeErrors.has('centificateBackPic') }"
                    :name="'centificateBackPic'" v-validate="'required'">点击上传身份证反面</zmUpload>
                <!--
                <div class="upload">
                    <file-upload
                    input-id="file1"
                    post-action="/upload/post"
                    ref="centificateFrontPic"
                    @input-file="inputFile1"
                    @input-filter="inputFilter1"
                    v-model="registration.centificateFrontPic"
                    :class="{'is-danger': veeErrors.has('centificateFrontPic') }"
                    :name="'centificateFrontPic'" v-validate="'required'"
                    accept="image/*">
                        <div class="imgbox" v-if="!registration.centificateFrontPic.length">
                            <img src="~common/images/ID card-front.png" alt="">
                            <span class="text">点击上传身份证正面</span>
                        </div>
                        <div class="imgbox"  v-if="registration.centificateFrontPic.length">
                            <img class="img-delete" src="~common/images/delete.png" @click.stop.prevent="$refs.centificateFrontPic.clear()" alt="" width="17" height="17">
                            <img :src="file.blob" v-for="(file,index) in registration.centificateFrontPic" :key="index">
                        </div>
                    </file-upload>
                </div>
                <div class="upload">
                    <file-upload
                    input-id="file2"
                    post-action="/upload/post"
                    @input-file="inputFile1"
                    @input-filter="inputFilter1"
                    v-model="registration.centificateBackPic"
                    :class="{'is-danger': veeErrors.has('centificateBackPic') }"
                    :name="'centificateBackPic'" v-validate="'required'"
                    accept="image/*"
                    ref="centificateBackPic">
                        <div class="imgbox" v-if="!registration.centificateBackPic.length">
                            <img src="~common/images/ID card-behind.png" alt="">
                            <span class="text">点击上传身份证反面</span>
                        </div>
                        <div class="imgbox"  v-if="registration.centificateBackPic.length">
                            <img src="~common/images/delete.png" class="img-delete" alt="" @click.prevent.stop="$refs.centificateBackPic.clear()" width="17" height="17">
                            <img :src="file.blob"  v-for="(file,index) in registration.centificateBackPic" :key="index">
                        </div>
                    </file-upload>
                </div>
                -->
            </div>
            <zm-title>个人照片 *</zm-title>
            <div class="uploader-wrapper regist">
                <zmUpload 
                    :imgUrl="require('common/images/per-photo.png')" 
                    :keyName="'personalPic'"
                    v-model="imgUrl.personalPic"
                    :imageUrl.sync="imgUrl.personalPic"
                    @file-upload="uploadFile" 
                    :class="{'is-danger': veeErrors.has('personalPic') }"
                    :name="'personalPic'" v-validate="'required'">
                        <div><span>点击上传个人照片</span></div>
                        <div><span>(白色背景上半身正面照)</span></div>
                    </zmUpload>
                <!--
                <div class="upload">
                    <file-upload
                        input-id="file3"
                        post-action="/upload/post"
                        @input-file="inputFile1"
                        @input-filter="inputFilter1"
                        v-model="registration.personalPic"
                        :class="{'is-danger': veeErrors.has('personalPic') }"
                        :name="'personalPic'" v-validate="'required'"
                        accept="image/*"
                        ref="personalPic">
                            <div class="imgbox" v-if="!registration.personalPic.length">
                                <img src="~common/images/per-photo.png" alt="">
                                <span class="text">
                                    <i class="subtext">点击上传个人照片</i>
                                    <i class="subtext">(白色背景上半身正面照)</i>
                                </span>
                            </div>
                            <div class="imgbox"  v-if="registration.personalPic.length">
                                <img src="~common/images/delete.png" class="img-delete" alt="" @click.prevent.stop="$refs.personalPic.clear()" width="17" height="17">
                                <img :src="file.blob" v-for="(file,index) in registration.personalPic" :key="index">
                            </div>
                    </file-upload>
                </div>
                -->
            </div>
            <mt-button type="default" :plain="true" class="themefillbutton" @click="goNext()">下一步</mt-button>
        </div>
        <div class="main" v-if="currentIndex === 2">
            <zm-title>教育信息 *</zm-title>
                <div class="add-box-wrapper">
                    <div v-for="(item,index) in experience.education" :key="index" class="add-box-li">
                        <div class="table-wrapper add-box" :class="{'no-border':(item.education !== '' && registration.personType !== '1'),'has-eduadd':experience.education.length > 1}">
                            <zm-cell-swiper
                                :title="'毕业院校'"
                                :class="{'is-danger': veeErrors.has('university' + index) }"
                                :isiconshow="experience.education.length > 1"
                                @deleteRow="deleteEducation(index)"
                                :right="[
                                    {
                                    content: '删除',
                                    style: { background: '#EF4C4F', color: '#fff'},
                                    handler: () => deleteEducation(index)
                                    }
                                ]">
                                    <input type="text" class="zm-input large" v-model="item.university" placeholder="例'武汉理工大学'" :name="'university' + index" v-validate="'required'">
                            </zm-cell-swiper>
                            <zm-cell :labelName="'起止时间'" :hasIcon="experience.education.length > 1" :class="{'is-danger': veeErrors.has('educationTimeStart' + index) || veeErrors.has('educationTimeEnd' + index)}">
                                <div class="input-div">
                                    <group class="vux-time small">
                                        <datetime 
                                            :start-date="'1950-01-01'"
                                            v-model="item.educationTimeStart"
                                            :name="'educationTimeStart' + index" 
                                            v-validate="'required'"
                                            class="zm-time no-right" format="YYYY-MM"></datetime>
                                    </group>
                                    <span class="word">至</span>
                                    <group class="vux-time small">
                                        <datetime 
                                            :start-date="'1950-01-01'"
                                            v-model="item.educationTimeEnd"
                                            class="zm-time" format="YYYY-MM"
                                            :name="'educationTimeEnd' + index" 
                                            v-validate="'required'"></datetime>
                                    </group>
                                </div>
                            </zm-cell>
                            <zm-cell :labelName="'专业'" :hasIcon="experience.education.length > 1" :class="{'is-danger': veeErrors.has('major' + index) }">
                                <input class="zm-input" v-model="item.major" placeholder="例'机械自动化" :name="'major' + index" v-validate="'required'">
                            </zm-cell>
                            <zm-cell :labelName="'学历'" :hasIcon="experience.education.length > 1" :class="{'is-danger': veeErrors.has('education' + index),'no-border':(item.education !== '' && registration.personType !== '1')}">
                                <div class="input-div">
                                    <select v-model="item.education" class="zm-select" :name="'education' + index" v-validate="'required'" :class="{'zm-select-default':item.education === ''}">
                                        <option value="">请选择</option>
                                        <option :value="item.itemCode" v-for="(item, index) in edu" :key="index">{{item.itemName}}</option>
                                    </select>
                                    <i class="icon-right"></i>
                                </div>
                            </zm-cell>
                        </div>
                        <zm-title v-if='item.education !== "" && registration.personType !== "1"'>证件资料</zm-title>
                        <div class="uploader-wrapper" style="margin-bottom:7px;" v-if='item.education !== "" && registration.personType !== "1"'>
                            <zmUpload 
                                :imgUrl="require('common/images/diploma.png')" 
                                :keyName="'educationDegreePic' + index"
                                :imgText="'点击上传毕业证图片'" 
                                v-model="imgUrl[`educationDegreePic${index}`]"
                                :imageUrl.sync="imgUrl[`educationDegreePic${index}`]"
                                @file-upload="uploadFile" 
                                :class="{'is-danger': veeErrors.has('educationDegreePic' + index) }"
                                :name="'educationDegreePic' + index" v-validate="'required'"></zmUpload>
                            <zmUpload 
                                :imgUrl="require('common/images/award.png')" 
                                :keyName="'graduationCertificatePic' + index"
                                :imgText="'点击上传学位证图片'" 
                                :imageUrl.sync="imgUrl[`graduationCertificatePic${index}`]"
                                v-model="imgUrl[`graduationCertificatePic${index}`]"
                                @file-upload="uploadFile" ></zmUpload>
                            <!--
                            <div class="upload">
                                <file-upload
                                input-id="file1"
                                :ref="'diploma' + index"
                                post-action="/upload/post"
                                @input-file="inputFile1"
                                @input-filter="inputFilter1"
                                v-model="item.diploma"
                                :class="{'is-danger': veeErrors.has('educationDegreePic' + index) }"
                                :name="'educationDegreePic' + index" v-validate="'required'"
                                accept="image/*">
                                    <div class="imgbox" v-if="!item.diploma.length">
                                        <img src="~common/images/diploma.png" alt="">
                                        <span class="text">点击上传毕业证图片</span>
                                    </div>
                                    <div class="imgbox"  v-if="item.diploma.length">
                                        <img class="img-delete" src="~common/images/delete.png" @click.stop.prevent="deleteImg(index, 'diploma')" alt="" width="17" height="17">
                                        <img :src="file.blob" v-for="(file,index) in item.diploma" :key="index">
                                    </div>
                                </file-upload>
                            </div>
                            <div class="upload">
                                <file-upload
                                input-id="file2"
                                post-action="/upload/post"
                                :ref="'award' + index"
                                @input-file="inputFile1"
                                @input-filter="inputFilter1"
                                v-model="item.degreeCertificate"
                                :name="'graduationCertificatePic' + index"
                                accept="image/*">
                                    <div class="imgbox" v-if="!item.degreeCertificate.length">
                                        <img src="~common/images/award.png" alt="">
                                        <span class="text">点击上传学位证图片</span>
                                    </div>
                                    <div class="imgbox"  v-if="item.degreeCertificate.length">
                                        <img class="img-delete" src="~common/images/delete.png" @click.stop.prevent="deleteImg(index, 'award')" alt="" width="17" height="17">
                                        <img :src="file.blob"  v-for="(file,index) in item.degreeCertificate" :key="index">
                                    </div>
                                </file-upload>
                            </div>
                            -->
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
            <zm-title>工作经历 (选填)</zm-title>
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
                                style: { background: '#EF4C4F', color: '#fff'},
                                handler: () => deletework(index)
                                }
                            ]">
                                <input type="text" class="zm-input large" v-model="item.companyName">
                        </zm-cell-swiper>
                        <zm-cell :labelName="'起止时间'" :star="false" :hasIcon="experience.work.length > 1">
                            <div class="input-div">
                                <group class="vux-time small">
                                    <datetime 
                                        :start-date="'1950-01-01'"
                                        v-model="item.workTimeStart"
                                        class="zm-time no-right" format="YYYY-MM"></datetime>
                                </group>
                                <span class="word">至</span>
                                <group class="vux-time small">
                                    <datetime 
                                        :start-date="'1950-01-01'"
                                        v-model="item.workTimeEnd"
                                        class="zm-time" format="YYYY-MM"></datetime>
                                </group>
                            </div>
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
    import zmCell from "base/zmCell/zmCell.vue";
    import zmTitle from "base/title/zmTitle.vue";
    import zmCheckBox from "base/zmCheckBox/zmCheckBox.vue";
    import zmField from "base/zmField/index.js";
    // import fileUpload from 'base/upload/index.js';
    import zmUpload from 'base/zmUpload/zmUpload.vue';
    import getCode from "base/getCode/getCode.vue";
    import headStep from "base/headstep/headstep.vue";
    import zmCellSwiper from 'base/zmCellSwiper/index.js';
    import toBlob from 'blueimp-canvas-to-blob';

    // import dateTool from "common/js/datetool.js";
    // import ImageCompressor from "common/js/image-compressor/src/index.js";
    import {sysVersion} from "common/js/utils.js";

    import { Datetime,Group } from 'vux'

    import { getDicts,saveInfo,GetCodes,CheckCode,CheckEmp,getOrgs,SaveImg } from "api/common/dicts.js";
    import { getData } from "common/js/dom.js";
    const toastTime = '4000';
    // var canvasCompress = new ImageCompressor();
    export default {
        name:'infoAll',
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
                    homeAddress: ""
                },
                registration:{
                    orgId:"",
                    personType:"",
                    workCity:"",
                    marriageBearStatus:"",
                    hasBankCard:null,
                    bankSubbranch:"",
                    bankNumber:"",
                    bankCardPic:[],
                    isSocialSecurity:null,
                    socialSecurityPlace:[],
                    isBuyAccumulationFund:null,
                    accumulationFund:[],
                    centificateFrontPic:[],
                    centificateBackPic:[],
                    personalPic:[]
                },
                experience:{
                    education:[
                        {
                            university:"",
                            major:"",
                            educationTimeStart:"2000-01",
                            educationTimeEnd:`${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
                            education:"",
                            diploma:[],
                            degreeCertificate:[],
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
                imgName:{
                    'bankCardPic':'银行卡',
                    'personalPic':'个人照片',
                    'centificateFrontPic':'身份证',
                    'centificateBackPic':'身份证',
                    'educationDegreePic0':'毕业证',
                    'educationDegreePic1':'毕业证',
                    'graduationCertificatePic0':'学位证',
                    'graduationCertificatePic1':'学位证',
                },
                educationTimeStart0:'',
                educationTimeEnd0:'',
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
                test:""
            };
        },
        computed:{
            imgUrl:function() {
                let result = {};
                for(var key in this.imgArr) {
                    if(this.imgArr[key]) {
                        result[key] = `http://oqhy085bt.bkt.clouddn.com/${this.imgArr[key]}?imageView2/0/w/173/h/109`;
                    }
                }
                return result;
            }
        },
        created() {
            // 户口性质
            getDicts('HOUSEHOLD_TYPE').then((result) => {
                this.houseHoldType = result.data;
            })
            getOrgs().then(result => {
                if (result.code === '1') {
                    this.orgs = result.data.map((item) => {
                        return {'orgName':item.orgName,'orgId':item.orgId}
                    })
                } else {
                    this.$toast({
                        message: result.message,
                        position: 'center',
                        duration: toastTime
                    });
                }
            });
            // 政治面貌
            getDicts('POLITICS_STATUS').then((result) => {
                this.politicsStatus = result.data;
                //工作地点
                getDicts('WORK_PLACE').then((result) => {
                    if (result.code === '1') {
                        this.workCity = result.data;
                    } else {
                        this.$toast({
                            message: result.message,
                            position: 'center',
                            duration: toastTime
                        });
                    }
                    //学历
                    getDicts('PERSON_EDUCATION_EXP').then((result) => {
                        this.edu = result.data;
                        // 用工形式
                        getDicts('PERSON_TYPE').then((result) => {
                            this.personType = result.data;
                            // 婚育状况
                            getDicts('MARRIAGE_BEAR_STATUS').then((result) => {
                                this.marriageBearStatus = result.data;
                            })
                        });
                    });
                });
            })
        },
        mounted() {
        },
        methods: {
            uploadFile(files,keyName,fileName) {
                let that = this;
                that.$indicator.open({text: '图片上传中'});
                function saveImgFun(result,names) {
                    let formData = new FormData();
                    formData.append('uploadFile',result);
                    formData.append('attachmentType',that.imgName[names]);

                    SaveImg(formData).then((result) => {
                        if(result.data.code === '1') {
                            that.imgArr[names] = result.data.data.key;
                            that.$indicator.close();
                            that.$toast({message: '上传成功',position: 'center',duration: 1500});
                        } else {
                            that.$messageBox({
                                title: '提示',
                                message:  result.data.message,
                                showCancelButton: '确定'
                            });
                        }
                    }).catch((result) => {
                        that.$indicator.close();
                        that.$messageBox({
                            title: '提示',
                            message:  '上传失败,请重新上传',
                            showCancelButton: '确定'
                        });
                    })
                    setTimeout(() => {
                        that.$indicator.close();
                    },60000)
                }
                // 如果ios8 不压缩处理
                if (sysVersion()) {
                    saveImgFun(files[0],keyName);
                } else {
                    canvasResize(files[0], {
                        width: 700,
                        height: 0,
                        crop: false,
                        quality: 80,
                        callback: function(data, width, height) {
                            const date = new Date();
                            let result = toBlob(data);
                            result.lastModified = date.getTime();
                            result.lastModifiedDate = date;
                            result.name = fileName;
                            saveImgFun(result,keyName);
                        }
                    });
                }


                // this.$indicator.open({text: '图片上传中'});
                // canvasCompress.compress(files[0],{
                //     convertSize: Infinity,
                //     quality:this.quality,
                //     width:800
                // }).then((result) => {
                //         console.log(result)
                //         let formData = new FormData();
                //         formData.append('uploadFile',result);
                //         formData.append('attachmentType',this.imgName[keyName]);

                //         SaveImg(formData).then((result) => {
                //             if(result.data.code === '1') {
                //                 this.imgArr[keyName] = result.data.data.key;
                //                 this.imgUrl[keyName] = result.data.data.fileUrl + "?imageView2/2/w/173/h/110";
                //                 this.$indicator.close();
                //                 this.$toast({message: '上传成功',position: 'center',duration: 1500});
                //             } else {
                //                 this.$messageBox({
                //                     title: '提示',
                //                     message:  result.data.message,
                //                     showCancelButton: '确定'
                //                 });
                //             }
                //         }).catch((result) => {
                //             this.$indicator.close();
                //             this.$messageBox({
                //                 title: '提示',
                //                 message:  '上传失败,请重新上传',
                //                 showCancelButton: '确定'
                //             });
                //         })
                //         setTimeout(() => {
                //             this.$indicator.close();
                //         },60000)
                //     })
            },
            switchTab(index) {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        if (this.currentIndex === 0 ){
                            if (!this.codeFlag) {
                                return;
                            }
                            CheckEmp({personName:this.userInfo.personName, idNumber:this.userInfo.idNumber}).then((result) => {
                                if(result.code === '1') {
                                    this.currentIndex = index;
                                } else {
                                    return;
                                }
                            })             
                        } else {
                            this.currentIndex = index;
                        }
                        return;
                    }
                })
            },
            removeValidate() {
                this.veeErrors.remove('educationTimeStart0');
                this.veeErrors.remove('educationTimeEnd0');
                this.veeErrors.remove('educationTimeStart1');
                this.veeErrors.remove('educationTimeEnd1');
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
            addEducation() {
                this.experience.education.push({
                    university:"",
                    major:"",
                    educationTimeStart:"2000-01",
                    educationTimeEnd:`${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
                    education:"",
                    diploma:[],
                    degreeCertificate:[],
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
                if(this.experience.education.length > 1) {
                    this.experience.education.splice(index,1)
                } else {
                    this.$toast({message: '至少需要一条教育经历',position: 'center',duration: toastTime});
                }
            },
            deletework(index) {
                this.experience.work.splice(index,1)
            },
            // inputFile1: function (newFile, oldFile) {
            //     // if (newFile && oldFile && !newFile.active && oldFile.active) {
            //     //     // 获得相应数据
            //     //     console.log('response', newFile.response)
            //     //     if (newFile.xhr) {
            //     //     //  获得响应状态码
            //     //         console.log('status', newFile.xhr.status)
            //     //     }
            //     // }
            //     var that = this;
            //     if (newFile && !oldFile) {
            //         var file = newFile.file;
            //         var reader = new FileReader();
            //         reader.onload = ({target}) => {
            //             var { result } = target;
            //             var image = new Image();
            //             image.src = result;
            //             image.onload = (data) => {
            //                 var canvas = document.createElement('canvas');
            //                 var context = canvas.getContext('2d');
            //                 var width = image.naturalWidth/3;
            //                 var height = image.naturalHeight/3;

            //                 canvas.width = width;
            //                 canvas.height = height;

            //                 context.fillStyle = 'transparent';
            //                 context.fillRect(0, 0, width, height);
            //                 context.save();
            //                 context.translate(width/2, height/2);
            //                 context.drawImage(
            //                     image,
            //                     Math.floor(-width/2),
            //                     Math.floor(-height/2),
            //                     Math.floor(width),
            //                     Math.floor(height)
            //                 );
            //                 context.restore();

            //                 this.$indicator.open({text: '图片上传中'});
            //                 canvas.toBlob(function(result) {
            //                     var date = new Date();
            //                     var elName = getData(newFile.el,'name');

            //                     result.lastModified = date.getTime();
            //                     result.lastModifiedDate = date;
            //                     result.name = newFile.name;

            //                     let formData = new FormData();
            //                     formData.append('uploadFile',result);
            //                     formData.append('attachmentType',that.imgName[elName]);

            //                     SaveImg(formData).then((result) => {
            //                         if(result.data.code === '1') {
            //                             that.imgArr[elName] = result.data.data.key;
            //                             that.$indicator.close();
            //                             that.$toast({message: '上传成功',position: 'center',duration: 1500});
            //                         } else {
            //                             that.$messageBox({
            //                                 title: '提示',
            //                                 message:  result.data.message,
            //                                 showCancelButton: '确定'
            //                             });
            //                         }
            //                         image = null;
            //                         canvas = null;
            //                         reader = null;
            //                     }).catch((result) => {
            //                         that.$indicator.close();
            //                         that.$messageBox({
            //                             title: '提示',
            //                             message:  '上传失败,请重新上传',
            //                             showCancelButton: '确定'
            //                         });
            //                         image = null;
            //                         canvas = null;
            //                         reader = null;
            //                     })
            //                     setTimeout(() => {
            //                         that.$indicator.close();
            //                     },60000)
            //                 },"image/jpeg",0.6)
            //             }
            //         }
            //         reader.readAsDataURL(file)
            //         // let elName = getData(newFile.el,'name');
            //         // // 自动压缩
            //         // if (newFile.file && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0) {
            //         //     newFile.error = 'compressing'

            //         //     this.$indicator.open({text: '图片上传中'});
            //         //     imageCompressor.compress(newFile.file,{
            //         //         convertSize: Infinity,
            //         //         quality:this.quality
            //         //     })
            //         //         .then((file) => {
            //         //             let formData = new FormData();
            //         //             formData.append('uploadFile',file);
            //         //             formData.append('attachmentType',this.imgName[elName]);

            //         //             SaveImg(formData).then((result) => {
            //         //                 if(result.data.code === '1') {
            //         //                     this.imgArr[elName] = result.data.data.key;
            //         //                     this.$indicator.close();
            //         //                     this.$toast({message: '上传成功',position: 'center',duration: 1500});
            //         //                 } else {
            //         //                     this.$messageBox({
            //         //                         title: '提示',
            //         //                         message:  result.data.message,
            //         //                         showCancelButton: '确定'
            //         //                     });
            //         //                 }
            //         //             }).catch((result) => {
            //         //                 this.$indicator.close();
            //         //                 this.$messageBox({
            //         //                     title: '提示',
            //         //                     message:  '上传失败,请重新上传',
            //         //                     showCancelButton: '确定'
            //         //                 });
            //         //             })
            //         //             setTimeout(() => {
            //         //                 this.$indicator.close();
            //         //             },60000)
            //         //             // api
            //         //             // this.$refs.bankCardPic.update(newFile, { error: '', file, size: file.size, type: file.type })
            //         //         })
            //         //         .catch((err) => {
            //         //             console.log(err);
            //         //         })
            //         // }
            //     }
            // },
            // inputFilter1: function (newFile, oldFile, prevent) {
            //     if (newFile && !oldFile) {
            //         // Filter non-image file
            //         if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
            //             return prevent()
            //         }
            //     }

            //     // Create a blob field
            //     newFile.blob = ''
            //     let URL = window.URL || window.webkitURL
            //     if (URL && URL.createObjectURL) {
            //         newFile.blob = URL.createObjectURL(newFile.file)
            //     }
            // },
            getCode(val) {
                if(this.codeFlag) return;
                this.$validator.validate('mobile').then(result => {
                    if (result) {
                        if (val) {
                            this.$refs.code.countdown();
                            GetCodes(this.userInfo.mobile).then((result) => {
                            })
                        }
                        return;
                    }
                    this.$toast({
                        message: '手机号码有误',
                        position: 'center',
                        duration: toastTime
                    });
                });
            },
            blurCode() {
                this.$validator.validate('mobile').then(result => {
                    if (result) {
                        if(!this.code) return;
                        CheckCode({mobile:this.userInfo.mobile,code:this.code}).then((result) => {
                            if (result.code === '1') {
                                this.codeFlag = true;
                                // this.$toast({
                                //     message: '验证码验证成功',
                                //     position: 'center',
                                //     duration: toastTime
                                // });
                            } else {
                                this.$toast({message: result.message,position: 'center',duration: toastTime});
                                this.codeFlag = false;
                            }
                        })
                        return false;
                    }
                });
            },
            goNext() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        if (this.currentIndex === 0) {
                            // if (!this.codeFlag && this.code) {
                            //     // this.$toast({message: '验证短信验证码失败',position: 'center',duration: toastTime});
                            //     this.currentIndex = 1;
                            //     return;
                            // }
                            CheckCode({mobile:this.userInfo.mobile,code:this.code}).then((result) => {
                                if (result.code === '1') {
                                    CheckEmp({personName:this.userInfo.personName, idNumber:this.userInfo.idNumber}).then((result) => {
                                        if(result.code === '1') {
                                            this.currentIndex = 1;
                                        } else {
                                            this.$messageBox({
                                                title: '提示',
                                                message:  result.message,
                                                showCancelButton: '确定'
                                            });
                                        }
                                    })
                                } else {
                                    this.$toast({message: result.message,position: 'center',duration: toastTime});
                                    this.codeFlag = false;
                                }
                            })

                        } else if (this.currentIndex === 1) {
                            this.currentIndex = 2;
                        } else if (this.currentIndex === 2) {
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
                                    this.$toast({message: '教育信息的起止时间顺序有误',position: 'center',duration: toastTime});
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
                                        this.$toast({message: '工作经验的起止时间顺序有误',position: 'center',duration: toastTime});
                                        return;
                                    }
                                }
                            }

                            var formData = new window.FormData();
                            // 个人信息
                            let userInfo = this.userInfo;
                            for(var key in userInfo) {
                                if (userInfo[key] !== "") {
                                    formData.append(key,userInfo[key]);
                                }
                            }
                            // 入职登记
                            let registration = this.registration;
                            for(var key in registration) {
                                // if((key === 'centificateFrontPic' || key === 'centificateBackPic' || key === 'personalPic' || key === 'bankCardPic') && registration[key][0]) {
                                //     formData.append(key,registration[key][0].file,registration[key][0].name);
                                // } else 
                                if((key === 'bankSubbranch' || key === 'bankNumber') && registration.hasBankCard === 0) {
                                    formData.append(key,registration[key]);
                                } else if(key === 'socialSecurityPlace' && registration.isSocialSecurity === 0){
                                    formData.append(key,registration[key]);
                                } else if (key === 'accumulationFund' && registration.isBuyAccumulationFund === 0) {
                                    formData.append(key,JSON.stringify(registration[key]));
                                } else if ((key === 'orgId'|| key === 'personType'|| key === 'workCity'|| key === 'marriageBearStatus') && registration[key] !== "") {
                                    formData.append(key,registration[key]);
                                }
                            }
                            // 相关经历
                            let experience = this.experience;
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

                            for(let key in this.imgArr) {
                                formData.append(key,this.imgArr[key])
                            }

                            this.$indicator.open({text: '数据较多,请耐心等待'});
                            saveInfo(formData).then((result) => {
                                if (result.data.code === '1') {
                                    this.$router.push({path:'/result'});
                                } else {
                                    this.$messageBox({
                                        title: '提示',
                                        message:  result.data.message,
                                        showCancelButton: '确定'
                                    });
                                }
                                this.$indicator.close();
                            }).catch((result) => {
                                this.$indicator.close();
                                // this.$toast({message: `服务器访问异常(${result})`,position: 'center',duration: 5000});
                                this.$toast({message: `保存超时，请稍后重试`,position: 'center',duration: 5000});
                            })
                            setTimeout(() => {
                                this.$indicator.close();
                            },60000)
                        }
                        return;
                    }
                    console.log("Correct them veeErrors!");
                });
            },
            deleteImg(index, type){
                this.$refs[`${type}${index}`][0].clear()
            }
        },
        watch:{
            currentIndex() {
                scrollTo(0,0)
            },
            experience(newval,old){
                console.log('newval',newval)
            }
        },
        components: {
            zmCell,
            zmTitle,
            zmCheckBox,
            getCode,
            zmField,
            headStep,
            // fileUpload,
            zmCellSwiper,
            Datetime,
            Group,
            zmUpload,
        }
    };
</script>

<style lang="scss" scoped>
  @import "~common/scss/util.scss";
  @import "~common/scss/via.scss";
  .main {
    background: $color-background;
    @include px2rem("padding-left",10px,37.5px);
    @include px2rem("padding-right",10px,37.5px);
    @include px2rem("padding-top",10px,37.5px);
    .zm-select-default{
        color:#cccccc;
        option{
            color:$color-text;
        }
    }
    .table-wrapper {
      padding: 0 30px 0 20px;
      margin-bottom: 20px;
      background: white;
      border-radius: 8px 8px 0 0;
      border-bottom: 5px solid #eeeeee;
      .codepass{
        color: #333333;
      }
      &.small{
          margin-bottom:10px;
      }
      &.addwork{
          @include px2rem('margin-bottom',20px,37.5px);
      }
      &.experience{
          @include px2rem('margin-bottom',10px,37.5px);
      }
      &.add-box{
          margin-top:10px;
          &:last-child{
            margin-bottom:0;
          }
          .zmCell{
              &:last-child{
                // border-bottom:1px solid #eeeeee;
              }
          }
      }

      .input-div {
        flex:auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #cccccc;
        padding-right: 10px;
        position: relative;
        select{
            width:100%;
            height:100%;
        }
        .text {
          overflow: hidden;
          min-height: 20px;
          color: $color-text;
          @include px2rem("font-size",15px,37.5px);
          text-align: right;
        }
        .birth-text {
          width: 60px;
        }
        .icon-right {
          position: absolute;
          right: -7px;
          bottom: center;
          font-size:20px;
          font-weight:bold;
        }
        .time{
            @include px2rem('width',70px,37.5px);
            height: 100%;
            color:$color-text;
            text-align: center;
            @include px2rem('font-size',15px,37.5px);
        }
        .word{
            display:inline-block;
            color:$color-text-ll;
            font-size:15px;
            @include px2rem('margin-left',7px,37.5px);
            @include px2rem('margin-right',7px,37.5px);
        }
      }
      .add-box{
          width:100%;
          text-align:center;
          font-size: 15px;
          color: $color-theme;
          display:flex;
          align-items:center;
          justify-content:center;
          .add{
              margin-right:7px;
              @include px2rem('font-size',12px,37.5px);
              position:relative;
              top:1px;
          }
          .text{
              color: $color-theme;
          }
      }
    }
    .add-box-wrapper{
        .add-box-li{
            .add-box{
                &.no-border{
                    border-bottom:none!important;
                }
                .no-border{
                    border:none!important;
                }
            }
            &:last-child{
                .add-box{
                    border:none;
                    &.has-add{
                        border-bottom:5px solid #eeeeee;
                    }
                    &.has-eduadd{
                        border-bottom:5px solid #eeeeee;
                        .zmCell{
                            &:last-child{
                                border:none;
                            }
                        }
                    }
                    .zmCell{
                        border-bottom:1px solid #eeeeee;
                    }
                }
            }
        }
    }
    .uploader-wrapper{
        display: flex;
        justify-content:space-between;
        &.regist{
            @include px2rem('margin-bottom',20px,37.5px);
        }
        .upload{
            .is-danger{
                border-bottom:1px solid $color-theme;
            }
        }
    }
  }
  .mask{
      position:fixed;
      top:0;
      width:100%;
      height:100%;
      background:white;
  }
</style>