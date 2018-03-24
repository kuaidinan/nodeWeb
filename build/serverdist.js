var express = require('express');
var app = express();
var path = require('path');
var proxyMiddleware = require('http-proxy-middleware')
var config = require('../config')

var context = config.dev.context
var proxypath = config.dev.proxypath

var options = {
    target: proxypath,
    changeOrigin: true,
    secure: false
}
if (context.length) {
    app.use(proxyMiddleware(context, options))
}

app.use(express.static(path.join(__dirname,'..','dist')));
app.get('*',function(res,req){
    req.sendFile(path.join('index.html'));
})
app.listen('4444',() => {
    console.log('port is 4444')
})