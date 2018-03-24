import { fetch } from '../fetch.js'
import axios from 'axios'
import { Toast  } from 'mint-ui'

// 字典接口
export function getDicts(name) {
    return fetch({
        url:'/mobile/common/dicts',
        method:'get',
        params:{dictCode:name}
    }).then((result) => {
        return Promise.resolve(result);
    })
}

// 获取部门接口
export function getOrgs() {
    return fetch({
        url:'/mobile/common/orgs?level=2',
        method:'get'
    }).then((result) => {
        return Promise.resolve(result);
    })
}

// 校验入职员工真实性
export function CheckEmp(data) {
    return fetch({
        url:'/mobile/emp/check',
        method:'post',
        data:data
    }).then((result) => {
        return Promise.resolve(result);
    })
}

// 保存员工信息地址
export function saveInfo(option) {
    let config = {
        headers: {
            // 'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
            'Content-Type': 'multipart/form-data',
        },
        // baseURL:"http://oa-test.zm1v1.com/"
    }
    return axios.post('/mobile/emp/save',option,config).then((result) => {
        return Promise.resolve(result)
    }).catch((result) => {
        return Promise.reject(result)
    })
}

// 获取验证码
export function GetCodes(mobile) {
    return fetch({
        url:'/mobile/common/send-sms-validate-code',
        method:'get',
        params:{"mobile":mobile,"cnum":4,"time":3600,"templateName":"validate"}
    }).then((result) => {
        return Promise.resolve(result);
    })
}

// check验证码
export function CheckCode(option) {
    return fetch({
        url:'/mobile/common/check-sms-validate-code',
        method:'get',
        params:option
    }).then((result) => {
        return Promise.resolve(result);
    })
}

// 图片保存 /mobile/emp/upload-file
export function SaveImg(option) {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        // baseURL:"http://oa-test.zm1v1.com/"
    }
    return axios.post('/mobile/emp/upload-file',option,config).then((result) => {
        return Promise.resolve(result)
    }).catch((result) => {
        return Promise.reject(result)
    })
}