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
import VueGtm from 'vue-gtm'
import vision from 'vue-cam-vision'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'

Vue.use(VueGtm, {
  id: 'GTM-PL9TSHZ', // Your GTM ID
  enabled: process.env.NODE_ENV === 'production', // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: process.env.NODE_ENV !== 'production', // Whether or not display console logs debugs (optional)
  vueRouter: router
})

Vue.use(VueYoutube)
Vue.use(WebRTC)
Vue.use(vision)

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
