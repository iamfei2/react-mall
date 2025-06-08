import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Input, Carousel, Card, Space, Divider, Typography } from 'antd';
import {
    FireTwoTone,
    LikeTwoTone,
    TrophyTwoTone,
    RightOutlined,
    SearchOutlined
} from "@ant-design/icons";
import { ServiceContext } from "../../../contexts/ServiceContext";
import './brandList.css';

const { Header, Content } = Layout;
const { Text } = Typography;
const { Search } = Input;

const MallHome = () => {
    const { brand: brandService } = useContext(ServiceContext);
    const [brand, setBrand] = useState([]);

    const { product: productService } = useContext(ServiceContext);
    const [product, setProduct] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setBrand(brandService.getBrandList());
        setProduct(productService.getProductList());
    }, [ /* eslint-disable-line react-hooks/exhaustive-deps */]);

    const seckillItems = product.filter(item => item.isSeckill);
    const recommendItems = product.filter(item => item.isRecommend);

    const handleBrandListClick = () => navigate("/mall/brandList");
    const handleSeckillListClick = () => navigate("/mall/productList/1");
    const handleRecommendListClick = () => navigate("/mall/productList/2");

    const onSearch = (value, _e, info) => console.log(info?.source, value);

    return (
        <Layout style={{ background: "#f5f7fa" }}>
            <Header style={{
                background: "#1677ff",
                position: 'sticky',
                top: 0,
                zIndex: 10,
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: "0 10px"
            }}>
                <Search
                    prefix={<SearchOutlined />}
                    placeholder="搜索商品、品牌"
                    allowClear
                    onSearch={onSearch}
                    style={{
                        width: "100%",
                        maxWidth: 600,
                        borderRadius: 20,
                        overflow: "hidden"
                    }}
                />
            </Header>

            <Content style={{ margin: "64px 0", padding: "0 5%" }}>
                {/* 轮播图 */}
                <div style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    marginBottom: 24
                }}>
                    <Carousel autoplay dotPosition="top">
                        <div>
                            <img
                                src={require("../../../service/images/carousel1.png")}
                                alt="1"
                                style={{
                                    width: "100%",
                                    height: "180px",
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                        <div>
                            <img
                                src={require("../../../service/images/carousel2.png")}
                                alt="2"
                                style={{
                                    width: "100%",
                                    height: "180px",
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                        <div>
                            <img
                                src={require("../../../service/images/carousel3.png")}
                                alt="3"
                                style={{
                                    width: "100%",
                                    height: "180px",
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                        <div>
                            <img
                                src={require("../../../service/images/carousel4.png")}
                                alt="4"
                                style={{
                                    width: "100%",
                                    height: "180px",
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                    </Carousel>
                </div>

                {/* 品牌制造商直供区块 */}
                <Card
                    bordered={false}
                    bodyStyle={{ padding: "16px" }}
                    style={{
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        marginBottom: 24
                    }}
                >
                    <div
                        onClick={handleBrandListClick}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: "pointer",
                            marginBottom: 16
                        }}
                    >
                        <TrophyTwoTone twoToneColor="#1677ff" style={{ fontSize: 28 }} />
                        <Text strong style={{ marginLeft: 10, fontSize: 18, color: "#1677ff" }}>品牌制造商直供</Text>
                        <RightOutlined style={{ fontSize: '20px', marginLeft: "auto", color: "#1677ff" }} />
                    </div>

                    <div className="menu-container" >
                        {brand.slice(0, 6).map((item, index) => (
                            <Card
                                hoverable
                                key={index}
                                style={{
                                    height: "100%",
                                    borderRadius: 8,
                                    overflow: "hidden"
                                }}
                                bodyStyle={{ padding: "12px" }}
                                onClick={() => navigate('/mall/productBrandList/' + item.id)}
                            >
                                <div style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <img
                                        src={item.src}
                                        alt={item.name}
                                        style={{
                                            maxHeight: "100%",
                                            maxWidth: "100%",
                                            objectFit: "contain"
                                        }}
                                    />
                                </div>
                                <Text
                                    strong
                                    style={{
                                        display: "block",
                                        textAlign: "center",
                                        marginTop: 8,
                                        color: "#333"
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </Card>
                        ))}
                    </div>
                </Card>

                {/* 秒杀专区区块 */}
                <Card
                    bordered={false}
                    bodyStyle={{ padding: "16px" }}
                    style={{
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        marginBottom: 24
                    }}
                >
                    <div
                        onClick={handleSeckillListClick}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: "pointer",
                            marginBottom: 16
                        }}
                    >
                        <FireTwoTone twoToneColor="#ff4d4f" style={{ fontSize: 28 }} />
                        <Text strong style={{ marginLeft: 10, fontSize: 18, color: "#ff4d4f" }}>秒杀专区</Text>
                        <div style={{
                            marginLeft: "auto",
                            display: "flex",
                            alignItems: "center",
                            background: "#fff0f0",
                            padding: "4px 8px",
                            borderRadius: 16
                        }}>
                            <Text style={{
                                background: "#ff4d4f",
                                color: "white",
                                padding: "2px 6px",
                                borderRadius: 4,
                                fontSize: 12
                            }}>
                                11:00场
                            </Text>
                            <Text style={{ marginLeft: 8, fontSize: 12, color: "#ff4d4f" }}>
                                距结束 08:12:33
                            </Text>
                        </div>
                        <RightOutlined style={{ fontSize: '20px', marginLeft: 8, color: "#ff4d4f" }} />
                    </div>

                    <div className="menu-container" >
                        {seckillItems.slice(0, 4).map((item, index) => (
                            <Card
                                hoverable
                                key={index}
                                style={{
                                    height: "100%",
                                    borderRadius: 8,
                                    overflow: "hidden",
                                    position: "relative"
                                }}
                                bodyStyle={{ padding: "12px" }}
                                onClick={() => navigate('/productDetail/' + item.id)
                                }
                            >
                                <div style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    background: "#ff4d4f",
                                    color: "white",
                                    padding: "2px 8px",
                                    fontSize: 12,
                                    borderBottomLeftRadius: 8
                                }}>
                                    秒杀
                                </div>
                                <div style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <img
                                        src={item.src}
                                        alt={item.name}
                                        style={{
                                            maxHeight: "100%",
                                            maxWidth: "100%",
                                            objectFit: "contain"
                                        }}
                                    />
                                </div>
                                <Text
                                    style={{
                                        display: "block",
                                        marginTop: 8,
                                        fontSize: 14,
                                        color: "#333",
                                        height: 36,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        // display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical"
                                    }}
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    strong
                                    style={{
                                        display: "block",
                                        marginTop: 4,
                                        fontSize: 16,
                                        color: "#ff4d4f"
                                    }}
                                >
                                    ¥{item.price}
                                </Text>
                                <Text
                                    delete
                                    style={{
                                        fontSize: 12,
                                        color: "#999"
                                    }}
                                >
                                    ¥{Math.round(item.price * 1.5)}
                                </Text>
                            </Card>
                        ))}
                    </div>
                </Card>

                {/* 人气推荐区块 */}
                <Card
                    bordered={false}
                    bodyStyle={{ padding: "16px" }}
                    style={{
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                    }}
                >
                    <div
                        onClick={handleRecommendListClick}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: "pointer",
                            marginBottom: 16
                        }}
                    >
                        <LikeTwoTone twoToneColor="#f5222d" style={{ fontSize: 28 }} />
                        <Text strong style={{ marginLeft: 10, fontSize: 18, color: "#f5222d" }}>人气推荐</Text>
                        <RightOutlined style={{ fontSize: '20px', marginLeft: "auto", color: "#f5222d" }} />
                    </div>

                    <div className="product-list">
                        {recommendItems.slice(0, 3).map((item, index) => (
                            <Card
                                hoverable
                                key={index}
                                style={{
                                    marginBottom: 16,
                                    borderRadius: 8,
                                    overflow: "hidden"
                                }}
                                bodyStyle={{ padding: "16px" }}
                                onClick={() => navigate('/productDetail/' + item.id)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={item.src}
                                        alt={item.name}
                                        style={{
                                            width: 120,
                                            height: 120,
                                            objectFit: 'contain',
                                            marginRight: 16
                                        }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <Text
                                            strong
                                            style={{
                                                display: 'block',
                                                fontSize: 16,
                                                color: '#333',
                                                marginBottom: 8
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: '#666',
                                                display: 'block',
                                                marginBottom: 8
                                            }}
                                        >
                                            {item.title.substring(0, 60)}...
                                        </Text>
                                        <Text
                                            strong
                                            style={{
                                                fontSize: 16,
                                                color: '#f5222d',
                                                display: 'block'
                                            }}
                                        >
                                            ¥{item.price}
                                        </Text>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Card>
            </Content>
        </Layout>
    );
};

export default MallHome;