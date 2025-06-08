import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { LeftOutlined, CheckCircleOutlined } from '@ant-design/icons';

/* #5 */
const SubmitOrder = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const price = searchParams.get('price');
    const toPay = () => {
        navigate(`/product/pay?price=${price}`);
    };

    const tomall = () => {
        navigate('/mall/mallHome')
    }

    const toDetail = () => {
        // 获取参数
        const productInfo = JSON.parse(localStorage.getItem('tempProductInfo'));
        // 在跳转链接中传递参数
        window.location.href = `/product/OrderDetail?productInfo=${encodeURIComponent(JSON.stringify(productInfo))}`;
        console.log("productInfo");
        console.log(productInfo);

    };

    return (
        <div>
            {/* 第一行：支付成功 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>实付数￥{price}</span>
                <Button style={{ height: '40px', backgroundColor: 'red', color: 'white' }} onClick={toPay}>提交订单</Button>
            </div>
            {/* 第二行：返回图标 */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <LeftOutlined style={{ cursor: 'pointer' }} />
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                    <h1 style={{ fontSize: '20px', margin: '0' }}>支付成功</h1>
                </div>
            </div>

            {/* 内容容器 */}
            <div>
                <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '40px' }}>
                    <CheckCircleOutlined style={{ color: 'red', fontSize: '65px' }} />
                </div>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span style={{ fontSize: '15px' }}>支付成功</span>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <Button block style={{ height: '40px', backgroundColor: 'red', color: 'white' }} onClick={toDetail}>
                        查看订单
                    </Button>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <Button block style={{ height: '40px' }} onClick={tomall}>返回首页</Button>
                </div>

            </div>
        </div>
    );
};

export default SubmitOrder;
