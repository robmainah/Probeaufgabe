import { createApp } from 'vue'
import router from './router'
import './index.css'
import App from './App.vue'

import axios from 'axios'
import store from "./store";

createApp(App).use(router, axios).use(store).mount('#app')
