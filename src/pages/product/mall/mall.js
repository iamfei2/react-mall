//商城的根目录 //by ly
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import  { React } from 'react';
import { MenuOutlined, UserOutlined, HomeOutlined, ShoppingCartOutlined, } from '@ant-design/icons';
const { Content, Footer } = Layout;

let menuItem = [
    {
        key: `mallHome`,
        icon: <HomeOutlined />,
        label: `首页`,
    },
    {
        key: `mallGenre`,
        icon: <MenuOutlined />,
        label: `分类`,
    },
    {
        key: `mallShoppingCar`,
        icon: <ShoppingCartOutlined />,
        label: `购物车`,

    },
    {
        key: `mallUser`,
        icon: <UserOutlined />,
        label: `我的`,
    },
];


export default function Mall() {
    const navigate = useNavigate();


    const handleMenuClick = (e) => {
        console.log(e);
        navigate(e.key); //跳转到相应页面
    };

    return (
        <>
            <Layout style={{ height: '100%' }}>
                <Layout>
                    <Layout>
                        <Content style={{ flex: 1, paddingBottom: '60px' }}>
                            <Outlet />
                        </Content>
                        <Footer style={{ height: '9%', textAlign: 'center', position: 'fixed', bottom: 0, width: '100%', padding: 0 }}>
                            <Menu
                                mode="horizontal"
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                items={menuItem.map(item => ({
                                    ...item,
                                    label: (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-20px' }}>
                                            {/*{item.icon}*/}
                                            <span>{item.label}</span>
                                        </div>
                                    )
                                }))}
                                onClick={handleMenuClick}
                            />
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
}
