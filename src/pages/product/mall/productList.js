import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceContext } from "../../../contexts/ServiceContext";
import { LeftOutlined, FireOutlined, StarOutlined } from "@ant-design/icons";
import { Card, Image, Typography, Button, Tag } from "antd";

const { Text, Title } = Typography;

const ProductList = () => {
    const { id } = useParams();
    const { product: productService } = useContext(ServiceContext);
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setProduct(productService.getProductList());
    }, [productService]);

    let items = [];
    let header;
    let icon;

    if (id === "1") {
        items = product.filter(item => item.isSeckill);
        header = "秒杀商品";
        icon = <FireOutlined style={{ color: "#ff4d4f", marginRight: 8 }} />;
    } else {
        items = product.filter(item => item.isRecommend);
        header = "推荐商品";
        icon = <StarOutlined style={{ color: "#faad14", marginRight: 8 }} />;
    }

    const handleClick = () => {
        navigate(-1); // 跳转到上一页
    };

    const handleProductClick = (productId) => {
        navigate('/productDetail/' + productId);
    };

    // 图片加载错误处理
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = "https://via.placeholder.com/150x150?text=图片加载失败";
    };

    return (
        <div style={{
            background: "#f8f9fa",
            minHeight: "100vh",
            paddingBottom: 20
        }}>
            {/* 顶部导航栏 */}
            <div style={{
                background: "#1677ff",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                height: "48px"
            }}>
                <Button
                    type="link"
                    icon={<LeftOutlined style={{ color: "white", fontSize: 16 }} />}
                    onClick={handleClick}
                    style={{ color: "white", padding: 0, height: "24px" }}
                />
                <div style={{
                    margin: 0,
                    color: "white",
                    flex: 1,
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: 500,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {icon}
                    {header}
                </div>
            </div>

            {/* 内容区域 */}
            <div style={{
                padding: "16px",
                marginTop: "48px", // 顶部导航栏高度 
            }}>
                <div style={{
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Text strong style={{ fontSize: 16 }}>
                        {items.length}件商品
                    </Text>
                    <Tag color={id === "1" ? "red" : "gold"}>
                        {id === "1" ? "限时秒杀" : "品质推荐"}
                    </Tag>
                </div>

                {items.length > 0 ? (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "12px"
                    }}>
                        {items.map((item, index) => (
                            <Card
                                key={index}
                                hoverable
                                onClick={() => handleProductClick(item.id)}
                                style={{
                                    borderRadius: 8,
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                                    overflow: "hidden",
                                    background: "white",
                                    margin: 0,
                                    padding: 0,
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    border: "none"
                                }}
                                bodyStyle={{ padding: "12px" }}
                            >
                                {/* 图片容器 - 固定宽高比 */}
                                <div style={{
                                    width: "100%",
                                    height: 0,
                                    paddingBottom: "100%", // 创建1:1比例
                                    position: "relative",
                                    marginBottom: 8,
                                    background: "#f9f9f9",
                                    borderRadius: 6
                                }}>
                                    <div style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 8
                                    }}>
                                        <img
                                            src={item.src}
                                            alt={item.name}
                                            onError={handleImageError}
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "100%",
                                                objectFit: "contain"
                                            }}
                                        />
                                    </div>
                                </div>

                                <Text
                                    strong
                                    style={{
                                        fontSize: 14,
                                        textAlign: "left",
                                        display: "block",
                                        color: "#333",
                                        marginBottom: 4,
                                        height: 36,
                                        overflow: "hidden",
                                        lineHeight: 1.4
                                    }}
                                >
                                    {item.name.length > 16 ? `${item.name.substring(0, 16)}...` : item.name}
                                </Text>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text strong style={{ fontSize: 16, color: "#ff4d4f" }}>
                                        ¥{item.price}
                                    </Text>
                                    {item.isSeckill && (
                                        <Tag color="red" style={{ margin: 0 }}>秒杀</Tag>
                                    )}
                                </div>
                                {item.isRecommend && (
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 4
                                    }}>
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            {item.sales || "100+"}人购买
                                        </Text>
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            评分: {item.rating || "4.8"}
                                        </Text>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card style={{
                        borderRadius: 8,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        textAlign: "center",
                        padding: "40px 16px"
                    }}>
                        <div style={{
                            width: "100%",
                            height: 0,
                            paddingBottom: "70%",
                            position: "relative",
                            margin: "0 auto 16px"
                        }}>
                            <div style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <div style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: "50%",
                                    background: "#f0f9ff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Text style={{ fontSize: 48, color: "#69c0ff" }}>
                                        {id === "1" ? <FireOutlined /> : <StarOutlined />}
                                    </Text>
                                </div>
                            </div>
                        </div>
                        <Text strong style={{ fontSize: 16, color: "#666" }}>
                            {id === "1" ? "暂无秒杀商品" : "暂无推荐商品"}
                        </Text>
                        <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
                            试试返回或浏览其他商品
                        </Text>
                        <div style={{ marginTop: 20 }}>
                            <Button
                                type={id === "1" ? "primary" : "default"}
                                onClick={handleClick}
                                style={{ marginRight: 12 }}
                            >
                                返回
                            </Button>
                            <Button
                                type="primary"
                                onClick={() => navigate('/')}
                            >
                                浏览更多
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default ProductList;