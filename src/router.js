import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id',
            props: true,
            component: CoachDetail,
            children: [
                { path: 'contact', component: ContactCoach }
            ]
        },
        { path: '/register', component: CoachRegistration, meta: { needsAuth: true } },
        { path: '/requests', component: RequestReceived , meta: { needsAuth: true } },
        { path: '/auth', component: UserAuth, meta: { needsUnAuth: true } },
        { path: '/:notFound(.*)', component: NotFound }
    ]
});

router.beforeEach(function(to, _, next) {
    if (to.meta.needsAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.needsUnAuth && store.getters.isAuthenticated) {
        next('/coaches');
    }
    else {
        next();
    }
});

export default router;