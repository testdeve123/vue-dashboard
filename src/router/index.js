import { createRouter, createWebHashHistory } from 'vue-router'
import IntroPage from '../views/IntroPage.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import DataHistory from '../views/DataHistory.vue'
import StudentList from '../views/StudentList.vue'
import AddStudent from '../views/AddStudent.vue'
import SystemAnalysis from '../views/SystemAnalysis.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    redirect: '/intropage'
  },
  {
    path: '/intropage',
    name: 'IntroPage',
    component: IntroPage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/dashboard',
    children: [
      { path: '/dashboard', component: Dashboard },
      { path: '/datahistory', component: DataHistory },
      { path: '/studentlist', component: StudentList },
      { path: '/systemanalysis', component: SystemAnalysis },
      { path: '/settings', component: Settings }
    ]
  },
  {
    path: '/addstudent',
    name: 'AddStudent',
    component: AddStudent
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
