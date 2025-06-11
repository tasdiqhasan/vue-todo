import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/tailwind.css'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Toast, {
    position: 'top-right',
    timeout: 2500,
    closeOnClick: true,
    pauseOnHover: true,
})
app.mount('#app')
