// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require("babel-polyfill")
import Vue from 'vue'
import App from './App'
import router from './router'
// import fastclick from 'fastclick'

// import VConsole from 'vconsole';
// var vConsole = new VConsole();
// Vue.use(vConsole);

Vue.config.productionTip = false


// 路由跳转管理
router.beforeEach((to, from, next) => {
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
