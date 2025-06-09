import React, { useEffect, useState, useContext } from 'react';
import { Button, Space, Table, Input, Card, Tag, Row, Col, Typography } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { green, orange, red } from '@ant-design/colors';
import { ServiceContext } from '../contexts/ServiceContext';
import OrderEditModal from '../components/order/OrderEditModal';

const { Title } = Typography;

const OrderPage = () => {
    const { order } = useContext(ServiceContext);

    const [orders, setOrders] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editEntity, setEditEntity] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setOrders(order.getOrders());
    }, [order]);

    const onAddBtnClick = () => {
        setEditEntity(null);
        setEditModalOpen(true);
    };

    const onEditModalCreate = (values) => {
        if (editEntity) {
            order.updateOrder({ ...editEntity, ...values });
        } else {
            order.addOrder({
                ...values,
                id: orders.length ? orders[orders.length - 1].id + 1 : 1,
                status: 0 // 默认未发货状态
            });
        }
        setOrders(order.getOrders());
        setEditModalOpen(false);
    };

    const onEditModalCancel = () => {
        setEditModalOpen(false);
    };

    const onDelete = (id) => {
        order.deleteOrder(id);
        setOrders(order.getOrders());
    };

    const handleShip = (id) => {
        order.handleShip(id);
        const updatedOrders = orders.map(order => {
            if (order.id === id) {
                return { ...order, status: 1 }; // 更新为已发货
            }
            return order;
        });
        setOrders(updatedOrders);
    }

    const columns = [
        {
            title: '订单信息',
            key: 'info',
            render: (_, record) => (
                <Space direction="vertical" size={4} style={{ lineHeight: 1.5 }}>
                    <div style={{ display: 'flex' }}>
                        <span style={{ fontWeight: 600, minWidth: 60 }}>订单号: </span>
                        <span style={{ fontWeight: 500 }}>{record.orderNumber}</span>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <span style={{ fontWeight: 600, minWidth: 60 }}>商品: </span>
                        <span style={{ fontWeight: 500 }}>{record.productName}</span>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <span style={{ fontWeight: 600, minWidth: 60 }}>数量: </span>
                        <span style={{ fontWeight: 500 }}>{record.amount}</span>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <span style={{ fontWeight: 600, minWidth: 60 }}>金额: </span>
                        <span style={{ color: red[5], fontWeight: 600 }}>¥{record.price}</span>
                    </div>
                </Space>
            ),
        },
        {
            title: '用户信息',
            key: 'customer',
            render: (_, record) => (
                <div style={{ lineHeight: 1.6 }}>
                    <div style={{ fontWeight: 500 }}>{record.customerName}</div>
                    <div style={{
                        color: '#666',
                        fontSize: 13,
                        backgroundColor: '#f8f9fa',
                        padding: '4px 8px',
                        borderRadius: 4,
                        marginTop: 6,
                        display: 'inline-block'
                    }}>
                        {record.storeName}
                    </div>
                </div>
            ),
        },
        {
            title: '商品图片',
            dataIndex: 'image',
            key: 'image',
            width: 120,
            render: (image) => (
                <div style={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: 6,
                    padding: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                }}>
                    <img
                        src={image}
                        alt="商品图片"
                        style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'contain',
                            borderRadius: 4
                        }}
                    />
                </div>
            ),
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 120,
            render: (status) => (
                <Tag
                    color={status === 1 ? green[5] : orange[5]}
                    style={{
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: 12,
                        minWidth: 70
                    }}
                >
                    {status === 1 ? '已发货' : '未发货'}
                </Tag>
            ),
        },
        {
            title: '操作',
            key: 'actions',
            width: 200,
            align: 'center',
            render: (_, record) => (
                <Space size={8}>
                    {record.status === 0 ? (
                        <Button
                            type="primary"
                            style={{
                                background: green[5],
                                borderColor: green[5],
                                boxShadow: '0 2px 4px rgba(82,196,26,0.3)'
                            }}
                            onClick={() => handleShip(record.id)}
                        >
                            发货
                        </Button>
                    ) : (
                        <Button
                            disabled
                            style={{
                                background: '#f0f0f0',
                                color: '#999',
                                borderColor: '#d9d9d9'
                            }}
                        >
                            已完成
                        </Button>
                    )}
                    <Button
                        type="primary"
                        danger
                        style={{
                            boxShadow: '0 2px 4px rgba(245,34,45,0.3)'
                        }}
                        onClick={() => onDelete(record.id)}
                    >
                        删除
                    </Button>
                </Space>
            ),
        },
    ];

    const filteredOrders = orders.filter(order =>
        (order.productName && order.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div style={{
            padding: 24,
            background: '#f5f7fa'
        }}>
            <Card
                title={
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 0'
                    }}>
                        <Title
                            level={4}
                            style={{
                                margin: 0,
                                fontWeight: 600,
                                color: '#2c3e50'
                            }}
                        >
                            订单管理
                        </Title>
                    </div>
                }
                bordered={false}
                headStyle={{
                    borderBottom: '1px solid #f0f0f0',
                    padding: '0 16px'
                }}
                bodyStyle={{
                    padding: '16px 24px'
                }}
                style={{
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}

            >
                <div style={{
                    marginBottom: 24,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Input
                        placeholder="搜索订单（商品名/用户名）"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        suffix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                        allowClear
                        style={{
                            width: 320,
                            height: 40,
                            borderRadius: 8
                        }}
                    />
                    <div style={{
                        fontSize: 14,
                        color: '#666'
                    }}>
                        共 {filteredOrders.length} 条订单
                    </div>
                </div>

                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={filteredOrders}
                    pagination={{
                        position: ['bottomCenter'],
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20'],
                        showTotal: (total) => `共 ${total} 条订单`,
                        style: { marginTop: 24 }
                    }}
                    rowClassName={() => 'order-table-row'}
                    style={{
                        border: '1px solid #f0f0f0',
                        borderRadius: 8,
                        overflow: 'hidden'
                    }}
                />
            </Card>

            <OrderEditModal
                open={editModalOpen}
                onCreate={onEditModalCreate}
                onCancel={onEditModalCancel}
                initialValues={editEntity}
            />
        </div>
    );
};

export default OrderPage;
