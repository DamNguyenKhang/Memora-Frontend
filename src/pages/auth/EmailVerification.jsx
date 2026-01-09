import React, { useEffect, useState } from 'react';
import { Mail, RefreshCw } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { RESEND_EMAIL_VERIFICATION, VERIFY_EMAIL } from '~/constants/APIs';
import { post } from '~/api/http';
import { message } from 'antd';
import isSuccessResponse from '~/utils/checkResponse';
import useAuth from '~/hooks/useAuth';
import { AUTHENTICATION_PAGE } from '~/constants/pages';

export default function EmailVerification() {
    const [isResending, setIsResending] = useState(false);
    const { setAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const redirectTo = location.state?.redirectTo ?? '/';
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email') ?? location.state?.email;

    const handleResendEmail = async () => {
        setIsResending(true);
        try {
            const response = await post(RESEND_EMAIL_VERIFICATION, { email });
            if (isSuccessResponse(response)) {
                message.success('Email xác thực đã được gửi lại!');
                setIsResending(false);
            }
        } catch {
            setIsResending(false);
            message.error('Resend email verification failed');
        }
    };

    const handleBackToLogin = () => {
        navigate(AUTHENTICATION_PAGE);
    };

    useEffect(() => {
        if (!token || !email) return;

        const verifyEmail = async () => {
            try {
                const response = await post(VERIFY_EMAIL, {
                    token,
                    email,
                });
                if (isSuccessResponse(response)) {
                    const authData = {
                        user: response.result.user,
                        accessToken: response.result.accessToken,
                    };

                    sessionStorage.setItem('auth', JSON.stringify(authData));
                    setAuth(authData);
                    message.success('Verify email successfully');
                    navigate(redirectTo, { replace: true });
                }
            } catch (error) {
                if (error.status >= 400) {
                    message.error(error.response.data.detail);
                }
                console.log(error);
            }
        };
        verifyEmail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, token]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Main Content */}
            <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                            <Mail className="w-10 h-10 text-indigo-600" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">Xác Thực Email</h1>

                    {/* Description */}
                    <p className="text-gray-600 text-center mb-8">Chúng tôi đã gửi một email xác thực đến địa chỉ</p>

                    {/* Email Display */}
                    <div className="bg-indigo-50 rounded-lg p-4 mb-8">
                        <p className="text-indigo-900 font-semibold text-center">{email}</p>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 border-l-4 border-indigo-600 p-4 mb-8">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-indigo-900">
                                    Vui lòng kiểm tra hộp thư đến và nhấp vào liên kết xác thực để hoàn tất đăng ký. Nếu
                                    không thấy email, hãy kiểm tra thư mục spam.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Resend Button */}
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleResendEmail}
                        disabled={isResending}
                        className="w-full h-12 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 mb-4"
                    >
                        <RefreshCw className={isResending ? 'animate-spin' : ''} />
                        <span>{isResending ? 'Đang gửi...' : 'Gửi lại email xác thực'}</span>
                    </Button>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">hoặc</span>
                        </div>
                    </div>

                    {/* Back to Login Button */}
                    <Button
                        size="lg"
                        onClick={handleBackToLogin}
                        className="w-full h-12 bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
                    >
                        Quay lại đăng nhập
                    </Button>

                    {/* Help Text */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Cần trợ giúp?{' '}
                        <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                            Liên hệ hỗ trợ
                        </a>
                    </p>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Bằng cách xác thực email, bạn đồng ý với{' '}
                        <a href="#" className="text-indigo-600 hover:text-indigo-700">
                            Điều khoản sử dụng
                        </a>{' '}
                        và{' '}
                        <a href="#" className="text-indigo-600 hover:text-indigo-700">
                            Chính sách bảo mật
                        </a>{' '}
                        của chúng tôi.
                    </p>
                </div>
            </main>
        </div>
    );
}
