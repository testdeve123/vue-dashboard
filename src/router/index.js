import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import DataAnalysis from '../views/DataAnalysis.vue'
import StudentList from '../views/StudentList.vue'
import AddStudent from '../views/AddStudent.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/analysis',
    name: 'DataAnalysis',
    component: DataAnalysis
  },
  {
    path: '/studentlist',
    name: 'StudentList',
    component: StudentList
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
