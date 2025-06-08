import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceContext } from "../../../contexts/ServiceContext";
import { LeftOutlined } from "@ant-design/icons";
import { Card, Image, Typography, Button } from "antd";

const { Text } = Typography;

const BrandList = () => {
    const { brand: brandService } = useContext(ServiceContext);
    const [brand, setBrand] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setBrand(brandService.getBrandList());
    }, [brandService]);

    const handleClick = () => {
        navigate(-1); // 跳转到上一页
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
                    推荐品牌
                </div>
            </div>

            {/* 紧凑型内容区域 */}
            <div style={{
                padding: "12px",
                marginTop: "48px", // 顶部导航栏高度 
            }}>
                {brand.length === 0 ? (
                    <Card style={{
                        textAlign: "center",
                        padding: "20px 16px",
                        borderRadius: 8,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                    }}>
                        <Image
                            src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            preview={false}
                            style={{ width: 80, marginBottom: 12 }}
                        />
                        <Text style={{ color: "#999", fontSize: 14 }}>暂无品牌数据</Text>
                        <div style={{ marginTop: 16 }}>
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => window.location.reload()}
                                style={{ borderRadius: 16, padding: "0 16px" }}
                            >
                                重新加载
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "12px"
                    }}>
                        {brand.map((item, index) => (
                            <Card
                                key={index}
                                onClick={() => navigate('/mall/productBrandList/' + item.id)}
                                hoverable
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
                                bodyStyle={{ padding: "12px 8px" }}
                            >
                                <div style={{
                                    width: "100%",
                                    height: "80px",
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
                                            maxWidth: "80%",
                                            maxHeight: "70%",
                                            objectFit: "contain"
                                        }}
                                    />
                                </div>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        textAlign: "center",
                                        display: "block",
                                        fontWeight: 500,
                                        color: "#333"
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandList;