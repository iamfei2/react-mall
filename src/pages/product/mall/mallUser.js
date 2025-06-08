import React from "react";
import { Card, Button, Avatar, Divider, Tooltip, Row, Col, Badge } from "antd";
import {
    MessageOutlined,
    SettingOutlined,
    ProfileOutlined,
    MoneyCollectOutlined,
    TruckOutlined,
    TransactionOutlined,
    EnvironmentOutlined,
    RightOutlined,
    HeartOutlined,
    StarOutlined,
    CommentOutlined,
    ClockCircleOutlined,
    LeftOutlined,
    CrownFilled,
    GiftFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './style.css';

const MallUser = () => {
    const navigate = useNavigate();

    const toOrderManagement = () => navigate('/mall/mallOrderManagement');
    const toLogin = () => navigate('/main');

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
                <Tooltip title="退出登录">
                    <Button
                        type="link"
                        icon={<LeftOutlined style={{ color: "white" }} />}
                        onClick={toLogin}
                        style={{ color: "white" }}
                    ></Button>
                </Tooltip>

                <div style={{ fontSize: 18, fontWeight: 500, color: "white" }}>我的账户</div>

                <div>
                    <Tooltip title="消息">
                        <Button
                            type="link"
                            icon={<MessageOutlined style={{ color: "white" }} />}
                            style={{ color: "white" }}
                        />
                    </Tooltip>
                    <Tooltip title="设置">
                        <Button
                            type="link"
                            icon={<SettingOutlined style={{ color: "white" }} />}
                            style={{ color: "white" }}
                        />
                    </Tooltip>
                </div>
            </div>

            {/* 用户信息卡片 */}
            <div style={{ margin: "16px" }}>
                <Card
                    style={{
                        borderRadius: 12,
                        overflow: "hidden",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                        border: "none"
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                        <Avatar
                            src='/avatar.jpg'
                            size={64}
                            style={{ border: "2px solid white" }}
                        />

                        <div style={{ marginLeft: 16 }}>
                            <div style={{ fontSize: 20, fontWeight: 600, color: "white" }}>Tlectronic</div>
                            <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
                                <Badge
                                    count="白银会员"
                                    style={{
                                        background: "rgba(255,255,255,0.2)",
                                        color: "white",
                                        padding: "0 8px",
                                        borderRadius: 12
                                    }}
                                />
                            </div>
                        </div>

                        <Button
                            type="primary"
                            style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                background: "rgba(255,255,255,0.2)",
                                border: "1px solid rgba(255,255,255,0.3)",
                                borderRadius: 16
                            }}
                            icon={<CrownFilled />}
                        >
                            开通会员
                        </Button>
                    </div>

                    <Divider style={{ background: "rgba(255,255,255,0.2)", margin: "16px 0" }} />

                    <Row gutter={16} style={{ textAlign: "center" }}>
                        <Col span={8}>
                            <div style={{ fontSize: 18, fontWeight: 600, color: "white" }}>5000</div>
                            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>积分</div>
                        </Col>
                        <Col span={8}>
                            <div style={{ fontSize: 18, fontWeight: 600, color: "white" }}>1000</div>
                            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>成长值</div>
                        </Col>
                        <Col span={8}>
                            <div style={{ fontSize: 18, fontWeight: 600, color: "white" }}>暂无</div>
                            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>优惠券</div>
                        </Col>
                    </Row>
                </Card>
            </div>

            {/* 订单功能区 */}
            <div style={{ margin: "16px" }}>
                <Card
                    style={{
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                    bodyStyle={{ padding: 16 }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 16
                        }}
                        onClick={toOrderManagement}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <ProfileOutlined style={{ fontSize: 18, color: "#1677ff" }} />
                            <span style={{ marginLeft: 8, fontWeight: 500 }}>我的订单</span>
                        </div>
                        <RightOutlined style={{ color: "#999" }} />
                    </div>

                    <Divider style={{ margin: "12px 0" }} />

                    <Row gutter={[0, 16]} style={{ textAlign: "center" }}>
                        <Col span={6}>
                            <Button type="text" icon={<MoneyCollectOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />} />
                            <div style={{ fontSize: 14, marginTop: 4 }}>待付款</div>
                        </Col>
                        <Col span={6}>
                            <Button type="text" icon={<TruckOutlined style={{ fontSize: 24, color: "#faad14" }} />} />
                            <div style={{ fontSize: 14, marginTop: 4 }}>待收货</div>
                        </Col>
                        <Col span={6}>
                            <Button type="text" icon={<TransactionOutlined style={{ fontSize: 24, color: "#52c41a" }} />} />
                            <div style={{ fontSize: 14, marginTop: 4 }}>待评价</div>
                        </Col>
                        <Col span={6}>
                            <Button type="text" icon={<GiftFilled style={{ fontSize: 24, color: "#722ed1" }} />} />
                            <div style={{ fontSize: 14, marginTop: 4 }}>退换货</div>
                        </Col>
                    </Row>
                </Card>
            </div>

            {/* 功能列表 */}
            <div style={{ margin: "16px" }}>
                <Card
                    style={{
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                    bodyStyle={{ padding: 0 }}
                >
                    {[
                        { icon: <EnvironmentOutlined style={{ color: "#13c2c2" }} />, text: "地址管理" },
                        { icon: <ClockCircleOutlined style={{ color: "#fa8c16" }} />, text: "我的足迹" },
                        { icon: <HeartOutlined style={{ color: "#eb2f96" }} />, text: "我的关注" },
                        { icon: <StarOutlined style={{ color: "#fadb14" }} />, text: "我的收藏" },
                        { icon: <CommentOutlined style={{ color: "#722ed1" }} />, text: "我的评价" },
                    ].map((item, index) => (
                        <div key={index}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "16px"
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{
                                        width: 28,
                                        height: 28,
                                        background: "rgba(25, 118, 210, 0.1)",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        {item.icon}
                                    </div>
                                    <span style={{ marginLeft: 12, fontWeight: 500 }}>{item.text}</span>
                                </div>
                                <RightOutlined style={{ color: "#999" }} />
                            </div>
                            {index < 4 && <Divider style={{ margin: 0 }} />}
                        </div>
                    ))}
                </Card>
            </div>
        </div>
    );
}

export default MallUser;