import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import DataRecords from '../views/DataRecords.vue'
import StudentList from '../views/StudentList.vue'
import AddStudent from '../views/AddStudent.vue'
import Settings from '../views/Settings.vue'

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
    component: Home,
    redirect: '/dashboard',
    children: [
      { path: '/dashboard', component: Dashboard },
      { path: '/datarecords', component: DataRecords },
      { path: '/studentlist', component: StudentList },
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
