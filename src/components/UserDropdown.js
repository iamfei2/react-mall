import React, { useContext, useCallback } from "react";
import { App, Button, Dropdown } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { ServiceContext } from "../contexts/ServiceContext";

function UserDropdown() {
    const location = useLocation(); // 获取当前路由信息
    const { user: userService } = useContext(ServiceContext);
    const navigate = useNavigate();
    const { message } = App.useApp();

    // 确保所有Hooks都在条件判断之前调用
    const onLogout = useCallback(() => {
        message.open({
            type: "info",
            content: "注销成功，1秒后跳转至登录页面",
        });
        userService.logout();
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    }, [message, userService, navigate]);

    const onLogin = useCallback(() => {
        navigate("/login");
    }, [navigate]);



    const currentUser = userService.getCurrentUser();
    const navItems = [
        {
            key: "currentUser",
            label: <div style={{ textAlign: 'center' }}>{currentUser ? currentUser.username : '未登录'}</div>,
            disabled: true,
        },
        !currentUser
            ? {
                key: "login",
                label: (
                    <Button type="link" onClick={onLogin}>
                        登录
                    </Button>
                ),
            }
            : {
                key: "logout",
                label: (
                    <Button type="link" onClick={onLogout}>
                        注销
                    </Button>
                ),
            },
    ];

    return (
        <Dropdown menu={{ items: navItems }} style={{ textAlign: "center" }}>
            <Button>注销</Button>
        </Dropdown>
    );
}

export default UserDropdown;
