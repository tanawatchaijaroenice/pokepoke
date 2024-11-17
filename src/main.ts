import { createApp } from 'vue'
import './style.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import { createRouter, createWebHistory } from 'vue-router'
import PokemonList from "./pages/PokemonList.vue";
import PokemonDetail from "./pages/PokemonDetail.vue";
import Aura from '@primevue/themes/aura'

// const routes = [
//     { path: '/', component: PokemonList },
//     { path: '/detail', name: 'detail', component: PokemonDetail },
// ]

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: PokemonList
        },
        {
            path: '/detail/:id',
            component: PokemonDetail
        },
    ],
})

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(router);
app.mount('#app')
