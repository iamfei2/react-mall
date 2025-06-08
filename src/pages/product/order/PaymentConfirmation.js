import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { LeftOutlined, AlipayCircleOutlined, UserOutlined } from '@ant-design/icons';

/* #3 */
const PaymentConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams =new URLSearchParams(location.search);
    const price = searchParams.get('price');

    const handleGoBack = () => {
      navigate(`/product/paymentMethod?price=${price}`);
    };
    const toSuccessPage = () => {
        navigate(`/product/paySuccess?price=${price}`);
      };
    return (
        <div>
            {/* 头部容器，应用Flexbox布局 */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* 左侧的图标 */}
                <LeftOutlined  onClick={handleGoBack}/>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                    <AlipayCircleOutlined style={{ color: 'blue', fontSize: '26px' }} />
                    <h1 style={{ fontSize: '24px', margin: '0 0 0 8px' }}>支付宝付款</h1>
                </div>
            </div>

            {/* 内容容器 */}
            <div>
                <div style={{ textAlign: 'center', fontSize: '20px',marginTop:'30px' }}>
                    <span>xxx的商品订单</span>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <span style={{ fontSize: '30px', fontWeight: 'bold' }}>￥{price}</span>
                </div>

                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '15px' }}>支付宝账号</span>
                    <span style={{ fontSize: '15px' }}>
                        <UserOutlined style={{ marginRight: '5px' }} />
                        148****948@qq.com {'>'}
                    </span>
                </div>

                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '15px' }}>付款方式</span>
                    <span style={{ fontSize: '15px' }}>用户余额 {'>'}</span>
                </div>



                <div style={{ marginBottom: '10px' }}>
                    <Button type="primary" block style={{ height: '40px' }} onClick={toSuccessPage}>
                        确认付款
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirmation;
