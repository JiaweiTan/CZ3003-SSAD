import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import DashboardHome from '@/pages/Home'
import DashboardCourse from '@/pages/Course'
import DashboardTopic from '@/pages/Topic'
import DashboardQuestion from '@/pages/Question'
import DashboardQuiz from '@/pages/Quiz'
import DashboardAttempt from '@/pages/Attempt'
import DashboardUser from '@/pages/User'

import store from './store'

import '@/assets/css/tailwind.css'


Vue.config.productionTip = false

Vue.use(Router)

const routes = [
  { path: '/', redirect: { name: 'DashboardHome' } },
  { path: '/dashboard', component: Dashboard, children: [
      { path: '/', redirect: { name: 'DashboardHome' } },
      { path: 'home', name: 'DashboardHome', component: DashboardHome },
      { path: 'course', name: 'DashboardCourse', component: DashboardCourse },
      { path: 'topic', name: 'DashboardTopic', component: DashboardTopic },
      { path: 'question', name: 'DashboardQuestion', component: DashboardQuestion },
      { path: 'quiz', name: 'DashboardQuiz', component: DashboardQuiz },
      { path: 'attempt', name: 'DashboardAttempt', component: DashboardAttempt },
      { path: 'user', name: 'DashboardUser', component: DashboardUser },
    ]
  }
]

const router = new Router({
  mode: 'history',
  routes,
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

