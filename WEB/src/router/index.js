import Vue from 'vue/dist/vue.esm.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/dashboard',
        alias: '/',
        component: () => import('../pages/core/Dashboard.vue')
    },
    {
        path: '/center',
        component: () => import('../pages/center/Center.vue')
    }
]

const router = new VueRouter({
    routes: routes
})
router.beforeEach((to, from, next) => {
    next()
})
router.afterEach(() => {
    window.scrollTo(0, 0)
})

export default router
