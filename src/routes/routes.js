import Home from '~/pages/Home';
import config from '~/config';
import AuthPage from '~/pages/auth/AuthPage';
import EmailVerification from '~/pages/auth/EmailVerification';
import DeckViewerPage from '~/pages/deck/deckViewerPage';
import CreateDeck from '~/pages/deck/createDeck';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.auth, component: AuthPage, layout: null },
    { path: config.routes.emailVerification, component: EmailVerification, layout: null },
    { path: config.routes.deckViewerPage, component: DeckViewerPage },
    { path: config.routes.createDeck, component: CreateDeck },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
