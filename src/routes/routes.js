import Home from '~/pages/Home';
import config from '~/config';
import AuthPage from '~/pages/auth/AuthPage';
import EmailVerification from '~/pages/auth/EmailVerification';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.auth, component: AuthPage, layout: null },
    { path: config.routes.emailVerification, component: EmailVerification, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
