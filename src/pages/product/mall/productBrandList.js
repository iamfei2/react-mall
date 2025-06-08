import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceContext } from "../../../contexts/ServiceContext";
import { LeftOutlined } from "@ant-design/icons";
import { Card, Image, Typography, Button, Divider } from "antd";

const { Text, Title } = Typography;

const ProductBrandList = () => {
    const { id } = useParams();
    const { product: productService, brand: brandService } = useContext(ServiceContext);
    const [product, setProduct] = useState([]);
    const [brand, setBrand] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setBrand(brandService.getBrandList());
        setProduct(productService.getProductList());
    }, [brandService, productService]);

    const filteredProducts = product.filter(item => item.brandId === Number(id));
    const filteredBrand = brand.filter(item => item.id === Number(id));

    const handleClick = () => {
        navigate(-1); // 跳转到上一页
    };

    // 处理商品点击
    const handleProductClick = (productId) => {
        navigate('/productDetail/' + productId);
    };

    return (
        <div style={{
            background: "#f8f9fa",
            minHeight: "100vh",
            paddingBottom: 20
        }}>
            {/* 紧凑型顶部导航栏 */}
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
                    fontWeight: 500
                }}>
                    {filteredBrand.length > 0 ? filteredBrand[0].name : "品牌详情"}
                </div>
            </div>

            {/* 内容区域 */}
            <div style={{
                padding: "16px",
                marginTop: "48px", // 顶部导航栏高度 
            }}>
                {/* 品牌信息展示 */}
                {filteredBrand.length > 0 ? (
                    <Card
                        style={{
                            borderRadius: 8,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                            marginBottom: 16
                        }}
                        bodyStyle={{ padding: 16 }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Image
                                src={filteredBrand[0].src}
                                alt={filteredBrand[0].name}
                                style={{
                                    width: 80,
                                    height: 80,
                                    objectFit: "contain",
                                    marginRight: 16,
                                    borderRadius: 8
                                }}
                            />
                            <div>
                                <Title level={5} style={{ margin: 0 }}>{filteredBrand[0].name}</Title>
                                <Text type="secondary" style={{ fontSize: 14 }}>{filteredBrand[0].tagline || "知名品牌"}</Text>
                            </div>
                        </div>

                        <Divider style={{ margin: "16px 0" }} />

                        <div>
                            <Title level={5} style={{ marginBottom: 8 }}>品牌故事</Title>
                            <Text style={{ color: "#666", lineHeight: 1.6 }}>
                                {filteredBrand[0].story || "该品牌致力于提供高品质产品..."}
                            </Text>
                        </div>
                    </Card>
                ) : (
                    <Card style={{
                        borderRadius: 8,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        textAlign: "center",
                        padding: "20px 16px",
                        marginBottom: 16
                    }}>
                        <Text strong style={{ color: "#999" }}>未找到品牌信息</Text>
                    </Card>
                )}

                {/* 品牌商品展示 */}
                <Title level={5} style={{ marginBottom: 12, paddingLeft: 8 }}>
                    品牌商品 ({filteredProducts.length})
                </Title>

                {filteredProducts.length > 0 ? (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "12px"
                    }}>
                        {filteredProducts.map((item, index) => (
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
                                <div style={{
                                    width: "100%",
                                    height: "140px",
                                    position: "relative",
                                    marginBottom: 8,
                                    background: "#f9f9f9",
                                    borderRadius: 6,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Image
                                        src={item.src}
                                        alt={item.name}
                                        preview={false}
                                        style={{
                                            maxWidth: "90%",
                                            maxHeight: "90%",
                                            objectFit: "contain"
                                        }}
                                    />
                                </div>
                                <Text
                                    strong
                                    style={{
                                        fontSize: 13,
                                        textAlign: "left",
                                        display: "block",
                                        color: "#333",
                                        marginBottom: 4,
                                        height: 36,
                                        overflow: "hidden"
                                    }}
                                >
                                    {item.name.length > 16 ? `${item.name.substring(0, 16)}...` : item.name}
                                </Text>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text strong style={{ fontSize: 15, color: "#ff4d4f" }}>
                                        ¥{item.price}
                                    </Text>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {item.sales || "热销"}
                                    </Text>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card style={{
                        borderRadius: 8,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        textAlign: "center",
                        padding: "20px 16px"
                    }}>
                        <Image
                            src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            preview={false}
                            style={{ width: 80, marginBottom: 12 }}
                        />
                        <Text strong style={{ color: "#999" }}>暂无商品数据</Text>
                        <div style={{ marginTop: 16 }}>
                            <Button
                                size="small"
                                onClick={() => window.location.reload()}
                                style={{ borderRadius: 16, padding: "0 16px" }}
                            >
                                重新加载
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default ProductBrandList;