import { createStore } from 'vuex';

import coachesModules from './modules/coaches/index.js';

const store = createStore({
    modules: {
        coaches: coachesModules
    }
});

export default store;