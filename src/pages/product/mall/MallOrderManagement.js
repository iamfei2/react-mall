import React, { useState, useEffect } from "react";
import { Button, Divider, Input, Card, Image, Modal, Tag, Badge, Row, Col, Typography } from "antd";
import { LeftOutlined, SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import OrderService from '../../../service/OrderService';

const { Text } = Typography;

const MallOrderManagement = () => {
    // 创建 OrderService 的实例
    const orderService = new OrderService();
    // 储存订单数据
    const [orderItems, setOrderItems] = useState([])
    // 这个变量存储搜索订单输入框中输入的内容
    const [searchTerm, setSearchTerm] = useState('');
    // 钩子函数，用于页面跳转
    const navigate = useNavigate();
    // 控制确认对话框是否的可见的变量
    const [isModalVisible, setIsModalVisible] = useState(false);
    // 存储即将删除的订单Id
    const [currentOrderId, setCurrentOrderId] = useState(null);

    // 返回按钮的处理函数，返回个人信息页面
    const returnToPersonalInformation = () => {
        navigate('/mall/mallUser');
    }

    // 处理搜索订单输入框中内容变化的函数
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    // 过滤后的数据
    const filteredOrderItems = orderItems.filter(item =>
        item.storeName.includes(searchTerm) || item.productName.includes(searchTerm)
    );

    // 页面初始化时处理数据
    useEffect(() => {
        const fetchData = async () => {
            const orderData = await orderService.getOrders();
            const mappedOrders = orderData.map(order => ({
                id: order.id,
                storeName: order.storeName,
                status: order.status === 0 ? '未发货' : '已发货', // 假设0表示交易成功，1表示交易关闭
                productName: order.productName,
                amount: order.amount,
                price: parseFloat(order.price.replace('￥', '')), // 转换价格为数字
                image: order.image
            }));
            setOrderItems(mappedOrders);
        };
        fetchData();
    }, [])

    // 处理删除订单的逻辑
    const showDeleteConfirm = (orderId) => {
        setCurrentOrderId(orderId);
        setIsModalVisible(true);
    }

    // 对话框点击确认的处理逻辑
    const handleOk = async () => {
        setOrderItems(orderItems.filter(order => order.id !== currentOrderId));
        setIsModalVisible(false);
    }

    // 对话框点击取消的处理逻辑
    const handleCancel = () => {
        setIsModalVisible(false);
    }

    // 处理按钮点击事件
    const handleAction = (action, item) => {
        switch (action) {
            case 'delete':
                showDeleteConfirm(item.id);
                break;
            case 'evaluate':
                console.log('追加评价', item);
                break;
            case 'rebuy':
                console.log('再买一单', item);
                break;
            default:
                break;
        }
    }

    return (
        <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
            {/* 顶部导航栏 */}
            <div style={{
                background: "#1677ff",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
                <Button
                    type="link"
                    icon={<LeftOutlined style={{ color: "white" }} />}
                    onClick={returnToPersonalInformation}
                    style={{ color: "white" }}
                />

                <div style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    background: "white",
                    borderRadius: 20,
                    padding: "4px 12px",
                    margin: "0 12px"
                }}>
                    <SearchOutlined style={{ color: "#999", marginRight: 8 }} />
                    <Input
                        placeholder="搜索我的订单"
                        bordered={false}
                        style={{ flex: 1 }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div style={{ padding: "16px" }}>
                {filteredOrderItems.length === 0 ? (
                    <Card style={{
                        borderRadius: 12,
                        textAlign: "center",
                        padding: "40px 20px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                    }}>
                        <CloseCircleOutlined style={{ fontSize: 48, color: "#999", marginBottom: 16 }} />
                        <Text style={{ color: "#666", fontSize: 16, display: "block" }}>暂无符合条件的订单</Text>
                        <Text type="secondary" style={{ display: "block", marginTop: 8 }}>尝试修改搜索条件或查看全部订单</Text>
                    </Card>
                ) : (
                    filteredOrderItems.map(item => (
                        <Card
                            key={item.id}
                            style={{
                                borderRadius: 12,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                marginBottom: 16,
                                overflow: "hidden",
                                transition: "all 0.3s ease",
                                border: "none"
                            }}
                            hoverable
                        >
                            <div style={{
                                borderBottom: "1px solid #f0f0f0",
                                padding: "12px 16px",
                                background: "#fafafa"
                            }}>
                                <Badge.Ribbon
                                    text={item.status === '未发货' ? "待发货" : "已发货"}
                                    color={item.status === '未发货' ? "orange" : "#52c41a"}
                                    placement="start"
                                >
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <Text strong style={{ fontSize: 16 }}>{item.storeName}</Text>
                                        <Tag color={item.status === '未发货' ? "orange" : "#52c41a"} style={{ marginLeft: 8 }}>
                                            {item.status}
                                        </Tag>
                                    </div>
                                </Badge.Ribbon>
                            </div>

                            <div style={{ padding: "0 16px" }}>
                                <div style={{ display: "flex", alignItems: "center", padding: "16px 0" }}>
                                    <Image
                                        width={80}
                                        height={80}
                                        src={item.image}
                                        style={{ borderRadius: 8, objectFit: "cover" }}
                                    />

                                    <div style={{ flex: 1, marginLeft: 16 }}>
                                        <Text style={{ fontSize: 14, display: "block", fontWeight: 500 }}>{item.productName}</Text>
                                        <Text type="secondary" style={{ fontSize: 12, display: "block", margin: "4px 0" }}>
                                            数量: {item.amount}
                                        </Text>
                                    </div>

                                    <div style={{ textAlign: "right" }}>
                                        <Text strong style={{ fontSize: 16, color: "#ff4d4f" }}>
                                            ¥{item.price.toFixed(2)}
                                        </Text>
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                borderTop: "1px solid #f0f0f0",
                                padding: "12px 16px",
                                background: "#fafafa"
                            }}>
                                <Row justify="space-between" align="middle">
                                    <Col>
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            订单号: {item.id}
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Button.Group>
                                            <Button
                                                danger
                                                size="small"
                                                onClick={() => handleAction('delete', item)}
                                                style={{ borderRadius: 4 }}
                                            >
                                                删除订单
                                            </Button>
                                            <Button
                                                size="small"
                                                onClick={() => handleAction('evaluate', item)}
                                                style={{ borderRadius: 4, margin: "0 8px" }}
                                            >
                                                追加评价
                                            </Button>
                                            <Button
                                                type="primary"
                                                size="small"
                                                onClick={() => handleAction('rebuy', item)}
                                                style={{ borderRadius: 4 }}
                                            >
                                                再买一单
                                            </Button>
                                        </Button.Group>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* 是否确认删除订单信息的对话框 */}
            <Modal
                title="删除订单"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" danger onClick={handleOk}>
                        确定删除
                    </Button>,
                ]}
            >
                <p>确定要删除该订单吗？删除后不可恢复。</p>
            </Modal>
        </div>
    );
};

export default MallOrderManagement;