import Vue from 'vue'
import Router from 'vue-router'
import playgroundList from '@/components/playgroundList'
import TV from '@/pages/tv'
import CAM from '@/pages/cam'
import MEETING from '@/pages/see'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'My Playground list',
      component: playgroundList
    },
    {
      path: '/tv/:id?',
      name: 'TV',
      component: TV
    },
    {
      path: '/see/:id?',
      name: 'Meeting',
      component: MEETING
    },
    {
      path: '/cam/:id?',
      name: 'CAM',
      component: CAM
    }
  ]
})
