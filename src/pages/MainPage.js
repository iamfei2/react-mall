import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import useLoginCheck from "../hooks/LoginCheck";
import SideMenu from "../components/SideMenu";
const { Content, Sider } = Layout;

const MainPage = () => {
    localStorage.clear();
    useLoginCheck();
    return (
        <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)' }}>
            <Sider
                width={280}
                style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
            >
                <SideMenu />
            </Sider>

            <Layout style={{ padding: '0 30px', background: 'transparent' }}>
                <Content
                    style={{
                        padding: 25,
                        margin: 0,
                        marginTop: 25,
                        height: "95vh",
                        background: 'rgba(255, 255, 255, 0.85)',
                        borderRadius: 20,
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        overflow: 'auto'
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainPage;