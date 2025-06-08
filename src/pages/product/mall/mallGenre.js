import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { ServiceContext } from "../../../contexts/ServiceContext";
const { Header, Content, Sider } = Layout;

const MallGenre = () => {
    const { mallGenre: mallGenreService } = useContext(ServiceContext);
    const [mallGenre, setMallGenre] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setMallGenre(mallGenreService.getMallGenre());
    }, [mallGenreService]);

    const menuItem = mallGenre.map(item => ({
        key: item.frontName,
        label: item.name,
        icon: item.icon || null
    }));

    const handleMenuClick = (e) => {
        navigate(e.key);
    };

    return (
        <Layout style={{
            minHeight: '100vh',
            background: "#f5f7fa"
        }}>
            {/* 顶部标题栏 */}
            <Header style={{
                position: 'fixed',
                zIndex: 10,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1677ff',
                color: 'white',
                fontSize: 16,
                fontWeight: 500,
                height: 64,
                lineHeight: '64px',
                padding: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                商品分类
            </Header>

            <Layout style={{ marginTop: 64, height: 'calc(100vh - 64px)' }}>
                {/* 左侧分类菜单 */}
                <Sider
                    width={200}
                    style={{
                        background: 'white',
                        boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
                        zIndex: 1
                    }}
                >
                    <Menu
                        mode="inline"
                        style={{
                            height: '100%',
                            paddingTop: 8,
                            background: 'transparent',
                            borderRight: 0
                        }}
                        onClick={handleMenuClick}
                        items={menuItem}
                        theme="light"
                    />
                </Sider>

                {/* 右侧内容区域 */}
                <Layout style={{ background: 'transparent' }}>
                    <Content style={{
                        padding: 16,
                        overflowY: 'auto',
                        height: '100%'
                    }}>
                        <div style={{
                            background: 'white',
                            padding: 16,
                            borderRadius: 12,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            minHeight: '100%'
                        }}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default MallGenre;