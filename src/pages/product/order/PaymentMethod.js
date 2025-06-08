import React from 'react';
import { useNavigate,useLocation, useSearchParams } from 'react-router-dom';
import { Button } from 'antd';
import { LeftOutlined, AlipayCircleOutlined } from '@ant-design/icons';

/* #2 */
const PaymentMethod = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const price = searchParams.get('price') || 0;

  const handleContinuePayment = () => {
    navigate(`/product/paymentConfirmation?price=${price}`);
  };
  const handleGoBack = () => {
    navigate(`/product/pay?price=${price}`);
  };
  return (
    <div>
      {/* 头部容器，应用Flexbox布局 */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* 左侧的图标 */}
        <LeftOutlined onClick={handleGoBack}/>
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

        <div style={{ marginBottom: '15px' }}>
          <Button type="primary" block style={{  height: '40px' }}>
            打开支付宝APP付款
          </Button>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <Button block style={{ height: '40px' }} onClick={handleContinuePayment}>继续浏览器付款</Button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a>下载支付宝APP付款</a>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
