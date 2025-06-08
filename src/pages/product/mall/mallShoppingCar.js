import React, { useState, useEffect } from "react";
import { Card, Button, Image, InputNumber, Checkbox, Badge, Typography, Divider, Tooltip } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css';

const { Text, Title } = Typography;

const MallShoppingCar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 定义购物车项的数据
    const [cartItems, setCartItems] = useState(() => {
        // 尝试从本地存储加载购物车数据
        const savedCart = localStorage.getItem('shoppingCart');
        return savedCart ? JSON.parse(savedCart) : [
            {
                id: 1,
                name: '耐克（NIKE）JORDAN官方...',
                description: '160白色/沙丘红/龙虾红/帆...',
                price: 849,
                quantity: 1,
                image: '/firstshoe.jpg',
                isChecked: true,
            },
            {
                id: 2,
                name: '耐克（NIKE）官方G.T.CUT...',
                description: '004浅烟灰/尘光子色/暗灰/...',
                price: 559,
                quantity: 1,
                image: '/secondshoe.jpg',
                isChecked: true,
            },
        ];
    });

    // 当购物车变化时保存到本地存储
    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
    }, [cartItems]);

    // 当从商品详情页跳转过来时添加新商品
    useEffect(() => {
        if (location.state && location.state.productInfo) {
            addNewItem(location.state.productInfo);
        }
    }, [location.state]);

    const addNewItem = (productInfo) => {
        const { product, selectedColor } = productInfo;

        // 检查是否已存在相同商品
        const existingItemIndex = cartItems.findIndex(item =>
            item.name === product.name && item.description === selectedColor
        );

        if (existingItemIndex !== -1) {
            // 如果已存在，增加数量
            const updatedItems = [...cartItems];
            updatedItems[existingItemIndex].quantity += 1;
            setCartItems(updatedItems);
        } else {
            // 如果不存在，添加新商品
            const newCartItem = {
                id: Date.now(), // 使用时间戳作为唯一ID
                name: product.name,
                description: selectedColor,
                price: parseFloat(product.price.replace('￥', '')),
                quantity: 1,
                image: product.images[selectedColor] || product.defaultImage,
                isChecked: true,
                originalPrice: product.originalPrice,
            };
            setCartItems([...cartItems, newCartItem]);
        }

        // 清除传递的状态，避免重复添加
        navigate(location.pathname, { replace: true, state: {} });
    };

    const deleteItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const clearItem = () => {
        setCartItems([]);
    }

    const updateQuantity = (id, value) => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: value } : item));
    };

    const handleCheckboxChange = (id) => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, isChecked: !item.isChecked } : item));
    };

    const formatNumber = (value) => {
        return String(value).replace(/[^0-9]/g, '');
    };

    const goToCheckout = () => {
        const selectedItems = cartItems.filter(item => item.isChecked);
        navigate("/product/CreateOrder", { state: { selectedItems } });
    };

    // 计算总金额
    const totalAmount = cartItems.filter(item => item.isChecked)
        .reduce((total, item) => total + item.price * item.quantity, 0);

    // 计算选中商品数量
    const selectedCount = cartItems.filter(item => item.isChecked).length;

    // 计算商品总数
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="shopping-cart-page" style={{ background: "#f5f7fa", minHeight: "100vh" }}>
            {/* 顶部导航栏 */}
            <div style={{
                background: "#1677ff",
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
                <Button
                    type="link"
                    onClick={() => navigate(-1)}
                    style={{ color: "white" }}
                >
                    返回
                </Button>

                <Title level={4} style={{ margin: 0, color: "white" }}>购物车</Title>

                <Tooltip title="购物车">
                    <Badge count={cartItemCount} style={{ backgroundColor: '#ff4d4f' }}>
                        <ShoppingCartOutlined style={{ color: "white", fontSize: 20 }} />
                    </Badge>
                </Tooltip>
            </div>

            {cartItems.length === 0 ? (
                <div style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    marginTop: "20px"
                }}>
                    <Image
                        src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        preview={false}
                        style={{ width: 120, marginBottom: 20 }}
                    />
                    <Title level={4} style={{ color: "#999" }}>购物车是空的</Title>
                    <Text type="secondary">快去添加心仪的商品吧</Text>
                    <div style={{ marginTop: 20 }}>
                        <Button
                            type="primary"
                            onClick={() => navigate('/mall')}
                            style={{ borderRadius: 20, padding: "0 24px" }}
                        >
                            去逛逛
                        </Button>
                    </div>
                </div>
            ) : (
                <div style={{ padding: "16px" }}>
                    {/* 购物车商品列表 */}
                    <Card
                        style={{
                            borderRadius: 12,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                            marginBottom: 20
                        }}
                    >
                        {cartItems.map(item => (
                            <div key={item.id}>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "16px 0",
                                    position: "relative"
                                }}>
                                    <Checkbox
                                        checked={item.isChecked}
                                        onChange={() => handleCheckboxChange(item.id)}
                                        style={{ marginRight: 12 }}
                                    />

                                    <Image
                                        width={100}
                                        height={100}
                                        src={item.image}
                                        style={{ borderRadius: 8, objectFit: "cover" }}
                                    />

                                    <div style={{ flex: 1, marginLeft: 16 }}>
                                        <Text strong style={{ fontSize: 14 }}>{item.name}</Text>
                                        <Text type="secondary" style={{ display: "block", marginTop: 4, fontSize: 12 }}>
                                            {item.description}
                                        </Text>

                                        <div style={{ marginTop: 8 }}>
                                            <Text strong style={{ color: "#ff4d4f", fontSize: 16 }}>
                                                ¥{item.price}
                                            </Text>

                                            {item.originalPrice && (
                                                <Text delete style={{ color: "#999", marginLeft: 8, fontSize: 12 }}>
                                                    ¥{item.originalPrice}
                                                </Text>
                                            )}
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                                            <Text style={{ marginRight: 10 }}>数量：</Text>
                                            <InputNumber
                                                min={1}
                                                max={999}
                                                value={item.quantity}
                                                onChange={(value) => updateQuantity(item.id, value)}
                                                formatter={formatNumber}
                                                parser={formatNumber}
                                                style={{ width: 80 }}
                                            />

                                            <Button
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => deleteItem(item.id)}
                                                style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Divider style={{ margin: 0 }} />
                            </div>
                        ))}
                    </Card>

                    {/* 结算栏 */}
                    <Card
                        style={{
                            borderRadius: 12,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                            position: "sticky",
                            bottom: 0
                        }}
                    >
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <div>
                                <Checkbox checked={selectedCount === cartItems.length && cartItems.length > 0}
                                    onChange={() => {
                                        const allChecked = selectedCount === cartItems.length;
                                        setCartItems(cartItems.map(item => ({ ...item, isChecked: !allChecked })));
                                    }}
                                >
                                    全选
                                </Checkbox>

                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={clearItem}
                                    style={{ marginLeft: 16 }}
                                >
                                    清空
                                </Button>
                            </div>

                            <div style={{ textAlign: "right" }}>
                                <Text style={{ marginRight: 16 }}>
                                    已选商品: <Text strong>{selectedCount}</Text> 件
                                </Text>
                                <Text strong style={{ fontSize: 18, color: "#ff4d4f" }}>
                                    合计: ¥{totalAmount.toFixed(2)}
                                </Text>

                                <Button
                                    type="primary"
                                    onClick={goToCheckout}
                                    style={{
                                        marginLeft: 16,
                                        background: "#ff4d4f",
                                        borderColor: "#ff4d4f",
                                        borderRadius: 20,
                                        padding: "0 24px",
                                        height: 40
                                    }}
                                    disabled={selectedCount === 0}
                                >
                                    去结算
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default MallShoppingCar;