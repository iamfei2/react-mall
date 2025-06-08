import React from 'react';
import { useNavigate,useLocation  } from 'react-router-dom';
import { Button, Radio } from 'antd';
import { LeftOutlined, AlipayOutlined, WechatOutlined } from '@ant-design/icons';

/* 优化后的支付页面 */
const Pay = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const price = searchParams.get('price') || '0';

    const toPaymentMethod = () => {
        navigate(`/product/paymentMethod?price=${price}`);
    };
    const handleGoBack = () => {
        navigate(`/product/submitOrder?price=${price}`);
    };

    return (
        <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '16px' }}>
            {/* 头部导航 */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                <div style={{ cursor: 'pointer' }}>
                    <LeftOutlined
                        onClick={handleGoBack}
                        style={{ fontSize: '20px', color: '#1890ff' }}
                    />
                </div>
                <h1 style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    margin: '0 auto',
                    color: '#1a3353',
                    transform: 'translateX(-10px)'
                }}>
                    支付
                </h1>
            </div>

            {/* 支付金额区域 */}
            <div style={{
                background: '#fff',
                borderRadius: '12px',
                marginTop: '30px',
                padding: '30px 20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>
                    支付金额
                </div>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#cf4444' }}>
                    ¥{price}
                </div>
            </div>

            {/* 支付方式选择 */}
            <div style={{
                background: '#fff',
                borderRadius: '12px',
                marginTop: '20px',
                padding: '20px 16px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
                <Radio.Group name="radiogroup" defaultValue={1} style={{ width: '100%' }}>
                    {/* 支付宝支付 */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px 0',
                        borderBottom: '1px solid #f0f0f0'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                background: '#1890ff',
                                borderRadius: '6px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: '12px'
                            }}>
                                <AlipayOutlined style={{ color: 'white', fontSize: '24px' }} />
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: 500 }}>支付宝支付</div>
                        </div>
                        <Radio value={1} style={{ transform: 'scale(1.2)' }}></Radio>
                    </div>

                    {/* 微信支付 */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px 0',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                background: '#09aa58',
                                borderRadius: '6px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: '12px'
                            }}>
                                <WechatOutlined style={{ color: 'white', fontSize: '24px' }} />
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: 500 }}>微信支付</div>
                        </div>
                        <Radio value={2} style={{ transform: 'scale(1.2)' }}></Radio>
                    </div>
                </Radio.Group>
            </div>

            {/* 支付按钮 */}
            <div style={{ marginTop: '30px' }}>
                <Button
                    block
                    type="primary"
                    size="large"
                    style={{
                        height: '50px',
                        backgroundColor: '#1890ff',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: 500,
                        boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
                        transition: 'all 0.2s ease'
                    }}
                    onClick={toPaymentMethod}
                >
                    确认支付
                </Button>
            </div>
        </div>
    );
};

export default Pay;
