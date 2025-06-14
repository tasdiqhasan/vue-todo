import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import TaskDetail from '../views/TaskDetail.vue'
import TaskEdit from '../views/TaskEdit.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/task/:id', component: TaskDetail, props: true },
    { path: '/task/:id/edit', component: TaskEdit, props: true }  
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
