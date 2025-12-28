import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Divider, Tabs } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import loginAnimation from '~/assets/lottie/login-animation.json';
import googleLogo from '~/assets/images/google-logo.png';
import * as authenticationService from '~/services/authenticationService';
import useAuth from '~/hooks/useAuth';
import './AuthPage.scss';

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
            setAuth({ user: response.user, accessToken: response.accessToken });
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
                    className="auth-form"
                >
                    <Form.Item
                        name="identifier"
                        label={t('usernameOrEmail')}
                        rules={[
                            { required: true, message: t('usernameOrEmailRequired') }
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder={t('usernameOrEmailPlaceholder')} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={t('password')}
                        rules={[
                            { required: true, message: t('passwordRequired') },
                            { min: 6, message: t('passwordMinLength') },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder={t('passwordPlaceholder')} />
                    </Form.Item>

                    <div className="login-options">
                        <a href="/forgot-password" className="forgot-password">
                            {t('forgotPassword')}
                        </a>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading} className="auth-button">
                            {t('loginButton')}
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
                    className="auth-form"
                >
                    <Form.Item
                        name="username"
                        label={t('username')}
                        rules={[
                            { required: true, message: t('usernameRequired') },
                            { min: 2, message: t('usernameMinLength') },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder={t('usernamePlaceholder')} />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label={t('email')}
                        rules={[
                            { required: true, message: t('emailRequired') },
                            { type: 'email', message: t('emailInvalid') },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder={t('emailPlaceholder')} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={t('password')}
                        rules={[
                            { required: true, message: t('passwordRequired') },
                            { min: 6, message: t('passwordMinLength') },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder={t('passwordPlaceholder')} />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label={t('confirmPassword')}
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
                        <Input.Password prefix={<LockOutlined />} placeholder={t('confirmPasswordPlaceholder')} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading} className="auth-button">
                            {t('registerButton')}
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
    ];

    return (
        <div className="login-page">
            <div className="login-container">
                {/* Left side - Animation */}
                <div className="login-animation">
                    <div className="animation-wrapper">
                        <Lottie
                            animationData={loginAnimation}
                            loop={true}
                            autoplay={true}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>

                {/* Right side - Auth Form */}
                <div className="login-form-container">
                    <Card className="login-card" bordered={false}>
                        <div className="login-header">
                            <Title level={2} className="login-title">
                                {activeTab === 'login' ? t('loginTitle') : t('registerTitle')}
                            </Title>
                            <Text type="secondary" className="login-subtitle">
                                {activeTab === 'login' ? t('loginSubtitle') : t('registerSubtitle')}
                            </Text>
                        </div>

                        <Tabs
                            activeKey={activeTab}
                            onChange={setActiveTab}
                            items={tabItems}
                            centered
                            className="auth-tabs"
                        />

                        <Divider>{t('or')}</Divider>

                        <div className="social-login">
                            <Button block className="social-button" onClick={handleGoogleLogin}>
                                <img src={googleLogo} alt="Google" style={{ width: 20, height: 20, marginRight: 8 }} />
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
