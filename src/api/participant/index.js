import { fetch } from '../fetch.js'
import axios from 'axios'

// 参与人数接口
export function getList(name) {
    return fetch({
        url:'/api/participant/getList',
        method:'get',
    }).then((result) => {
        return Promise.resolve(result);
    })
}