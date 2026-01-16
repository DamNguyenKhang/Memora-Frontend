import { Brain, User, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '~/components/ui/button';
import { AUTHENTICATION_PAGE } from '~/constants/pages';
import useAuth from '~/hooks/useAuth';
import { Dropdown } from 'antd';
import { post } from '~/api/http';
import { LOGOUT } from '~/constants/APIs';

function Header() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await post(LOGOUT);
        setAuth({});
        navigate(AUTHENTICATION_PAGE);
    };

    const userMenuItems = [
        {
            key: 'profile',
            label: 'Profile',
            icon: <User className="w-4 h-4" />,
            onClick: () => navigate('/profile'),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogOut className="w-4 h-4" />,
            onClick: handleLogout,
            danger: true,
        },
    ];

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

                        {auth?.user ? (
                            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                                <div className="flex items-center gap-2 cursor-pointer hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors">
                                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
                                        {auth.user.username?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <span className="text-gray-700 font-medium">{auth.user.username}</span>
                                </div>
                            </Dropdown>
                        ) : (
                            <>
                                <Button
                                    size="sm"
                                    variant="link"
                                    interaction="none"
                                    className="text-indigo-600 hover:text-indigo-700"
                                >
                                    <Link
                                        to={AUTHENTICATION_PAGE}
                                        state={{ tab: 'login', redirectTo: location.pathname + location.search }}
                                    >
                                        Sign In
                                    </Link>
                                </Button>

                                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                                    <Link to={AUTHENTICATION_PAGE} state={{ tab: 'register' }}>
                                        Get Started
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
