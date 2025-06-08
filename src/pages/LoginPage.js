import React, { useContext } from "react";
import { Alert, App, Button, Checkbox, Form, Input, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../contexts/ServiceContext";
import { UserOutlined, LockOutlined, ShoppingCartOutlined } from "@ant-design/icons";
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
                    if (currentUser.role.includes(2)) {
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
                background: "linear-gradient(135deg, #f0f9ff 0%, #e6f4ff 100%)",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* 背景装饰元素 */}
            <div style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(24, 144, 255, 0.1) 0%, rgba(24, 144, 255, 0.05) 100%)"
            }}></div>

            <div style={{
                position: "absolute",
                bottom: "-80px",
                left: "-80px",
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(24, 144, 255, 0.05) 0%, rgba(24, 144, 255, 0.1) 100%)"
            }}></div>

            <Col xs={24} sm={22} md={20} lg={16} xl={12}>
                <Form
                    name="basic"
                    style={{
                        width: "100%",
                        maxWidth: 480,
                        margin: "0 auto",
                        borderRadius: 16,
                        padding: 40,
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                        background: "rgba(255, 255, 255, 0.92)",
                        backdropFilter: "blur(8px)",
                        position: "relative",
                        zIndex: 2,
                        border: "1px solid rgba(24, 144, 255, 0.15)"
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <div style={{ textAlign: "center", marginBottom: 40 }}>
                        <div style={{
                            fontSize: 36,
                            fontWeight: 700,
                            color: blue[6],
                            marginBottom: 16,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 12
                        }}>
                            <ShoppingCartOutlined style={{ fontSize: 32 }} />
                            <span>淘马头电商平台</span>
                        </div>
                        <div style={{
                            fontSize: 16,
                            color: "rgba(0, 0, 0, 0.45)",
                            marginTop: 8
                        }}>
                            欢迎回来，请登录您的账号
                        </div>
                    </div>

                    <Alert
                        message={
                            <div style={{ textAlign: "center", fontWeight: 500 }}>
                                <div>管理员: admin / 123456</div>
                                <div>普通用户: Customer1 / Customer1</div>
                            </div>
                        }
                        type="info"
                        showIcon
                        style={{
                            marginBottom: 30,
                            borderRadius: 8,
                            background: "rgba(24, 144, 255, 0.05)",
                            border: "1px solid rgba(24, 144, 255, 0.15)"
                        }}
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
                            style={{
                                height: 48,
                                borderRadius: 8,
                                border: "1px solid rgba(0, 0, 0, 0.1)",
                                padding: "0 16px",
                                transition: "all 0.3s"
                            }}
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
                            style={{
                                height: 48,
                                borderRadius: 8,
                                border: "1px solid rgba(0, 0, 0, 0.1)",
                                padding: "0 16px",
                                transition: "all 0.3s"
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{ marginBottom: 24 }}
                    >
                        <Checkbox style={{ color: "rgba(0, 0, 0, 0.65)" }}>记住我</Checkbox>
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
                                fontWeight: 600,
                                background: "linear-gradient(135deg, #1890ff, #096dd9)",
                                border: "none",
                                borderRadius: 8,
                                boxShadow: "0 4px 10px rgba(24, 144, 255, 0.3)",
                                transition: "all 0.3s"
                            }}
                        >
                            登录
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Row justify="space-between">
                            <Button
                                type="link"
                                style={{
                                    color: blue[6],
                                    fontWeight: 500,
                                    padding: "0"
                                }}
                                onClick={() => navigate("/register")}
                            >
                                注册新账户
                            </Button>

                            <Button
                                type="link"
                                style={{
                                    color: blue[6],
                                    fontWeight: 500,
                                    padding: "0"
                                }}
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