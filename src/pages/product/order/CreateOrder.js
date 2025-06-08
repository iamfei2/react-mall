import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { EnvironmentFilled, ArrowLeftOutlined, RightOutlined } from '@ant-design/icons';

const CreateOrderContainer = styled.div`
  background-color: #f8fafc;
  padding: 12px 16px 80px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding-top: 10px;
  position: relative;

  .back-btn {
    position: absolute;
    left: 0;
    font-size: 20px;
    color: #1890ff;
    cursor: pointer;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  color: #1a3353;
  font-weight: 600;
  width: 100%;
  text-align: center;
`;

const UserMsgPanel = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid #f0f0f0;

  .location-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background-color: #e6f7ff;
    border-radius: 50%;
    margin-right: 16px;

    span {
      color: #1890ff;
      font-size: 18px;
    }
  }

  .address-info {
    flex: 1;
    line-height: 1.4;

    .name-phone {
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

  .edit-btn {
    padding-left: 8px;

    span {
      color: #999;
      font-size: 16px;
    }
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid #f0f0f0;
  margin-bottom: 16px;
`;

const GoodsPanel = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;

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
      line-height: 1.3;
    }

    .desc {
      font-size: 12px;
      color: #999;
      margin-bottom: 8px;
      line-height: 1.4;
    }

    .price-row {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .price {
        color: #cf4444;
        font-size: 16px;
        font-weight: 500;
      }

      .original-price {
        color: #999;
        font-size: 12px;
        text-decoration: line-through;
      }
    }
  }

  .count {
    min-width: 30px;
    font-size: 15px;
    color: #666;
    text-align: right;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }

  .label {
    color: #666;
  }

  .value {
    color: #1a3353;
    font-weight: 500;
  }

  &.price {
    font-size: 15px;

    .label {
      font-size: 15px;
      color: #333;
      font-weight: 500;
    }

    .value {
      color: #cf4444;
      font-size: 18px;
      font-weight: bold;
    }
  }
`;

const PayPanel = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: #fff;
  border-top: 1px solid #eee;
  padding: 0 16px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);

  .left {
    font-size: 14px;

    .label {
      font-size: 14px;
      color: #666;
    }

    .price {
      color: #cf4444;
      font-weight: bold;
      font-size: 18px;
      margin-left: 8px;
    }
  }

  .right {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  min-width: 120px;
  height: 42px;
  background: linear-gradient(90deg, #1890ff 5%, #096dd9 100%);
  border: none;
  border-radius: 21px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  line-height: 42px;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CreateOrderPage = () => {
  // const location = useLocation();
  // let product;
  // let selectedColor;

  //
  // const searchParams = new URLSearchParams(location.search);
  // const productInfo = searchParams.get("productInfo");
  //
  // if (productInfo) {
  //   const parsedProductInfo = JSON.parse(decodeURIComponent(productInfo));
  //   product = parsedProductInfo.product;
  //   selectedColor = parsedProductInfo.selectedColor.target.value;
  // }

  // 修改获取商品数据的方式
  const location = useLocation();
  const productInfo = location.state?.productInfo || JSON.parse(localStorage.getItem('tempProductInfo') || "{}");
  const selectedItems = location.state?.selectedItems || [];
  // 使用解构赋值确保安全访问
  const {
    product = {},
    selectedColor = "",
    quantity = 1
  } = productInfo;

  // 计算总价时使用安全访问
  const finalPrice = product.price ? product.price * quantity : 0;

  const handleBack = () => {
    window.history.back();
  };

  // // 完全还原原代码的价格计算逻辑
  // const totalPrice = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // const finalPrice = totalPrice === 0 ? 4899 : totalPrice;

  // 点击支付按钮时将商品信息存入localStorage
  const handlePayClick = () => {
    const productInfo = {
      product,
      selectedColor,
      selectedItems
    };
    localStorage.setItem('tempProductInfo', JSON.stringify(productInfo));
  };

  return (
      <>
        <CreateOrderContainer>
          <Header>
            <div className="back-btn" onClick={handleBack}>
              <ArrowLeftOutlined />
            </div>
            <Title>创建订单</Title>
          </Header>

          <UserMsgPanel>
            <div className="location-icon">
              <EnvironmentFilled />
            </div>
            <div className="address-info">
              <div className="name-phone">
                <div className="name">张先生</div>
                <div className="phone">138****5678</div>
              </div>
              <div className="address">上海市浦东新区张江高科技园区亮景路188号汇智国际商业中心A座1203室</div>
            </div>
            <div className="edit-btn">
              <RightOutlined />
            </div>
          </UserMsgPanel>

          <Card>
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
                      <div className="price">¥{product.price}</div>
                      <div className="original-price">¥{product.originalPrice}</div>
                    </div>
                  </div>
                  <div className="count">x{product.quantity || 1}</div>
                </GoodsPanel>
            )}
          </Card>

          <Card>
            <InfoRow>
              <div className="label">配送方式</div>
              <div className="value">顺丰快递</div>
            </InfoRow>
            <InfoRow>
              <div className="label">配送费用</div>
              <div className="value">¥0.00</div>
            </InfoRow>
            <InfoRow>
              <div className="label">优惠券</div>
              <div className="value">-¥10.00</div>
            </InfoRow>
            <InfoRow>
              <div className="label">会员折扣</div>
              <div className="value">-¥20.00</div>
            </InfoRow>
          </Card>

          <Card>
            <InfoRow className="price">
              <div className="label">订单金额</div>
              <div className="value">¥{finalPrice}</div>
            </InfoRow>
            <InfoRow className="price">
              <div className="label">优惠金额</div>
              <div className="value">-¥30.00</div>
            </InfoRow>
            <InfoRow className="price">
              <div className="label">实付金额</div>
              <div className="value total">¥{finalPrice - 30}</div>
            </InfoRow>
          </Card>
        </CreateOrderContainer>

        <PayPanel>
          <div className="left">
            <span className="label">实付:</span>
            <span className="price">¥{finalPrice - 30}</span>
          </div>
          <div className="right">
            <StyledLink
                to={`/product/pay?price=${finalPrice}`}
                onClick={handlePayClick}
            >
              去支付
            </StyledLink>
          </div>
        </PayPanel>
      </>
  );
};

export default CreateOrderPage;
