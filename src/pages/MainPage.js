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
        <Layout>
            <Sider>
                <SideMenu />
            </Sider>
            <Layout style={{ padding: '0 20px 0' }}>
                <Content
                    style={{
                        padding: 15,
                        margin: 0,
                        marginTop: 20,
                        maxHeight: "90%",
                        boxShadow: "0 0 5px #4285f4",
                        background: "#f8f9fa",
                        borderRadius: 10,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainPage;