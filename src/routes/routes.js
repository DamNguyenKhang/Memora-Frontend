import Home from '~/pages/Home';
import config from '~/config';
import Login from '~/pages/auth/Login';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.auth, component: Login, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
