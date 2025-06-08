import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { ServiceContext } from "../../../contexts/ServiceContext";
import { Card, Image, Typography, Button } from "antd"; // 添加了 Button 导入
import './MallGenreChildren.css';

const { Text } = Typography;

const MallGenreChildren = () => {
    const { mallGenre: mallGenreService } = useContext(ServiceContext);
    const [mallGenre, setMallGenre] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setMallGenre(mallGenreService.getMallGenre());
    }, [mallGenreService]);

    let location = useLocation();
    const pathParts = location.pathname.split('/');
    const lastPathPart = pathParts[pathParts.length - 1];

    const selectedGenre = mallGenre.find(item => item.frontName === lastPathPart);

    // 生成随机价格和销量数据用于演示
    const getRandomPrice = () => Math.floor(Math.random() * 900 + 100);
    const getRandomSales = () => Math.floor(Math.random() * 1000) + 50;

    return (
        <div style={{ background: "linear-gradient(to bottom, #f5f7fa, #e6f7ff)", minHeight: "100vh" }}>
            <div style={{
                background: "#1677ff",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
                <Text strong style={{ color: "white", fontSize: 16 }}>
                    {selectedGenre?.name || "商品分类"}
                </Text>
            </div>

            {selectedGenre ? (
                <div className="menu-container">
                    {selectedGenre.children ? (
                        selectedGenre.children.map((child, index) => (
                            <div
                                key={index}
                                className="menu-item"
                                onClick={() => navigate('/mall/productGenreList/' + child.id)}
                            >
                                <div className="menu-item-image-container">
                                    <Image
                                        src={child.src}
                                        alt={child.name}
                                        className="menu-item-image"
                                        preview={false}
                                    />
                                </div>
                                <Text className="menu-item-name">{child.name}</Text>
                                <Text strong className="menu-item-price">
                                    ¥{getRandomPrice()}
                                </Text>
                                <Text className="menu-item-sales">
                                    {getRandomSales()}人已购
                                </Text>
                            </div>
                        ))
                    ) : (
                        <Card style={{
                            width: "100%",
                            margin: "0 16px",
                            textAlign: "center",
                            borderRadius: 12,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                        }}>
                            <Text type="secondary">暂无子分类</Text>
                        </Card>
                    )}
                </div>
            ) : (
                <Card style={{
                    margin: "20px 16px",
                    textAlign: "center",
                    borderRadius: 12,
                    padding: "40px 20px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                }}>
                    <Text strong style={{ color: "#999" }}>
                        路径 "{lastPathPart}" 未找到匹配的类别
                    </Text>
                    <Button
                        type="primary"
                        style={{ marginTop: 20 }}
                        onClick={() => navigate(-1)}
                    >
                        返回上一级
                    </Button>
                </Card>
            )}
        </div>
    );
};

export default MallGenreChildren;