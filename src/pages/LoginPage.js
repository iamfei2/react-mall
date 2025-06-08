import React, { useContext } from "react";
import { Alert, App, Button, Checkbox, Form, Input, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../contexts/ServiceContext";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { blue, red } from "@ant-design/colors";

const LoginPage = () => {
    const { message } = App.useApp();
    const { user: userService } = useContext(ServiceContext);
    const navigate = useNavigate();

    const onFinish = (values) => {
        try {
            const user = userService.login(
                values.username,
                values.password,
                values.remember
            );
            if (user) {
                const currentUser = userService.getCurrentUser();
                message.open({
                    type: "success",
                    content: "登录成功",
                });
                setTimeout(() => {
                    if (currentUser.role.includes(4)) {
                        navigate("/mall/mallhome");
                    } else {
                        navigate("/main");
                    }
                }, 1000);
            } else {
                message.open({
                    type: "error",
                    content: "登录失败",
                });
            }
        } catch (error) {
            console.error("登录出错: ", error);
        }
    };

    return (
        <Row
            justify="center"
            align="middle"
            style={{
                minHeight: "100vh",
                background: "#f0f2f5",
                backgroundImage: "linear-gradient(135deg, #e6f7ff 0%, #f0f2f5 100%)",
            }}
        >
            <Col xs={24} sm={22} md={20} lg={16} xl={12}>
                <Form
                    name="basic"
                    style={{
                        width: "100%",
                        maxWidth: 600,
                        margin: "0 auto",
                        borderRadius: 12,
                        padding: 40,
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                        background: "#fff",
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <div style={{ textAlign: "center", marginBottom: 40 }}>
                        <div style={{
                            fontSize: 32,
                            fontWeight: 600,
                            color: blue.primary,
                            marginBottom: 8
                        }}>
                            电商平台系统
                        </div>
                        <div style={{
                            fontSize: 16,
                            color: "#666",
                            marginBottom: 24
                        }}>
                            欢迎登录，请填写您的账户信息
                        </div>
                    </div>

                    <Alert
                        message={
                            <div style={{ textAlign: "center" }}>
                                <div>管理员: admin / 123456</div>
                                <div>普通用户: Customer1 / Customer1</div>
                            </div>
                        }
                        type="info"
                        showIcon
                        style={{ marginBottom: 30 }}
                    />

                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "请输入用户名",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                            placeholder="用户名"
                            style={{ height: 48 }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                            placeholder="密码"
                            style={{ height: 48 }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{ marginBottom: 24 }}
                    >
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            style={{
                                height: 48,
                                fontSize: 16,
                                background: blue.primary,
                                borderColor: blue.primary
                            }}
                        >
                            登录
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Row justify="space-between">
                            <Button
                                type="link"
                                style={{ color: blue.primary }}
                                onClick={() => navigate("/register")}
                            >
                                注册新账户
                            </Button>

                            <Button
                                type="link"
                                style={{ color: blue.primary }}
                                onClick={() => message.info("请联系管理员重置密码")}
                            >
                                忘记密码?
                            </Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default LoginPage;