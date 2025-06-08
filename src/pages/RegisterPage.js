import React, { useContext } from "react";
import { App, Button, Form, Input, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../contexts/ServiceContext";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const RegisterPage = () => {
    const { message } = App.useApp();
    const { user: userService } = useContext(ServiceContext);
    const navigate = useNavigate();

    const isPasswordValid = (password) => {
        // 正则表达式，校验密码是否包含大小写字母和数字，且长度在8到16位之间
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

        // 使用正则表达式测试密码是否符合要求
        return passwordRegex.test(password);
    };

    const onFinish = (values) => {
        const { username, password, email } = values;

        // 校验密码复杂度
        if (!isPasswordValid(password)) {
            message.open({
                type: "error",
                content: "密码必须包含大小写字母和数字，且长度为8-16位",
            });
            return;
        }

        try {
            const user = userService.register(username, password, email);
            if (user) {
                message.open({
                    type: "success",
                    content: "注册成功",
                });
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                message.open({
                    type: "error",
                    content: "注册失败",
                });
            }
        } catch (error) {
            console.error("注册出错: ", error);
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
                    <div style={{ textAlign: "center", marginBottom: 32 }}>
                        <div style={{ fontSize: 32, fontWeight: 600, color: "#1890ff", marginBottom: 8 }}>
                            用户注册
                        </div>
                        <div style={{ fontSize: 16, color: "#666" }}>创建您的账户，开启旅程</div>
                    </div>

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
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "请输入有效的邮箱地址",
                            },
                            {
                                required: true,
                                message: "请输入邮箱",
                            }
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                            placeholder="邮箱"
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

                    <Form.Item style={{ marginTop: 32 }}>
                        <div style={{
                            color: "#f5222d",
                            fontSize: 14,
                            marginBottom: 16,
                            padding: "8px 16px",
                            background: "#fff1f0",
                            borderRadius: 4,
                            border: "1px solid #ffa39e"
                        }}>
                            密码必须包含大小写字母和数字，且长度为8-16位
                        </div>

                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            style={{
                                height: 48,
                                fontSize: 16,
                                background: "#1890ff",
                                borderColor: "#1890ff"
                            }}
                        >
                            注册
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Row justify="center">
                            <Button
                                type="link"
                                onClick={() => navigate("/login")}
                                style={{ color: "#1890ff", fontWeight: 500 }}
                            >
                                已有账号？立即登录
                            </Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default RegisterPage;