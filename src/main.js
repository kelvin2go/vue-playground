// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './layouts/default'
import router from './router'
import store from './store'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import VueYoutube from 'vue-youtube'
import WebRTC from 'vue-webrtc'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'

Vue.use(VueYoutube)
Vue.use(WebRTC)

Vue.use(Vuetify, {
  theme: {
    primary: '#0088bf',
    accent: '#ce93d8',
    secondary: '#424242'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
