import { useState } from 'react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Form, Card, Typography, message, Divider, Tabs } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '~/components/ui/date-picker';
import Lottie from 'lottie-react';
import loginAnimation from '~/assets/lottie/login-animation.json';
import googleLogo from '~/assets/images/google-logo.png';
import * as authenticationService from '~/services/authenticationService';
import useAuth from '~/hooks/useAuth';

const { Title, Text } = Typography;

const AuthPage = () => {
    const { t } = useTranslation('auth');
    const { setAuth } = useAuth();
    const [loginForm] = Form.useForm();
    const [registerForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();

    const onLoginFinish = async (values) => {
        setLoading(true);
        try {
            console.log('Login values:', values);
            const response = await authenticationService.login(values.identifier, values.password);
            console.log('Login response:', response);
            setAuth({ user: response.result.user, accessToken: response.result.accessToken });
            message.success(t('loginSuccess'));
            navigate('/');
        } catch {
            message.error(t('loginFailed'));
        } finally {
            setLoading(false);
        }
    };

    const onRegisterFinish = async (values) => {
        setLoading(true);
        try {
            console.log('Register values:', values);
            const response = await authenticationService.register(values.username, values.email, values.password);
            console.log('Register response:', response);
            message.success(t('registerSuccess'));
            setActiveTab('login');
            registerForm.resetFields();
        } catch {
            message.error(t('registerFailed'));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        message.info(t('googleLoginInfo'));
    };

    const tabItems = [
        {
            key: 'login',
            label: t('loginLabel'),
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
                        label={<span className="text-sm font-medium text-gray-900">{t('usernameOrEmail')}</span>}
                        rules={[{ required: true, message: t('usernameOrEmailRequired') }]}
                    >
                        <Input
                            prefix={<MailOutlined className="text-gray-400" />}
                            placeholder={t('usernameOrEmailPlaceholder')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={<span className="text-sm font-medium text-gray-900">{t('password')}</span>}
                        rules={[
                            { required: true, message: t('passwordRequired') },
                            { min: 6, message: t('passwordMinLength') },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder={t('passwordPlaceholder')}
                        />
                    </Form.Item>

                    <div className="flex justify-end items-center mb-6">
                        <a
                            href="/forgot-password"
                            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors hover:underline"
                        >
                            {t('forgotPassword')}
                        </a>
                    </div>

                    <Form.Item className="!mb-0">
                        <Button
                            variant="default"
                            size="lg"
                            className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-base rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                            disabled={loading}
                        >
                            {loading ? t('loading') : t('loginButton')}
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            key: 'register',
            label: t('registerLabel'),
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
                            { required: true, message: t('usernameRequired') },
                            { min: 2, message: t('usernameMinLength') },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder={t('usernamePlaceholder')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label={<span className="text-sm font-medium text-gray-900">{t('email')}</span>}
                        rules={[
                            { required: true, message: t('emailRequired') },
                            { type: 'email', message: t('emailInvalid') },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="text-gray-400" />}
                            placeholder={t('emailPlaceholder')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="dateOfBirth"
                        label={<span className="text-sm font-medium text-gray-900">{t('dateOfBirth')}</span>}
                        rules={[
                            { required: true, message: t('dateOfBirthRequired') },
                            {
                                validator: (_, value) => {
                                    if (!value) return Promise.resolve();
                                    const age = Math.floor(
                                        (new Date() - new Date(value)) / (365.25 * 24 * 60 * 60 * 1000),
                                    );
                                    if (age < 13) {
                                        return Promise.reject(new Error(t('ageMinimum')));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <DatePicker
                            placeholder={t('dateOfBirthPlaceholder')}
                            className="w-full"
                            disabledDate={(current) => {
                                const thirteenYearsAgo = new Date();
                                thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);
                                return current && current > thirteenYearsAgo;
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={<span className="text-sm font-medium text-gray-900">{t('password')}</span>}
                        rules={[
                            { required: true, message: t('passwordRequired') },
                            { min: 6, message: t('passwordMinLength') },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder={t('passwordPlaceholder')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label={<span className="text-sm font-medium text-gray-900">{t('confirmPassword')}</span>}
                        dependencies={['password']}
                        rules={[
                            { required: true, message: t('confirmPasswordRequired') },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(t('confirmPasswordMismatch')));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder={t('confirmPasswordPlaceholder')}
                        />
                    </Form.Item>

                    <Form.Item className="!mb-0">
                        <Button
                            variant="default"
                            size="lg"
                            className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-base rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                            disabled={loading}
                        >
                            {loading ? t('loading') : t('registerButton')}
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
    ];

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
                    <Card className="w-full max-w-[500px] shadow-none border-none" bordered={false}>
                        <div className="text-center mb-8">
                            <Title level={2} className="!mb-2 font-bold text-gray-900">
                                {activeTab === 'login' ? t('loginTitle') : t('registerTitle')}
                            </Title>
                            <Text type="secondary" className="text-sm text-gray-500">
                                {activeTab === 'login' ? t('loginSubtitle') : t('registerSubtitle')}
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
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full h-12 rounded-lg border-2 border-gray-300 font-medium transition-all duration-300 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 flex items-center justify-center gap-2"
                                onClick={handleGoogleLogin}
                            >
                                <img src={googleLogo} alt="Google" className="w-5 h-5" />
                                {activeTab === 'login' ? t('loginWithGoogle') : t('registerWithGoogle')}
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
