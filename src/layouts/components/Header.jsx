import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { AUTHENTICATION_PAGE } from '~/constants/pages';
// import { useTranslation } from 'react-i18next';
// import useAuth from '~/hooks/useAuth';

function Header() {
    return (
        <nav className="bg-white border-b border-indigo-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <Brain className="w-8 h-8 text-indigo-600" />
                        <span className="text-2xl font-bold text-indigo-900">Memora</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">
                            Features
                        </a>
                        <a href="#how" className="text-gray-600 hover:text-indigo-600 transition-colors">
                            How it Works
                        </a>
                        <a href="#community" className="text-gray-600 hover:text-indigo-600 transition-colors">
                            Community
                        </a>

                        <Button variant="link" to={AUTHENTICATION_PAGE} className="text-indigo-600 hover:text-indigo-700">
                            <Link to={AUTHENTICATION_PAGE}>Sign In</Link>
                        </Button>

                        <Button className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
