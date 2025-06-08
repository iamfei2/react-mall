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
                <Space direction="vertical" size={0}>
                    <div>
                        <span style={{ fontWeight: 600 }}>订单号: </span>{record.orderNumber}
                    </div>
                    <div>
                        <span style={{ fontWeight: 600 }}>商品: </span>{record.productName}
                    </div>
                    <div>
                        <span style={{ fontWeight: 600 }}>数量: </span>{record.amount}
                    </div>
                    <div>
                        <span style={{ fontWeight: 600 }}>金额: </span>
                        <span style={{ color: red[4], fontWeight: 600 }}>¥{record.price}</span>
                    </div>
                </Space>
            ),
        },
        {
            title: '用户信息',
            key: 'customer',
            render: (_, record) => (
                <div>
                    <div>{record.customerName}</div>
                    <div style={{ color: '#666', marginTop: 4 }}>{record.storeName}</div>
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
                    borderRadius: 4,
                    padding: 8,
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <img
                        src={image}
                        alt="商品图片"
                        style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'contain'
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
                    style={{ fontWeight: 600 }}
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
                <Space>
                    {record.status === 0 ? (
                        <Button
                            type="primary"
                            style={{ background: green[5], borderColor: green[5] }}
                            onClick={() => handleShip(record.id)}
                        >
                            发货
                        </Button>
                    ) : (
                        <Button disabled>已完成</Button>
                    )}
                    <Button
                        type="primary"
                        danger
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
        <div style={{ padding: 24 }}>
            <Card
                title={<Title level={4} style={{ margin: 0 }}>订单管理</Title>}
                bordered={false}
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={onAddBtnClick}
                        style={{ background: '#1890ff', borderColor: '#1890ff' }}
                    >
                        添加订单
                    </Button>
                }
            >
                <div style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="搜索订单（商品名/用户名）"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        allowClear
                        style={{ width: 300 }}
                    />
                </div>

                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={filteredOrders}
                    pagination={{
                        position: ['bottomCenter'],
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20'],
                        showTotal: (total) => `共 ${total} 条订单`
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