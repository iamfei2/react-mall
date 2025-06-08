import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, Badge } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import {
    ShoppingOutlined,
    FireOutlined,
    GiftOutlined,
    TagOutlined,
    HomeOutlined,
    HistoryOutlined,
    StarOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { ServiceContext } from "../../../contexts/ServiceContext";

const { Header, Content, Sider } = Layout;

const MallGenre = () => {
    const { mallGenre: mallGenreService } = useContext(ServiceContext);
    const [mallGenre, setMallGenre] = useState([]);
    const [activeKey, setActiveKey] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const genres = mallGenreService.getMallGenre();
        setMallGenre(genres);
        if (genres.length > 0 && !activeKey) {
            setActiveKey(genres[0].frontName);
        }
    }, [mallGenreService, activeKey]);

    const menuItems = [
        ...mallGenre.map(item => ({
            key: item.frontName,
            label: item.name,
            icon: item.icon || <TagOutlined style={{ fontSize: 18 }} />,
            badge: item.new ? <Badge dot color="#ff4d4f" /> : null
        })),
    ];

    const handleMenuClick = (e) => {
        setActiveKey(e.key);
        navigate(e.key);
    };

    return (
        <Layout style={{
            minHeight: '100vh',
            background: "#f8fafc"
        }}>
            {/* 顶部标题栏 - 现代风格 */}
            <Header style={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                color: '#333',
                fontSize: 18,
                fontWeight: 600,
                height: 64,
                padding: '0 24px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                borderBottom: '1px solid #f0f0f0'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        width: 4,
                        height: 20,
                        background: '#1677ff',
                        marginRight: 12,
                        borderRadius: 2
                    }} />
                    <span>商品分类</span>
                </div>

                <SettingOutlined style={{
                    fontSize: 20,
                    color: '#666',
                    cursor: 'pointer'
                }} />
            </Header>

            <Layout style={{
                marginTop: 0,
                height: 'calc(100vh - 64px)',
                background: 'transparent'
            }}>
                {/* 左侧分类菜单 - 现代风格 */}
                <Sider
                    width={240}
                    style={{
                        background: 'white',
                        boxShadow: '2px 0 10px rgba(0,0,0,0.03)',
                        zIndex: 1,
                        borderRight: '1px solid #f0f0f0'
                    }}
                >
                    <Menu
                        mode="inline"
                        selectedKeys={[activeKey]}
                        style={{
                            height: '100%',
                            padding: '16px 0',
                            background: 'transparent',
                            borderRight: 0
                        }}
                        onClick={handleMenuClick}
                        items={menuItems.map(item => ({
                            ...item,
                            label: (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingRight: 8
                                }}>
                                    <span>{item.label}</span>
                                    {item.badge}
                                </div>
                            )
                        }))}
                        theme="light"
                    />
                </Sider>

                {/* 右侧内容区域 */}
                <Layout style={{
                    background: 'transparent',
                    padding: '16px 16px 16px 0'
                }}>
                    <Content style={{
                        overflowY: 'auto',
                        height: '100%',
                        borderRadius: 16,
                        background: 'white',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                    }}>
                        <div style={{
                            padding: 24,
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