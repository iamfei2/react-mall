import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Image, Button, Drawer, Radio, message, Carousel } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, HomeOutlined, ShoppingOutlined } from "@ant-design/icons";
import OrderService from '../../../service/OrderService'; // 确保路径正确


const ProductDetailContainer = styled.div`
    padding: 16px;
`;

const ProductImageWrapper = styled.div`
    position: relative;
    text-align: center;
`;

const ProductImage = styled(Image)`
    width: 100%;
    height: auto;
    object-fit: cover;
`;

const BackButton = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    z-index:5;
`;

const ProductInfo = styled.div`
    margin-top: 16px;
`;

const ProductPrice = styled.div`
    color: #ff4d4f;
    font-size: 24px;
    font-weight: bold;
`;

const ProductDiscount = styled.div`
    background: #ff4d4f;
    color: white;
    padding: 8px;
    text-align: center;
    border-radius: 5px;
    margin: 8px 0;
`;

const ProductTitle = styled.h2`
    font-size: 20px;
    margin: 8px 0;
`;

const ProductDescription = styled.p`
    font-size: 14px;
    color: #666;
`;

const ProductButtons = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 95%;
    background: #fff;
    padding: 8px 16px;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
`;

const IconButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    padding:3px;
`;

const ActionButton = styled.button`
    flex: 1;
    padding: 15px;
    margin: 0 0;
    font-size: 16px;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    background-color: #fcba08;

    &:first-child {
        background-color: #fc9d16;

    }

    &:last-child {
        background-color: #ff4d4f;
    }
`;

const ColorOption = styled(Radio.Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    margin: 8px;
`;

const ProductDetail = () => {
    // 钩子函数，用于页面跳转
    const navigate = useNavigate();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [isBuying, setIsBuying] = useState(false);
    const carouselRef = useRef(null);



    const product = {
        id:0,
        images: {
            "蓝色": "https://picture.gptkong.com/20240609/2328f4bafbade14502aa3d6f012723383c.jpg",
            "粉色": "https://picture.gptkong.com/20240609/21538fd7470cc14ab8b22cd7718499ab5e.jpg",
            "黄色": "https://picture.gptkong.com/20240609/22433d280413424d32b5da869dc90cee84.jpg",
            "绿色": "https://picture.gptkong.com/20240609/2242ec354ba9cb474e9112fc0d21ea7812.jpg",
        },
        defaultImage: "https://picture.gptkong.com/20240609/21538fd7470cc14ab8b22cd7718499ab5e.jpg", // 默认图片 URL
        name: "Apple/苹果 iPhone 15",
        price: "￥4899",
        originalPrice: "￥5999",
        discount: "官方立减1100元",
        description: "可享3期免息，约1999.67元*3期",
        shippingInfo: "付款后4天内发货",
        returnPolicy: "极速退款，7天无理由退换，价保服务",
        colors: ["蓝色", "粉色", "黄色", "绿色"],
    };

    const handleAddToCart = () => {
        setIsBuying(false);
        setIsDrawerVisible(true);
    };

    const handleBuyNow = () => {
        setIsBuying(true);
        setIsDrawerVisible(true);
    };

    // const handleOk = () => {
    //     if (selectedColor) {
    //         if (isBuying) {
    //             // 跳转到创建订单界面，并传递商品信息和选定颜色
    //             // 使用 Link 组件传递数据
    //             const productInfo = { product: product, selectedColor: selectedColor };
    //             // 设置参数到 Local Storage
    //             localStorage.setItem('tempProductInfo', JSON.stringify(productInfo));
    //             // 使用 window.location.href 跳转，并将商品信息和选定颜色编码为 URL 参数
    //             window.location.href = `/product/CreateOrder?productInfo=${encodeURIComponent(JSON.stringify(productInfo))}`;
    //             //navigate("/CreateOrder", { state: { productInfo } });
    //
    //             const orderService = new OrderService();
    //             const newOrder = {
    //                 productName: product.name,
    //                 customerName: 'Customer1', // 这里需要替换为实际的客户名
    //                 price: product.price,
    //                 amount: 1,
    //                 status: 0,
    //                 storeName: 'Apple Store',
    //                 image: '/iphone.png',
    //                 selectedColor,
    //             };
    //             const order = orderService.addNewOrder(newOrder);
    //             message.success("订单已创建");
    //
    //         } else {
    //             // 构建商品信息
    //             const productInfo = {
    //                 product: product,
    //                 selectedColor: selectedColor.target.value,
    //             };
    //             console.log(productInfo);
    //             // 将信息传到购物车页面
    //             navigate('/mall/mallShoppingCar', { state: { productInfo } });
    //             // 提示成功添加至购物车
    //             message.success("成功添加至购物车");
    //         }
    //         setIsDrawerVisible(false);
    //     } else {
    //         message.warning("请选择颜色");
    //     }
    // };

    // 在handleOk函数中
    const handleOk = () => {
        if (!selectedColor) {
            message.warning("请选择颜色");
            return;
        }

        // 确保 product 对象包含必要的 id 属性
        const productWithId = {
            id: product.id || Date.now(),
            name: product.name || "未命名商品",
            price: product.price || 0,
            // 添加其他必要属性...
            ...product
        };

        // 构建商品数据
        const productData = {
            product: productWithId,
            selectedColor: selectedColor,
            quantity: 1
        };

        if (isBuying) {
            // 跳转到创建订单界面
            localStorage.setItem('tempProductInfo', JSON.stringify(productData));
            navigate('/product/CreateOrder', { state: { productInfo: productData } });
        } else {
            // 添加到购物车
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            // 检查是否已存在相同商品
            const existingIndex = cart.findIndex(item =>
                item.product.id === productData.product.id &&
                item.selectedColor === productData.selectedColor
            );

            if (existingIndex !== -1) {
                // 增加数量
                cart[existingIndex].quantity += 1;
            } else {
                // 添加新商品
                cart.push(productData);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            message.success("成功添加至购物车");
        }

        setIsDrawerVisible(false);
    };

    const handleCancel = () => {
        setIsDrawerVisible(false);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
        // 手动触发轮播图切换到对应颜色的图片
        // const index = product.colors.indexOf(color);
        // if (carouselRef.current) {
        //     carouselRef.current.goTo(index);
        // }
    };

    return (
        <ProductDetailContainer>
            <ProductImageWrapper>
                <BackButton onClick={() => window.history.back()}>←</BackButton>
                <Carousel ref={carouselRef}>
                    {product.colors.map((color) => (
                        <div key={color}>
                            <ProductImage src={product.images[color]} alt={color} />
                        </div>
                    ))}
                </Carousel>
            </ProductImageWrapper>
            <ProductInfo>
                <ProductDiscount>{product.discount}</ProductDiscount>
                <ProductPrice>
                    {product.price} <span style={{ textDecoration: "line-through", color: "#999" }}>{product.originalPrice}</span>
                </ProductPrice>
                <ProductTitle>{product.name}</ProductTitle>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductDescription>{product.shippingInfo}</ProductDescription>
                <ProductDescription>{product.returnPolicy}</ProductDescription>
                <div>
                    {product.colors.map((color) => (
                        <Button
                            key={color}
                            style={{ marginRight: "8px", marginTop: "8px" }}
                            onClick={() => handleColorChange(color)}
                        >
                            {color}
                        </Button>
                    ))}
                </div>
            </ProductInfo>
            <ProductButtons>
                <IconButton onClick={() => window.location.href = '/mall/mallHome'}>
                    <HomeOutlined />
                    <div style={{ fontSize: 12 }}>首页</div>
                </IconButton>
                <IconButton onClick={() => window.location.href = '/mall/mallShoppingCar'}>
                    <ShoppingCartOutlined />
                    <div style={{ fontSize: 12 }}>购物车</div>
                </IconButton>
                <ActionButton onClick={handleAddToCart}>加入购物车</ActionButton>
                <ActionButton onClick={handleBuyNow}>立即购买</ActionButton>

            </ProductButtons>

            <Drawer
                title="选择颜色"
                placement="bottom"
                closable={false}
                onClose={handleCancel}
                open={isDrawerVisible}
                height={300}
            >
                <Radio.Group
                    onChange={handleColorChange}
                    value={selectedColor}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    {product.colors.map((color) => (
                        <ColorOption key={color} value={color}>
                            {color}
                        </ColorOption>
                    ))}
                </Radio.Group>

                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px' }}>
                    <Button type="primary" onClick={handleOk}>
                        确定
                    </Button>
                    <Button onClick={handleCancel}>
                        取消
                    </Button>
                </div>

            </Drawer>
        </ProductDetailContainer>
    );
};

export default ProductDetail;
