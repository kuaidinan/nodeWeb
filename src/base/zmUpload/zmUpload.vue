<template>
    <div class="upload">
        <img v-bind:src="imgUrl" class="defaultimg"/>
        <!--
        <div class='text' v-show="!error && !uploading">
        -->
        <div class='text'>
            <slot></slot>
        </div>
        <img :src="imageUrl" v-if="imageUrl" class="currentimg"/>
        <div class="mask-wrapper" v-if="false">
            <div class="progress-wrapper">
                <div class="upload-text">上传中...</div>
                <div class="progress">
                    <span class="red" ref="progress"></span>
                </div>
            </div>
        </div>
        <div class="mask-wrapper error-handle" v-if="false">
            <div class="error-wrapper">
                <div class="error-text">上传失败</div>
                <div class="btn">
                    <zm-button @click="cancel()" btnclass='white' class="btn-cancel">取消</zm-button>
                    <zm-button @click="reUpload()" btnclass='rewhite' class="btn-confirm">重试</zm-button>
                </div>
            </div>
        </div>
        <input type="file" @change="onFileChange" id="imginput" accept="image/*" v-if="!imageUrl">
        <img src="~common/images/delete.png" class="img-delete" alt="" @click.prevent.stop="removeImage()" v-if="imageUrl" width="17" height="17">
    </div>
</template>
<script>
    import axios from 'axios';
    import {sysVersion} from "common/js/utils.js";
    import toBlob from 'blueimp-canvas-to-blob';
    import zmButton from 'base/zmbutton/index.vue';
    function noop() {}
    export default {
        data() {
            return {
                // image:'',
                currentFile:this.value,
                loadPercent:'',
                uploading:false,
                error:false
                // value: []
            }
        },
        props:{
            imgUrl:{
                type:String
            },
            value:{},
            filelist:{
                type:Array,
                default() {
                    return [];
                }
            },
            keyName:{
                type:String
            },
            imageKey:{
                type:String|Object
            },
            imageUrl:{
                type:String|Object
            },
            imgText:{
                type:String
            },
            fileName:{
                type:String
            },
            beforeUpload:{
                type:Function,
                default:noop
            },
            onProgress: {
                type:Function,
                default:noop
            },
            onSuccess: {
                type:Function,
                default:noop
            },
            onError: {
                type:Function,
                default:noop
            },
        },
        methods: {
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.filelist.push(files[0])
                // this.$emit('file-upload',files,this.keyName,files[0].name);
                // this.error = true;
                this.uploadFile(files[0]);
                // this.createImage(files[0]);
            },
            uploadFile(files) {
                if(!this.beforeUpload){
                    return this.post(files);
                }
                const before = this.beforeUpload(files);
                if(before && before.then) {
                    before.then(() => {
                        this.post(files);
                    })
                } else if (before !== false) {
                    this.post(files);
                }
            },
            reUpload(){
                this.error = false;
                this.uploadFile(this.filelist[0]);
            },
            cancel(){
                this.error = false;
                this.$emit('update:imageUrl',"");
                this.$emit('update:imageKey',"");
                this.filelist.splice(0,1);
            },
            post(files) {
                let that = this;
                function saveImgFun(result) {
                    let formData = new FormData();
                    formData.append('uploadFile',result);
                    formData.append('attachmentType',that.fileName);
                    formData.append('fileName',result.name);
                    that.APi_SaveImg(formData);
                }
                // 如果ios8 手机太老 不做压缩处理
                var width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth
                if (sysVersion() || width <= 320) {
                    saveImgFun(files);
                } else {
                    canvasResize(files, {
                        width: 700,
                        height: 0,
                        crop: false,
                        quality: 80,
                        callback: function(data, width, height) {
                            const date = new Date();
                            let result = toBlob(data);
                            result.lastModified = date.getTime();
                            result.lastModifiedDate = date;
                            result.name = files.name;
                            saveImgFun(result);
                        }
                    });
                }
            },
            createImage(file) {
                this.imageUrl = "";
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            removeImage (e) {
                this.$messageBox({
                    title: '',
                    message: '确定要删除已上传的图片吗?',
                    showConfirmButton:true,
                    showCancelButton:true,
                    alertClass:false,
                    type:'confirm'
                }).then((result) => {
                    if(result === 'confirm') {
                        this.$emit('update:imageUrl',"");
                        this.$emit('update:imageKey',"");
                        this.filelist.splice(0,1);
                        this.$toast({message: '删除成功',position: 'center',duration: 2000});
                    }
                });
            },
            APi_SaveImg(option) {
                var that = this;
                this.uploading = true;
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    // onUploadProgress: function (progressEvent) {
                    //     if(progressEvent.lengthComputable){
                    //         that.loadPercent = progressEvent.loaded/progressEvent.total;
                    //         that.onProgress(progressEvent);
                    //     }
                    // },
                }
                axios.post('/mobile/emp/upload-file',option,config).then((result) => {
                    this.$emit('update:imageKey',result.data.data.key);
                    this.$emit('update:imageUrl',result.data.data.viewUrl);
                    var option = {};
                    option.result = result;
                    option.keyName = this.keyName;
                    this.onSuccess(option);
                    this.uploading = false;
                }).catch((error) => {
                    this.onError(error);
                    this.uploading = false;
                    this.error = true;
                })
            }
        },
        watch:{
            value(files) {
                // console.log(files);
            },
            loadPercent(val){
                let per = parseInt((val * 100)) - 100;
                this.$refs.progress.style.left = `${per}%`;
            }
        },
        components:{
            zmButton
        }
    }
</script>

<style lang="scss" scoped>
    @import '~common/scss/util.scss';
    @import '~common/scss/via.scss';
    .upload{
        z-index:0;
        @include px2rem('width',173px,37.5px);
        @include px2rem('height',110px,37.5px);
        position:relative;
        box-sizing:border-box;
        overflow:hidden;
        &.is-danger{
            .defaultimg{
                @include px2rem('border-radius',11px,37.5px);
                border:1px solid $color-theme;
            }
        }
        img{
            width: 100%;
            height: 100%;
            background-size:cover;
            @include px2rem('border-radius',8px,37.5px);
        }
        .defaultimg{
            z-index:2;
            position:absolute;
            @include px2rem('width',173px,37.5px);
            @include px2rem('height',108px,37.5px);
        }
        .text{
            z-index:3;
            width:100%;
            text-align:center;
            display:inline-block;
            top:50%;
            transform:translate(0,-50%);
            position: absolute;
            @include px2rem('font-size',15px,37.5px);
            color: #999999;
        }
        .currentimg{
            z-index:3;
            position:absolute;
            @include px2rem('width',173px,37.5px);
            @include px2rem('height',108px,37.5px);
        }
        .mask-wrapper{
            display:flex;
            width:100%;
            height:100%;
            align-items:center;
            justify-content:center;
            position:absolute;
            z-index:6;
            background: rgba(0,0,0,0.6);
            top:0;
            left:0;
            @include px2rem('border-radius',10px,37.5px);
            .progress-wrapper{
                width:100%;
                height:100%;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:flex-start;
                @include px2rem('padding-top',33px,37.5px);
                .upload-text{
                    @include px2rem('font-size',15px,37.5px);
                    @include px2rem('margin-bottom',11px,37.5px);
                    color: #FFFFFF;
                }
                .progress{
                    width:102px;
                    height:6px;
                    border-radius:3px;
                    background:white;
                    position:relative;
                    overflow:hidden;
                    .red{
                        transition:all 0.5s;
                        position:absolute;
                        width:100%;
                        height:100%;
                        border-radius:3px;
                        top:0;
                        left:-100%;
                        // transform:translate(-100%,0);
                        background:$color-theme;
                    }
                }
            }
            &.error-handle{
                .error-wrapper{
                    width:100%;
                    height:100%;
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    @include px2rem('padding-top',33px,37.5px);
                    @include px2rem('padding-left',18px,37.5px);
                    @include px2rem('padding-right',18px,37.5px);
                    .error-text{
                        @include px2rem('font-size',15px,37.5px);
                        @include px2rem('margin-bottom',11px,37.5px);
                        color: #FFFFFF;
                    }
                    .btn{
                        width:100%;
                        display:flex;
                        color:white;
                        .btn-cancel{
                            @include px2rem('margin-right',5px,37.5px);
                        }
                        .btn-confirm{
                            @include px2rem('margin-left',5px,37.5px);
                        }
                    }
                }
            }
        }
        #imginput{
            z-index:5;
            position:absolute;
            @include px2rem('width',173px,37.5px);
            @include px2rem('height',108px,37.5px);
            background:transparent;
            opacity: 0;
        }
        .img-delete{
            position: absolute;
            @include px2rem('width',20px,37.5px);
            @include px2rem('height',20px,37.5px);
            margin: 6px;
            right: -7px;
            top:-6px;
            z-index:20;
        }
    }
</style>