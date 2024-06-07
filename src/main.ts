import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import routers from "@/routers";
const pinia = createPinia()
createApp(App).use(routers).use(pinia).use(ElementPlus).mount('#app')
