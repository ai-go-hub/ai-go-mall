import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import staticRoutes from '/@/router/static'
import { loading } from '/@/utils/loading'

const router = createRouter({
    history: createWebHashHistory(),
    routes: staticRoutes,
})

// 路由加载前
router.beforeEach(() => {
    NProgress.configure({ showSpinner: false })
    NProgress.start()

    if (!window.loading) {
        loading.show()
        window.loading = true
    }
})

// 路由加载后
router.afterEach(() => {
    if (window.loading) {
        loading.hide()
    }
    NProgress.done()
})

export default router
