// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router'
import store from './vuex'
import { sync } from 'vuex-router-sync'
import axios from 'axios'

Vue.prototype.$http = axios

sync(store, router)
Vue.use(ElementUI)

/* eslint-disable no-new */
const app = new Vue({
  store,
  router,
  ...App
})
app.$mount('#app')