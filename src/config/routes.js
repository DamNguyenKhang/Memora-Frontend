import { AUTHENTICATION_PAGE, VERIFY_EMAIL, CREATE_DECK, DECK_VIEWER_PAGE } from '~/constants/pages';

const routes = {
    home: '/',
    auth: AUTHENTICATION_PAGE,
    emailVerification: VERIFY_EMAIL,
    deckViewerPage: DECK_VIEWER_PAGE,
    createDeck: CREATE_DECK,
};

export default routes;
