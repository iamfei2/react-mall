import React from "react";
import { Card, Button, Avatar, Divider, Tooltip, Row, Col, Badge, Progress } from "antd";
import {
    MessageOutlined,
    SettingOutlined,
    ShoppingOutlined,
    WalletOutlined,
    TagOutlined,
    StarFilled,
    HeartFilled,
    EnvironmentFilled,
    HistoryOutlined,
    CommentOutlined,
    CrownFilled,
    RightOutlined,
    GiftFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './style.css';

const MallUser = () => {
    const navigate = useNavigate();

    const toOrderManagement = () => navigate('/mall/mallOrderManagement');
    const toAddress = () => navigate('/address');
    const toLogin = () => navigate('/login');

    // 用户数据
    const userData = {
        name: "Tlectronic",
        level: "黄金会员",
        points: 5000,
        growth: 1000,
        coupons: 3,
        levelProgress: 65,
        orders: {
            pending: 2,
            delivering: 1,
            reviewing: 3,
            returning: 0
        }
    };

    return (
        <div className="user-center" style={{ background: "#f8fafc", minHeight: "100vh", paddingBottom: 24 }}>
            {/* 顶部导航栏 - 简化设计 */}
            <div style={{
                background: "linear-gradient(135deg, #1677ff 0%, #36cfc9 100%)",
                padding: "16px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
            }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                        src='/avatar.jpg'
                        size={48}
                        style={{ border: "2px solid rgba(255,255,255,0.3)", marginRight: 12 }}
                    />
                    <div>
                        <div style={{ fontSize: 18, fontWeight: 600, color: "white" }}>{userData.name}</div>
                        <Badge
                            count={userData.level}
                            style={{
                                background: "rgba(255,255,255,0.25)",
                                color: "white",
                                padding: "2px 10px",
                                borderRadius: 20,
                                marginTop: 4
                            }}
                        />
                    </div>
                </div>

                <div>
                    <Tooltip title="消息">
                        <Button
                            type="text"
                            icon={<MessageOutlined style={{ color: "white", fontSize: 20 }} />}
                            style={{ marginRight: 12 }}
                        />
                    </Tooltip>
                    <Tooltip title="设置">
                        <Button
                            type="text"
                            icon={<SettingOutlined style={{ color: "white", fontSize: 20 }} />}
                        />
                    </Tooltip>
                </div>
            </div>

            {/* 用户成长体系 */}
            <div style={{ margin: "16px", marginTop: 24 }}>
                <Card
                    style={{
                        borderRadius: 16,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                        border: "none"
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <CrownFilled style={{ color: "#faad14", fontSize: 24, marginRight: 12 }} />
                            <div>
                                <div style={{ fontWeight: 600 }}>会员成长值</div>
                                <div style={{ fontSize: 12, color: "#8c8c8c" }}>再消费¥500升级铂金会员</div>
                            </div>
                        </div>
                        <Button type="link" style={{ fontWeight: 500 }}>查看权益</Button>
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <Progress
                            percent={userData.levelProgress}
                            strokeColor={{ '0%': '#36cfc9', '100%': '#1677ff' }}
                            showInfo={false}
                        />
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                            <span style={{ fontSize: 12 }}>当前等级</span>
                            <span style={{ fontSize: 12 }}>下一等级</span>
                        </div>
                    </div>

                    <Divider style={{ margin: "16px 0" }} />

                    <Row gutter={16}>
                        <Col span={8} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 18, fontWeight: 600 }}>{userData.points}</div>
                            <div style={{ fontSize: 13, color: "#595959" }}>积分</div>
                        </Col>
                        <Col span={8} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 18, fontWeight: 600 }}>{userData.growth}</div>
                            <div style={{ fontSize: 13, color: "#595959" }}>成长值</div>
                        </Col>
                        <Col span={8} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 18, fontWeight: 600 }}>{userData.coupons}</div>
                            <div style={{ fontSize: 13, color: "#595959" }}>优惠券</div>
                        </Col>
                    </Row>
                </Card>
            </div>

            {/* 快捷功能区 - 九宫格布局 */}
            <div style={{ margin: "16px" }}>
                <Card
                    style={{
                        borderRadius: 16,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                    }}
                    bodyStyle={{ padding: "16px 8px" }}
                >
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, padding: "0 8px" }}>常用功能</div>

                    <Row gutter={[16, 16]}>
                        {[
                            { icon: <ShoppingOutlined style={{ fontSize: 24 }} />, text: "我的订单", action: toOrderManagement },
                            { icon: <WalletOutlined style={{ fontSize: 24 }} />, text: "我的钱包" },
                            { icon: <TagOutlined style={{ fontSize: 24 }} />, text: "优惠券" },
                            { icon: <GiftFilled style={{ fontSize: 24 }} />, text: "我的礼物" },
                            { icon: <HeartFilled style={{ fontSize: 24, color: "#ff4d4f" }} />, text: "收藏夹" },
                            { icon: <StarFilled style={{ fontSize: 24, color: "#faad14" }} />, text: "商品关注" },
                            { icon: <EnvironmentFilled style={{ fontSize: 24, color: "#36cfc9" }} />, text: "地址管理" },
                            { icon: <HistoryOutlined style={{ fontSize: 24 }} />, text: "浏览历史" },
                            { icon: <CommentOutlined style={{ fontSize: 24 }} />, text: "评价" }
                        ].map((item, index) => (
                            <Col span={8} key={index}>
                                <Button
                                    type="text"
                                    icon={item.icon}
                                    onClick={item.action}
                                    style={{
                                        width: "100%",
                                        height: 80,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <div style={{ marginTop: 8, fontSize: 13 }}>{item.text}</div>
                                </Button>
                            </Col>
                        ))}
                    </Row>
                </Card>
            </div>

            {/* 订单状态卡片 */}
            <div style={{ margin: "16px" }}>
                <Card
                    style={{
                        borderRadius: 16,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                    }}
                    bodyStyle={{ padding: 16 }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 16,
                            cursor: "pointer"
                        }}
                        onClick={toOrderManagement}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <ShoppingOutlined style={{ fontSize: 18, color: "#1677ff", marginRight: 8 }} />
                            <span style={{ fontWeight: 500 }}>我的订单</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ fontSize: 13, color: "#8c8c8c", marginRight: 4 }}>查看全部</span>
                            <RightOutlined style={{ fontSize: 12, color: "#bfbfbf" }} />
                        </div>
                    </div>

                    <Divider style={{ margin: "12px 0" }} />

                    <Row gutter={[0, 16]} style={{ textAlign: "center" }}>
                        <Col span={6}>
                            <Badge count={userData.orders.pending} size="small" offset={[-5, 5]}>
                                <Button
                                    type="text"
                                    icon={<WalletOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />}
                                />
                            </Badge>
                            <div style={{ fontSize: 13, marginTop: 4 }}>待付款</div>
                        </Col>
                        <Col span={6}>
                            <Badge count={userData.orders.delivering} size="small" offset={[-5, 5]}>
                                <Button
                                    type="text"
                                    icon={<GiftFilled style={{ fontSize: 24, color: "#fa8c16" }} />}
                                />
                            </Badge>
                            <div style={{ fontSize: 13, marginTop: 4 }}>待收货</div>
                        </Col>
                        <Col span={6}>
                            <Badge count={userData.orders.reviewing} size="small" offset={[-5, 5]}>
                                <Button
                                    type="text"
                                    icon={<CommentOutlined style={{ fontSize: 24, color: "#52c41a" }} />}
                                />
                            </Badge>
                            <div style={{ fontSize: 13, marginTop: 4 }}>待评价</div>
                        </Col>
                        <Col span={6}>
                            <Badge count={userData.orders.returning} size="small" offset={[-5, 5]}>
                                <Button
                                    type="text"
                                    icon={<HistoryOutlined style={{ fontSize: 24, color: "#722ed1" }} />}
                                />
                            </Badge>
                            <div style={{ fontSize: 13, marginTop: 4 }}>退换/售后</div>
                        </Col>
                    </Row>
                </Card>
            </div>

            {/* 推荐服务区 */}
            <div style={{ margin: "16px" }}>
                <Card
                    style={{
                        borderRadius: 16,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                    }}
                    bodyStyle={{ padding: 16 }}
                >
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>推荐服务</div>

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Button
                                type="default"
                                block
                                style={{
                                    background: "#e6f7ff",
                                    borderColor: "#91d5ff",
                                    height: 48,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <span style={{ marginLeft: 8 }}>会员专享折扣</span>
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                type="default"
                                block
                                style={{
                                    background: "#f6ffed",
                                    borderColor: "#b7eb8f",
                                    height: 48,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <span style={{ marginLeft: 8 }}>积分兑换好礼</span>
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                type="default"
                                block
                                style={{
                                    background: "#fff7e6",
                                    borderColor: "#ffd591",
                                    height: 48,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <span style={{ marginLeft: 8 }}>专属客服</span>
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                type="default"
                                block
                                style={{
                                    background: "#f9f0ff",
                                    borderColor: "#d3adf7",
                                    height: 48,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <span style={{ marginLeft: 8 }}>生日特权</span>
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
}

export default MallUser;