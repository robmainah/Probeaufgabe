import { createRouter, createWebHistory } from 'vue-router'

import ProductsList from '@/views/products/list.vue'
import ProductsDetail from '@/views/products/detail.vue'

const routes = [
    {
        path: '/',
        name: 'ProductsList',
        component: ProductsList
    },
    {
        path: '/products/:id',
        name: 'ProductDetail',
        component: ProductsDetail
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
