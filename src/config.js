var env = 'test';
var CONFIG = {};
if (env === 'test') {
    CONFIG.QINIU_BASE_URL="http://owxjqueqv.bkt.clouddn.com";
} else if (env === 'pro') {
    CONFIG.CONFIG.QINIU_BASE_URL = 'http://market-static.zhangmen.com';
}
export default CONFIG;