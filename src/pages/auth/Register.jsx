import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Divider } from 'antd';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import registerAnimation from '~/assets/lottie/register-animation.json';
import googleLogo from '~/assets/svg/images/google-logo.png';
import './register.scss';

const { Title, Text } = Typography;

const RegisterPage = () => {
    const { t } = useTranslation('register');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // TODO: Replace with actual API call
            console.log('Register values:', values);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            message.success(t('registerSuccess'));
            navigate('/login');
        } catch {
            message.error(t('registerFailed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                {/* Left side - Animation */}
                <div className="register-animation">
                    <div className="animation-wrapper">
                        <Lottie
                            animationData={registerAnimation}
                            loop={true}
                            autoplay={true}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>

                {/* Right side - Register Form */}
                <div className="register-form-container">
                    <Card className="register-card" bordered={false}>
                        <div className="register-header">
                            <Title level={2} className="register-title">
                                {t('title')}
                            </Title>
                            <Text type="secondary" className="register-subtitle">
                                {t('subtitle')}
                            </Text>
                        </div>

                        <Form
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            layout="vertical"
                            size="large"
                            autoComplete="off"
                            className="register-form"
                        >
                            <Form.Item
                                name="fullName"
                                label={t('fullName')}
                                rules={[
                                    {
                                        required: true,
                                        message: t('fullNameRequired'),
                                    },
                                    {
                                        min: 2,
                                        message: t('fullNameMinLength'),
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder={t('fullNamePlaceholder')} />
                            </Form.Item>

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
                                name="phone"
                                label={t('phone')}
                                rules={[
                                    {
                                        required: true,
                                        message: t('phoneRequired'),
                                    },
                                    {
                                        pattern: /^[0-9]{10,11}$/,
                                        message: t('phoneInvalid'),
                                    },
                                ]}
                            >
                                <Input prefix={<PhoneOutlined />} placeholder={t('phonePlaceholder')} />
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
                                hasFeedback
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder={t('passwordPlaceholder')} />
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                label={t('confirmPassword')}
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: t('confirmPasswordRequired'),
                                    },
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
                                    prefix={<LockOutlined />}
                                    placeholder={t('confirmPasswordPlaceholder')}
                                />
                            </Form.Item>

                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value
                                                ? Promise.resolve()
                                                : Promise.reject(new Error(t('agreementRequired'))),
                                    },
                                ]}
                            >
                                <label className="agreement-checkbox">
                                    <input type="checkbox" />
                                    <span>
                                        {t('agreement')}{' '}
                                        <Link to="/terms" className="terms-link">
                                            {t('termsOfService')}
                                        </Link>{' '}
                                        {t('and')}{' '}
                                        <Link to="/privacy" className="terms-link">
                                            {t('privacyPolicy')}
                                        </Link>
                                    </span>
                                </label>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    loading={loading}
                                    className="register-button"
                                >
                                    {t('registerButton')}
                                </Button>
                            </Form.Item>

                            <Divider>{t('or')}</Divider>

                            <div className="social-register">
                                <Button block className="social-button">
                                    <img
                                        src={googleLogo}
                                        alt="Google"
                                        style={{ width: 20, height: 20, marginRight: 8 }}
                                    />
                                    {t('registerWithGoogle')}
                                </Button>
                            </div>

                            <div className="register-footer">
                                <Text type="secondary">
                                    {t('hasAccount')}{' '}
                                    <Link to="/login" className="login-link">
                                        {t('loginNow')}
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

export default RegisterPage;
