import toBlob from 'blueimp-canvas-to-blob';
// 图片压缩v1
export function canvasCompress(file, keyname) {
    return new Promise((resolve,reject) => {
        var reader = new FileReader();
        reader.onload = ({target}) => {
            var { result } = target;
            var image = new Image();
            image.src = result;
            image.onload = (data) => {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                var width,height;
                if(image.naturalWidth>1500) {
                    width = image.naturalWidth/2;
                    height = image.naturalHeight/2;
                } else if (image.naturalWidth>3000) {
                    width = image.naturalWidth/3;
                    height = image.naturalHeight/3;
                } else {
                    width = image.naturalWidth;
                    height = image.naturalHeight;
                }

                canvas.width = width;
                canvas.height = height;

                context.fillStyle = 'transparent';
                context.fillRect(0, 0, width, height);
                context.save();
                context.translate(width/2, height/2);
                context.drawImage(
                    image,
                    Math.floor(-width/2),
                    Math.floor(-height/2),
                    Math.floor(width),
                    Math.floor(height)
                );
                context.restore();

                if (false) {
                    canvas.toBlob(function(result) {
                        var date = new Date();
                        result.lastModified = date.getTime();
                        result.lastModifiedDate = date;
                        result.name = file.name;
    
                        resolve(result);
                        image = null;
                        canvas = null;
                        reader = null;
                    },"image/jpeg",0.6)
                } else {
                    var result = toBlob(canvas.toDataURL("image/jpeg", 0.6));
                    var date = new Date();
                    result.lastModified = date.getTime();
                    result.lastModifiedDate = date;
                    result.name = file.name;

                    resolve(result);
                    console.log(result);
                    image = null;
                    canvas = null;
                    reader = null;
                }


                // resolve(canvas.toDataURL("image/jpeg", 0.6));
            }
        }
        reader.onabort = reject;
        reader.onerror = reject;
        reader.readAsDataURL(file)
    })
}

// 图片压缩v1.1
const DEFAULTS = {
    mimeType:'image/jpeg',
    quality:'0.6'
}
export default class ImageCompressor {
    /**
     * The constructor of ImageCompressor.
     * @param {File|Blob} file - The target image file for compressing.
     * @param {Object} [options] - The options for compressing.
     */
    constructor(file, options) {
        this.result = null;
        
        if(file) {
            this.compress(file, options);
        }
    }
    /**
     * The main compress method.
     * @param {File|Blob} file - The target image file for compressing.
     * @param {Object} [options] - The options for compressing.
     * @returns {Promise} - A Promise instance.
     */
    compress(file, options) {
        options = {
            ...DEFAULTS,
            ...options,
        };
        return new Promise((resolve,reject) => {
            var reader = new FileReader();
            reader.onload = ({target}) => {
                var { result } = target;
                var image = new Image();
                image.src = result;
                image.onload = (data) => {
                    var canvas = document.createElement('canvas');
                    // var canvas = document.getElementById('canvas');
                    var context = canvas.getContext('2d');
                    var width,height;
                    if(image.naturalWidth>1500) {
                        width = image.naturalWidth/2;
                        height = image.naturalHeight/2;
                    } else if (image.naturalWidth>3000) {
                        width = image.naturalWidth/3;
                        height = image.naturalHeight/3;
                    } else {
                        width = image.naturalWidth;
                        height = image.naturalHeight;
                    }
    
                    canvas.width = width;
                    canvas.height = height;
    
                    // context.fillStyle = 'transparent';
                    context.fillRect(0, 0, width, height);
                    context.save();
                    context.translate(width/2, height/2);
                    context.drawImage(
                        image,
                        Math.floor(-width/2),
                        Math.floor(-height/2),
                        Math.floor(width),
                        Math.floor(height)
                    );
                    context.restore();

                    const done = (result) => {
                        var date = new Date();
                        result.lastModified = date.getTime();
                        result.lastModifiedDate = date;
                        result.name = file.name;
                        resolve(result);
                        image = null;
                        canvas = null;
                        reader = null;
                    };
    
                    if (canvas.toBlob) {
                        canvas.toBlob(done,options.mimeType, options.quality)
                    } else {
                        done(toBlob(canvas.toDataURL(options.mimeType, options.quality)));
                    }
    
    
                    // resolve(canvas.toDataURL("image/jpeg", 0.6));
                }
            }
            reader.onabort = reject;
            reader.onerror = reject;
            reader.readAsDataURL(file)
        })
    }
}

// 系统信息
export function sysVersion() {
    if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){  
        var iosVersionArr = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/); // ["OS 10_3_2", "10", "3", "1"]   
          
        //去除匹配的第一个下标的元素  
        iosVersionArr.shift(); 
        if(iosVersionArr[0] <= 8) {
            return true;
        } else {
            return false;
        }
    }else if (/(Android)/i.test(navigator.userAgent)){ //安卓机  
          
        // var andrLimitVersion = [5, 0, 0]; //"5.0.2", "4.2";  
        // var andrVersionArr = navigator.userAgent.match(/Android (\d+)\.(\d+)\.?(\d+)?/); //  ["Android 5.0.2","5","0","2"]  
        // //去除匹配的第一个下标的元素  
        // andrVersionArr.shift();  
        // for(var i = 0; i< andrLimitVersion.length; i++){  
        //     var cur = parseInt(andrVersionArr[i], 10) || 0;  
        //     var limit = parseInt(andrLimitVersion[i], 10) || 0;  
        //     if(cur < limit){  
        //         alert("当前系统版本过低, 不能继续开户！");  
        //         return true;  
        //     } else if(cur > limit){  
        //         return false;  
        //     }  
        // }  
        return false;  
    }  
}

// localstorage 存储 + 过期时间
const STOREAGE_DEFAULT = {
    duration:15*60*1000*1000,
    hasExpiryTime:false
}
export class Storage {
    constructor() {
        
    }
    setStorage(name,data,options) {
        options = {
            ...STOREAGE_DEFAULT,
            ...options
        }
        let result = {};
        result.data = data;
        if (options.hasExpiryTime) {
            result.saveTime = new Date().getTime();
            result.expiryTime = new Date().getTime() + options.duration;
        }
        localStorage.setItem(name, JSON.stringify(result));
    }
    getStorage(name) {
        var result = localStorage.getItem(name);
        var parseResult = {};
        if(!result) {
            return;
        }
        var currentTime = new Date().getTime();
        parseResult = JSON.parse(result);
        if (parseResult.expiryTime > currentTime || !parseResult.expiryTime) {
            return parseResult.data;
        } else {
            return ;
        }
    }
    removeStorage(name) {
        localStorage.removeItem(name);
    }
}