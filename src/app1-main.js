// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './apps/app1/router'
import store from './apps/app1/store'

Vue.config.productionTip = false

if (process.env.NODE_ENV !== 'production') {
  // require('./apps/app1/services/mock').default.bootstrap()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
