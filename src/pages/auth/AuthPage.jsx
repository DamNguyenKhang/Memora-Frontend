import { useEffect, useState } from 'react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Form, Card, Typography, message, Divider, Tabs } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import loginAnimation from '~/assets/lottie/login-animation.json';
import googleLogo from '~/assets/images/google-logo.png';
import * as authenticationService from '~/services/authenticationService';
import { isValidUsername, isValidPassword, isValidEmail } from '~/utils/validators';
import useAuth from '~/hooks/useAuth';
import useDebounced from '~/hooks/useDebounced';
import { LOGIN, REGISTER, GOOGLE_LOGIN } from '~/constants/APIs';
import { VERIFY_EMAIL } from '~/constants/pages';
import { post } from '~/api/http';
import isSuccessResponse from '~/utils/checkResponse';
import { GoogleLogin } from '@react-oauth/google';
import DatePicker from '~/components/ui/date-picker';

const { Title, Text } = Typography;

const AuthPage = () => {
    const { t } = useTranslation('auth');
    const { setAuth } = useAuth();
    const [loginForm] = Form.useForm();
    const [registerForm] = Form.useForm();
    const username = Form.useWatch('username', registerForm);
    const email = Form.useWatch('email', registerForm);
    const usernameDebounced = useDebounced(username, 500);
    const emailDebounced = useDebounced(email, 500);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const redirectTo = location.state?.redirectTo ?? '/';
    const [activeTab, setActiveTab] = useState(location.state?.tab ?? 'login');
    const navigate = useNavigate();

    const onLoginFinish = async (values) => {
        setLoading(true);
        try {
            const response = await post(LOGIN, {
                identifier: values.identifier,
                password: values.password,
            });
            if (isSuccessResponse(response)) {
                const authData = {
                    user: response.result.user,
                    accessToken: response.result.accessToken,
                };

                sessionStorage.setItem('auth', JSON.stringify(authData));
                setAuth(authData);
                message.success(t('login_success'));
                navigate(redirectTo, { replace: true });
            }
        } catch (error) {
            if (error.response.data.status === 403) {
                navigate(VERIFY_EMAIL, {
                    state: { email: values.email, redirectTo },
                });
            } else {
                message.error(t('login_failed'));
            }
        } finally {
            setLoading(false);
        }
    };

    const onRegisterFinish = async (values) => {
        setLoading(true);
        try {
            const response = await post(REGISTER, {
                username: values.username,
                email: values.email,
                password: values.password,
                dateOfBirth: values.dateOfBirth,
            });

            if (isSuccessResponse(response)) {
                console.log(redirectTo);
                navigate(VERIFY_EMAIL, {
                    state: { email: values.email, redirectTo },
                });
                registerForm.resetFields();
            }
        } catch {
            message.error(t('register_failed'));
        } finally {
            setLoading(false);
        }
    };

    const onGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const idToken = credentialResponse.credential;

            if (!idToken) {
                message.error(t('google_login_failed'));
                return;
            }

            const response = await post(GOOGLE_LOGIN, {
                idToken,
            });

            if (isSuccessResponse(response)) {
                const authData = {
                    user: response.result.user,
                    accessToken: response.result.accessToken,
                };

                sessionStorage.setItem('auth', JSON.stringify(authData));
                setAuth(authData);
                message.success(t('login_success'));
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            message.error(t('google_login_failed'));
        }
    };

    const tabItems = [
        {
            key: 'login',
            label: t('login_label'),
            children: (
                <Form
                    form={loginForm}
                    name="login"
                    onFinish={onLoginFinish}
                    layout="vertical"
                    size="large"
                    autoComplete="off"
                    className="w-full"
                >
                    <Form.Item
                        name="identifier"
                        label={<span className="text-sm font-medium text-gray-900">{t('username_or_email')}</span>}
                        rules={[{ required: true, message: t('username_or_email_required') }]}
                    >
                        <Input
                            prefix={<MailOutlined className="text-gray-400" />}
                            placeholder={t('username_or_email_placeholder')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={<span className="text-sm font-medium text-gray-900">{t('password')}</span>}
                        rules={[{ required: true, message: t('password_required') }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder={t('password_placeholder')}
                        />
                    </Form.Item>

                    <div className="flex justify-end items-center mb-6">
                        <a
                            href="/forgot-password"
                            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors hover:underline"
                        >
                            {t('forgot_password')}
                        </a>
                    </div>

                    <Form.Item className="!mb-0">
                        <Button variant="default" size="lg" className="w-full " disabled={loading}>
                            {loading ? t('loading') : t('login_button')}
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            key: 'register',
            label: t('register_label'),
            children: (
                <Form
                    form={registerForm}
                    name="register"
                    onFinish={onRegisterFinish}
                    layout="vertical"
                    size="large"
                    autoComplete="off"
                    className="w-full"
                >
                    <Form.Item
                        name="username"
                        label={<span className="text-sm font-medium text-gray-900">{t('username')}</span>}
                        rules={[
                            { required: true, message: t('username_required') },
                            {
                                validator: (_, value) => {
                                    if (!value || isValidUsername(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(t('username_invalid')));
                                },
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder={t('username_placeholder')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label={<span className="text-sm font-medium text-gray-900">{t('email')}</span>}
                        rules={[
                            { required: true, message: t('email_required') },
                            { type: 'email', message: t('email_invalid') },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="text-gray-400" />}
                            placeholder={t('email_placeholder')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="dateOfBirth"
                        label={<span className="text-sm font-medium text-gray-900">{t('date_of_birth')}</span>}
                        rules={[
                            { required: true, message: t('date_of_birth_required') },
                            {
                                validator: (_, value) => {
                                    if (!value) return Promise.resolve();
                                    const age = Math.floor(
                                        (new Date() - new Date(value)) / (365.25 * 24 * 60 * 60 * 1000),
                                    );
                                    if (age < 13) {
                                        return Promise.reject(new Error(t('age_minimum')));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={<span className="text-sm font-medium text-gray-900">{t('password')}</span>}
                        rules={[
                            { required: true, message: t('password_required') },
                            {
                                validator: (_, value) => {
                                    if (!value || isValidPassword(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(t('password_invalid_format')));
                                },
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder={t('password_placeholder')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label={<span className="text-sm font-medium text-gray-900">{t('confirm_password')}</span>}
                        dependencies={['password']}
                        rules={[
                            { required: true, message: t('confirm_password_required') },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(t('confirm_password_mismatch')));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder={t('confirm_password_placeholder')}
                        />
                    </Form.Item>

                    <Form.Item className="!mb-0">
                        <Button variant="default" size="lg" className="w-full" disabled={loading}>
                            {loading ? t('loading') : t('register_button')}
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
    ];

    useEffect(() => {
        if (!usernameDebounced) return;

        if (!isValidUsername(usernameDebounced)) return;

        let cancelled = false;

        (async () => {
            const exists = await authenticationService.checkUsernameExist(usernameDebounced);

            if (cancelled) return;

            if (exists) {
                registerForm.setFields([
                    {
                        name: 'username',
                        errors: [t('username_exists')],
                    },
                ]);
            } else {
                registerForm.setFields([
                    {
                        name: 'username',
                        errors: [],
                    },
                ]);
            }
        })();

        return () => (cancelled = true);
    }, [usernameDebounced]);

    useEffect(() => {
        if (!emailDebounced) return;

        if (!isValidEmail(emailDebounced)) return;

        let cancelled = false;

        (async () => {
            const exists = await authenticationService.checkEmailExist(emailDebounced);

            if (cancelled) return;

            if (exists) {
                registerForm.setFields([
                    {
                        name: 'email',
                        errors: [t('email_exists')],
                    },
                ]);
            } else {
                registerForm.setFields([
                    {
                        name: 'email',
                        errors: [],
                    },
                ]);
            }
        })();

        return () => (cancelled = true);
    }, [emailDebounced]);

    useEffect(() => {
        if (location.state?.tab) {
            setActiveTab(location.state?.tab);
        }
    }, [location.state]);

    return (
        <div className="min-h-screen h-screen w-screen flex items-stretch justify-stretch bg-white p-0 m-0 relative overflow-hidden">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 opacity-100 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            ></div>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full bg-white rounded-none shadow-none overflow-hidden relative z-10 m-0">
                {/* Left side - Animation */}
                <div className="hidden md:flex bg-gray-50 flex-col items-center justify-center p-10 relative overflow-hidden border-r border-gray-200">
                    <div className="flex-1 flex items-center justify-center w-full max-w-[700px]">
                        <Lottie
                            animationData={loginAnimation}
                            loop={true}
                            autoplay={true}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>

                {/* Right side - Auth Form */}
                <div className="flex items-start justify-center p-10 md:p-10 bg-white min-h-screen overflow-y-auto">
                    <Card className="w-full max-w-[500px] shadow-none border-none">
                        <div className="text-center mb-8">
                            <Title level={2} className="!mb-2 font-bold text-gray-900">
                                {activeTab === 'login' ? t('login_title') : t('register_title')}
                            </Title>
                            <Text type="secondary" className="text-sm text-gray-500">
                                {activeTab === 'login' ? t('login_subtitle') : t('register_subtitle')}
                            </Text>
                        </div>

                        <Tabs
                            activeKey={activeTab}
                            onChange={setActiveTab}
                            items={tabItems}
                            centered
                            className="mb-6 [&_.ant-tabs-nav]:mb-8 [&_.ant-tabs-nav::before]:border-b-2 [&_.ant-tabs-nav::before]:border-gray-200 [&_.ant-tabs-tab]:text-base [&_.ant-tabs-tab]:font-medium [&_.ant-tabs-tab]:py-3 [&_.ant-tabs-tab]:px-6 [&_.ant-tabs-tab]:text-gray-500 [&_.ant-tabs-tab:hover]:text-indigo-600 [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:text-indigo-600 [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:font-semibold [&_.ant-tabs-ink-bar]:bg-indigo-600 [&_.ant-tabs-ink-bar]:h-[3px] [&_.ant-tabs-content]:p-0"
                        />

                        <Divider className="!my-6 text-gray-500 text-sm">{t('or')}</Divider>

                        <div>
                            <div className="relative w-full group">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full h-12 rounded-lg border-2 border-gray-300 font-medium transition-all duration-300 group-hover:border-indigo-600 group-hover:text-indigo-600 group-hover:bg-indigo-50 flex items-center justify-center gap-2"
                                >
                                    <img src={googleLogo} alt="Google" className="w-5 h-5" />{' '}
                                    {activeTab === 'login' ? t('login_with_google') : t('register_with_google')}{' '}
                                </Button>

                                <div className="absolute inset-0 opacity-0">
                                    <GoogleLogin
                                        onSuccess={onGoogleLoginSuccess}
                                        onError={() => message.error(t('google_login_failed'))}
                                        useOneTap={false}
                                        theme="outline"
                                        size="large"
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
