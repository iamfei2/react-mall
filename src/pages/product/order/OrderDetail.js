import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { TruckOutlined, EnvironmentFilled, ArrowLeftOutlined } from '@ant-design/icons';

const CreateOrderContainer = styled.div`
  background-color: #f7f7f8;
  padding: 12px 11px 80px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a3353;
`;

const OrderStatusPanel = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
  background: linear-gradient(90deg, #1890ff 5%, #096dd9 100%);
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  .icon-container {
    width: 36px;
    height: 36px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
  }

  .status-info {
    flex: 1;

    h3 {
      font-size: 18px;
      font-weight: 600;
      color: white;
      margin-bottom: 4px;
    }
  }
`;

const UserMsgPanel = styled.div`
  display: flex;
  padding: 16px;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid #f0f0f0;

  .icon-container {
    width: 36px;
    height: 36px;
    background-color: #e6f7ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
  }

  .address-info {
    flex: 1;
    line-height: 1.4;
    
    .contact {
      display: flex;
      align-items: center;
      margin-bottom: 6px;
      
      .name {
        font-size: 16px;
        font-weight: 500;
        color: #1a3353;
        margin-right: 12px;
      }
      
      .phone {
        font-size: 14px;
        color: #666;
      }
    }
    
    .address {
      font-size: 14px;
      color: #666;
      line-height: 1.4;
    }
  }
`;

const GoodsPanel = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid #f0f0f0;

  .pic {
    width: 80px;
    height: 80px;
    margin-right: 16px;
    border-radius: 6px;
    overflow: hidden;
    background-color: #fafafa;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      vertical-align: middle;
    }
  }

  .info {
    flex: 1;

    .name {
      font-size: 16px;
      color: #1a3353;
      font-weight: 500;
      margin-bottom: 6px;
    }

    .desc {
      font-size: 12px;
      color: #999;
      margin-bottom: 8px;
    }

    .price-row {
      display: flex;
      align-items: center;
      
      .current-price {
        color: #cf4444;
        font-size: 16px;
        font-weight: 500;
        margin-right: 10px;
      }
      
      .original-price {
        color: #999;
        font-size: 12px;
        text-decoration: line-through;
      }
    }
  }

  .count {
    font-size: 15px;
    color: #666;
    text-align: right;
    min-width: 30px;
  }
`;

const InfoCard = styled.div`
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid #f0f0f0;

  .info-row {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    font-size: 14px;
    color: #666;
    border-bottom: 1px solid #f5f5f5;
    
    &:last-child {
      border-bottom: none;
    }
    
    .label {
      color: #666;
      font-weight: normal;
    }
    
    .value {
      color: #1a3353;
      font-weight: 500;
    }
  }
`;

const PriceCard = styled.div`
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid #f0f0f0;

  .price-row {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    color: #333;
    padding: 12px 0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .label {
      font-weight: 500;
    }
    
    .value {
      color: #cf4444;
      font-weight: bold;
      font-size: 18px;
    }
  }
`;

const OrderDetailPage = () => {
  const location = useLocation();
  let product;
  let selectedColor;
  let selectedItems;

  const productInfo = JSON.parse(localStorage.getItem('tempProductInfo'));
  if (productInfo?.product) product = productInfo.product;
  if (productInfo?.selectedColor) selectedColor = productInfo.selectedColor;
  if (productInfo?.selectedItems) selectedItems = productInfo.selectedItems;

  const handleBack = () => {
    window.history.back();
  };

  const totalPrice = selectedItems?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

  return (
      <>
        <CreateOrderContainer>
          <Header>
            <ArrowLeftOutlined style={{ fontSize: "24px", cursor: "pointer" }} onClick={handleBack} />
            <Title>订单详情</Title>
            <div style={{ width: "24px" }}></div>
          </Header>

          <OrderStatusPanel>
            <div className="icon-container">
              <TruckOutlined style={{ color: "white", fontSize: "20px" }} />
            </div>
            <div className="status-info">
              <h3>等待发货</h3>
            </div>
          </OrderStatusPanel>

          <UserMsgPanel>
            <div className="icon-container">
              <EnvironmentFilled style={{ color: "#1890ff", fontSize: "18px" }} />
            </div>
            <div className="address-info">
              <div className="contact">
                <div className="name">aaa</div>
                <div className="phone">12345678910</div>
              </div>
              <div className="address">天堂</div>
            </div>
          </UserMsgPanel>

          {selectedItems.length > 0 ? (
              selectedItems.map(item => (
                  <GoodsPanel key={item.product?.id || 'fallback-key'}>
                    <div className="pic"></div>
                    <div className="info">
                      <div className="name">{item.product?.name || '商品名称'}</div>
                      {item.selectedColor && (
                          <div className="desc">{item.selectedColor}</div>
                      )}
                      <div className="price-row">
                        <div className="price">¥{item.product?.price || 0}</div>
                        <div className="original-price">¥{item.product?.originalPrice || 0}</div>
                      </div>
                    </div>
                    <div className="count">x{item.quantity}</div>
                  </GoodsPanel>
              ))
          ) : product && (
              <GoodsPanel>
                <div className="pic">

                </div>
                <div className="info">
                  <div className="name">{product.name}</div>
                  {selectedColor && (
                      <div className="desc">{selectedColor}</div>
                  )}
                  <div className="price-row">
                    <div className="current-price">￥{product.price}</div>
                    <div className="original-price">￥{product.originalPrice}</div>
                  </div>
                </div>
                <div className="count">x{product.quantity || 1}</div>
              </GoodsPanel>
          )}

          <InfoCard>
            <div className="info-row">
              <div className="label">总优惠</div>
              <div className="value">-￥1100</div>
            </div>
            <div className="info-row">
              <div className="label">配送方式</div>
              <div className="value">顺丰快递</div>
            </div>
            <div className="info-row">
              <div className="label">订单编号</div>
              <div className="value">23432924315890923832</div>
            </div>
            <div className="info-row">
              <div className="label">提交时间</div>
              <div className="value">2024-6-1 13:28:00</div>
            </div>
            <div className="info-row">
              <div className="label">支付方式</div>
              <div className="value">支付宝支付</div>
            </div>
          </InfoCard>

          <PriceCard>
            <div className="price-row">
              <div className="label">商品总计</div>
              <div className="value">￥{totalPrice === 0 ? 4899 : totalPrice}</div>
            </div>
          </PriceCard>
        </CreateOrderContainer>
      </>
  );
};

export default OrderDetailPage;
