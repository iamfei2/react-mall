import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceContext } from "../../../contexts/ServiceContext";
import { LeftOutlined } from "@ant-design/icons";
import { Card, Row, Col, Typography, Divider, Button } from 'antd';
import './brandList.css';

const { Title, Text } = Typography;

const ProductGenreList = () => {
    const { id } = useParams();
    const { product: productService } = useContext(ServiceContext);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setProducts(productService.getProductList());
    }, [productService]);

    const filteredProducts = products.filter(item => item.genreId === Number(id));

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
            {/* 顶部导航栏 */}
            <div style={{
                position: "fixed",
                top: 0,
                width: "100%",
                zIndex: 10,
                background: "#1677ff",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
                <Button
                    type="link"
                    icon={<LeftOutlined style={{ color: "white" }} />}
                    onClick={handleClick}
                    style={{ color: "white" }}
                />
                <Title level={5} style={{
                    margin: 0,
                    flex: 1,
                    textAlign: "center",
                    color: "white",
                    fontWeight: 500
                }}>
                    商品列表
                </Title>
            </div>

            {/* 内容区域 */}
            <div style={{ paddingTop: "64px", padding: "16px" }}>
                {filteredProducts.length > 0 ? (
                    <Row gutter={[16, 16]}>
                        {filteredProducts.map((item, index) => (
                            <Col xs={12} sm={12} md={8} lg={8} xl={6} key={index}>
                                <Card
                                    hoverable
                                    style={{
                                        borderRadius: 12,
                                        overflow: "hidden",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                        height: "100%"
                                    }}
                                    cover={
                                        <div style={{
                                            height: 180,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "#fff"
                                        }}>
                                            <img
                                                alt={item.name}
                                                src={item.src}
                                                style={{
                                                    maxHeight: "100%",
                                                    maxWidth: "100%",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </div>
                                    }
                                    onClick={() => navigate('/productDetail/' + item.id)}
                                >
                                    <div>
                                        <Title level={5} style={{
                                            marginBottom: 4,
                                            color: "#333",
                                            fontSize: 15,
                                            height: 42,
                                            overflow: "hidden",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical"
                                        }}>
                                            {item.name}
                                        </Title>

                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 600,
                                            color: "#ff4d4f",
                                            display: "block",
                                            marginTop: 4
                                        }}>
                                            ¥{item.price}
                                        </Text>

                                        {item.originalPrice && (
                                            <Text delete style={{
                                                color: "#999",
                                                fontSize: 13,
                                                marginLeft: 8
                                            }}>
                                                ¥{item.originalPrice}
                                            </Text>
                                        )}

                                        <Divider style={{ margin: "10px 0" }} />

                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            {Math.floor(Math.random() * 1000) + 1}人已购买
                                        </Text>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Card
                        style={{
                            borderRadius: 12,
                            textAlign: "center",
                            padding: 40,
                            marginTop: 20,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                        }}
                    >
                        <img
                            alt="empty"
                            src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            style={{ width: 80, marginBottom: 20 }}
                        />
                        <Title level={4} style={{ color: "#999" }}>暂无商品</Title>
                        <Text type="secondary">此分类下还没有商品，去别处看看吧</Text>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default ProductGenreList;