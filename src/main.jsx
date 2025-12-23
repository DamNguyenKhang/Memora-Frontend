import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import GlobalStyles from './components/GlobalStyles';
import { AuthProvider } from './contexts/AuthProvider';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GlobalStyles>
            <AuthProvider>
                <App />
            </AuthProvider>
        </GlobalStyles>
    </StrictMode>,
);
