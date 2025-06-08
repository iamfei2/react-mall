import { useNavigate, useParams } from 'react-router-dom';
import { Button, Layout, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { ServiceContext } from "../../../contexts/ServiceContext";
import { HomeOutlined, LeftOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import styled from "styled-components";
import OrderService from '../../../service/OrderService';

const { Content } = Layout;

const ProductDetailContainer = styled.div`
    padding: 16px;
`;

const ProductDetail = () => {
    const { id } = useParams();
    const { product: productService, brand: brandService } = useContext(ServiceContext);
    const [product, setProduct] = useState(null); // 初始化为null而不是数组
    const [brand, setBrand] = useState(null); // 品牌状态
    const [selectedColor, setSelectedColor] = useState(null);

    const navigate = useNavigate();

    // 根据ID获取商品数据
    useEffect(() => {
        const products = productService.getProductList();
        const foundProduct = products.find(p => p.id === parseInt(id));
        if (foundProduct) {
            // 设置商品
            setProduct({
                ...foundProduct,
                colors: foundProduct.colors || ["蓝色", "粉色", "黄色", "绿色"]
            });
            setSelectedColor(foundProduct.colors?.[0] || "蓝色");

            // 获取品牌
            const brands = brandService.getBrandList();
            const foundBrand = brands.find(b => b.id === foundProduct.brandId);
            setBrand(foundBrand);
        } else {
            message.error('商品不存在');
            navigate('/');
        }
    }, [id, productService, brandService, navigate]);

    const handleClick = () => {
        navigate(-1); //跳转到上一页
    };

    const handleHomeOutlinedClick = () => {
        navigate("/mall/mallHome"); //跳转
    };

    const handleShoppingCartOutlinedClick = () => {
        navigate("/mall/mallShoppingCar"); //跳转
    };

    const handleBuyNowClick = () => {
        if (!product || !selectedColor) return;

        const productInfo = {
            product,
            selectedColor,
            selectedItems: [{
                id: product.id,
                name: product.name,
                description: product.title,
                price: product.price,
                originalPrice: product.originalPrice,
                quantity: 1,
                image: product.src
            }]
        };

        // 保存到localStorage
        localStorage.setItem('tempProductInfo', JSON.stringify(productInfo));

        // 跳转到创建订单页面
        navigate('/product/CreateOrder', { state: { productInfo } });
    };

    const handleAddToCarClick = () => {
        if (!product || !selectedColor) return;

        const productInfo = {
            id: product.id,
            name: product.name,
            description: selectedColor,
            price: product.price,
            originalPrice: product.originalPrice,
            quantity: 1,
            image: product.src
        };

        // 跳转到购物车页面并传递商品信息
        navigate('/mall/mallShoppingCar', { state: { productInfo } });
        message.success("成功添加至购物车");
    };

    if (!product) {
        return <div>加载中...</div>;
    }

    return (
        <ProductDetailContainer>
            <Layout>
                <Layout>
                    <Content>
                        <LeftOutlined
                            style={{
                                fontSize: '30px',
                                position: 'fixed',
                                top: '5px',
                                zIndex: 10,
                                cursor: 'pointer',
                            }}
                            onClick={handleClick}
                        />
                        <div style={{ border: '1px solid #eee', marginTop: '20px' }}>

                        </div>

                        <div style={{ marginLeft: "5%" }}>
                            <span style={{ fontSize: '20px' }}>{product.name}</span>
                            <br />
                            <span style={{ fontSize: '17px', color: "#666" }}>{product.title}</span>
                            <span style={{ fontSize: '20px', color: 'red', marginTop: '5px', display: 'block' }}>¥ {product.price}</span>
                            <br />
                            <span style={{ fontSize: '15px', color: "#666" }}>销量：{product.inventory} </span>
                            <span style={{ marginLeft: "15%", fontSize: '15px', color: "#666" }}>库存：{product.inventory} </span>
                            <span style={{ marginLeft: "15%", fontSize: '15px', color: "#666" }}>浏览量：{product.inventory} </span>
                        </div>
                        <hr />

                        <div style={{ textAlign: 'center', border: '1px solid #eee', width: "100%", marginTop: "2%" }}>
                            <span style={{ fontSize: '17px' }}>品牌信息</span>
                            <br />
                            {brand ? (
                                <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left', border: '1px solid #eee', margin: "2%" }} onClick={() => navigate('/mall/productBrandList/' + brand.id)}>

                                    <div style={{ flex: '1' }}>
                                        <span style={{ fontSize: '17px' }}>{brand.name}</span>
                                    </div>
                                </div>
                            ) : (
                                <p style={{ textAlign: 'center' }}>无品牌</p>
                            )}
                        </div>
                        <hr />

                        <div style={{ textAlign: 'center', border: '1px solid #eee', marginTop: "2%" }}>
                            <span style={{ fontSize: '17px' }}>图文详情</span>
                            <br />

                        </div>
                    </Content>

                    <div style={{ paddingBottom: '60px' }}>
                        <div style={footerStyle}>
                            <div style={iconContainerStyle}>
                                <div style={iconStyle} onClick={handleHomeOutlinedClick}>
                                    <HomeOutlined style={iconInnerStyle} />
                                    <span>首页</span>
                                </div>
                                <div style={iconStyle} onClick={handleShoppingCartOutlinedClick}>
                                    <ShoppingCartOutlined style={iconInnerStyle} />
                                    <span>购物车</span>
                                </div>
                            </div>
                            <div style={buttonContainerStyle}>
                                <Button type="primary" style={buyNowButtonStyle} onClick={handleBuyNowClick}>立即购买</Button>
                                <Button type="default" style={addToCartButtonStyle} onClick={handleAddToCarClick}>加入购物车</Button>
                            </div>
                        </div>
                    </div>
                </Layout>
            </Layout>
        </ProductDetailContainer>
    );
};

const footerStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'white',
    boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
    zIndex: 1000,
};

const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
};

const iconStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '20px',
    color: '#666',
};

const iconInnerStyle = {
    fontSize: '24px',
    marginBottom: '5px',
};

const buttonContainerStyle = {
    display: 'flex',
    alignItems: 'center',
};

const buyNowButtonStyle = {
    backgroundColor: '#ff7e29',
    borderColor: '#ff7e29',
    color: 'white',
    marginRight: '10px',
};

const addToCartButtonStyle = {
    backgroundColor: '#ff4d4f',
    borderColor: '#ff4d4f',
    color: 'white',
};

export default ProductDetail;