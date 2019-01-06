import Vue from 'vue'
import Router from 'vue-router'
import playgroundList from '@/components/playgroundList'
import tv from '@/pages/tv'
import cam from '@/pages/cam'
import vision from '@/pages/CamVision'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Playground',
      component: playgroundList
    },
    {
      path: '/tv/:id?',
      name: 'TV',
      component: tv
    },
    {
      path: '/cam/:id?',
      name: 'CAM',
      component: cam
    },
    {
      path: '/vision/:id?',
      name: 'vison',
      component: vision
    }
  ]
})
