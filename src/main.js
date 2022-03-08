import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css' // import global
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // import './plugins/element.js'
import * as echarts from 'echarts' // import 'echarts'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/'

const app = createApp(App)
app.use(router).use(ElementPlus).mount('#app') //
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$api = axios
