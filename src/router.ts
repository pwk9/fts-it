import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import insertLangKeyView from './views/insertLangKeyView.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/about',
            name: 'about',
            component: About,
        },
        {
            path: '/insertLangKey',
            name: 'insertLangKey',
            component: insertLangKeyView,
        },
    ],
});
