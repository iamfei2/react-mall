import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { AlipayCircleOutlined } from '@ant-design/icons';

/* #4 */
const PaySuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const price = searchParams.get('price'); 
    const toSubmitOrder = () => {
        navigate(`/product/submitOrder?price=${price}`);
    };

    return (
        <div>
            {/* 头部容器，应用Flexbox布局 */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                    <AlipayCircleOutlined style={{ color: 'blue', fontSize: '48px', marginBottom: '5px', marginTop: '5px' }} />
                </div>
            </div>

            {/* 内容容器 */}
            <div>

                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <span style={{ fontSize: '15px', color: 'blue' }}>支付成功</span>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '500px' }}>
                    <span style={{ fontSize: '30px', fontWeight: 'bold' }}>￥{price}元</span>
                </div>


                <div style={{ textAlign: 'center', }}>
                    <Button style={{ borderColor: 'blue', width: '250px', color: 'blue' }} onClick={toSubmitOrder}>完成</Button>
                </div>
            </div>
        </div>
    );
};

export default PaySuccess;
