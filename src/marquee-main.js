// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './apps/marquee/router'
import store from './apps/marquee/store'

Vue.use(ElementUI)

Vue.config.productionTip = false

if (process.env.NODE_ENV !== 'production') {
  // require('./apps/marquee/services/mock').default.bootstrap()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
