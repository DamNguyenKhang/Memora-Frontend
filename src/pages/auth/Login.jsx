import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Divider } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import loginAnimation from '~/assets/lottie/login-animation.json';
import googleLogo from '~/assets/images/google-logo.png';
import './login.scss';

const { Title, Text } = Typography;

const AuthPage = () => {
    const { t } = useTranslation('login');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // TODO: Replace with actual API call
            console.log('Login values:', values);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            message.success(t('loginSuccess'));
            navigate('/');
        } catch {
            message.error(t('loginFailed'));
        } finally {
            setLoading(false);
        }
    };

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

                {/* Right side - Login Form */}
                <div className="login-form-container">
                    <Card className="login-card" bordered={false}>
                        <div className="login-header">
                            <Title level={2} className="login-title">
                                {t('title')}
                            </Title>
                            <Text type="secondary" className="login-subtitle">
                                {t('subtitle')}
                            </Text>
                        </div>

                        <Form
                            form={form}
                            name="login"
                            onFinish={onFinish}
                            layout="vertical"
                            size="large"
                            autoComplete="off"
                            className="login-form"
                        >
                            <Form.Item
                                name="email"
                                label={t('email')}
                                rules={[
                                    {
                                        required: true,
                                        message: t('emailRequired'),
                                    },
                                    {
                                        type: 'email',
                                        message: t('emailInvalid'),
                                    },
                                ]}
                            >
                                <Input prefix={<MailOutlined />} placeholder={t('emailPlaceholder')} />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label={t('password')}
                                rules={[
                                    {
                                        required: true,
                                        message: t('passwordRequired'),
                                    },
                                    {
                                        min: 6,
                                        message: t('passwordMinLength'),
                                    },
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder={t('passwordPlaceholder')} />
                            </Form.Item>

                            <div className="login-options">
                                <Link to="/forgot-password" className="forgot-password">
                                    {t('forgotPassword')}
                                </Link>
                            </div>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    loading={loading}
                                    className="login-button"
                                >
                                    {t('loginButton')}
                                </Button>
                            </Form.Item>

                            <Divider>{t('or')}</Divider>

                            <div className="social-login">
                                <Button block className="social-button">
                                    <img
                                        src={googleLogo}
                                        alt="Google"
                                        style={{ width: 20, height: 20, marginRight: 8 }}
                                    />
                                    {t('loginWithGoogle')}
                                </Button>
                            </div>

                            <div className="login-footer">
                                <Text type="secondary">
                                    {t('noAccount')}{' '}
                                    <Link to="/register" className="register-link">
                                        {t('registerNow')}
                                    </Link>
                                </Text>
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
