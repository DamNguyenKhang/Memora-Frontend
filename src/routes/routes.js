import Home from '~/pages/Home';
import config from '~/config';
import AuthPage from '~/pages/auth/AuthPage';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.auth, component: AuthPage, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
