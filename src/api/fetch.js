import axios from 'axios'
import config from '../../config/index.js'

const BASE_URL = process.env.NODE_ENV === "development"
? config.dev.proxy
:'';
export function fetch(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        });
        instance(options)
            .then(response => {
                const res = response.data;
                if(res.code==11) {
                    window.location.href=BASE_URL+"/login?redirectUrl="+encodeURIComponent(location.href);
                    return;
                }
                resolve(res);
            })
            .catch(error => {
                Toast({message: `服务器访问异常(${error})`,position: 'center',duration: 5000});
                reject(error);
            });
    })
}