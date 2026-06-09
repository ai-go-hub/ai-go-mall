import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import mitt from 'mitt'
import { createApp } from 'vue'
import App from './App.vue'
import pinia from '/@/stores/index'

function start() {
    const app = createApp(App)

    app.use(pinia)
    app.use(ElementPlus)

    app.mount('#app')

    // 将 mitt 事件总线挂载到 vue 全局属性
    app.config.globalProperties.eventBus = mitt()
}

start()
