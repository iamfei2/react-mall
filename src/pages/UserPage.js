import React from "react";
import { useEffect, useState, useCallback, useContext } from "react";
import { Button, Space, Table, App, Card, Tag, Row, Col } from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UserSwitchOutlined
} from "@ant-design/icons";
import { blue, green, red, purple } from "@ant-design/colors";

import { ServiceContext } from "../contexts/ServiceContext";
import UserEditModal from "../components/user/UserEditModal";
import UserRoleEditModal from "../components/user/UserRoleEditModal";

const UserPage = () => {
    const { modal } = App.useApp();
    const { user: userService } = useContext(ServiceContext);

    const [users, setUsers] = useState([]);
    useEffect(() => {
        setUsers(userService.getUsers());
    }, []);

    const onRoleClick = useCallback((record) => {
        setEditEntity(record);
        setRoleEditModalOpen(true);
    }, []);

    const onEditClick = useCallback((record) => {
        setEditEntity(record);
        setEditModalOpen(true);
    }, []);

    const onDeleteClick = useCallback((record) => {
        modal.confirm({
            title: '确定要删除用户吗？',

            okText: '确认删除',
            cancelText: '取消',
            okButtonProps: { danger: true },
            onOk() {
                userService.deleteUser(record.id);
                setUsers(userService.getUsers());
            },
        });
    }, []);

    const [editEntity, setEditEntity] = useState({});
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editRoleModalOpen, setRoleEditModalOpen] = useState(false);

    const onAddBtnClick = useCallback(() => {
        setEditEntity({ id: -1 });
        setEditModalOpen(true);
    }, [])

    const onEditModalCreate = useCallback((values) => {
        setEditModalOpen(false);
        setRoleEditModalOpen(false);
        const user = { ...editEntity, ...values };
        if (values.id === -1) {
            userService.addUser(user);
        } else {
            userService.editUser(user);
        }
        setUsers(userService.getUsers());
    }, [editEntity]);

    const onEditModalCancel = useCallback(() => {
        setEditModalOpen(false);
        setRoleEditModalOpen(false);
    }, []);

    const columns = [
        {
            title: <span style={{ fontWeight: 700, fontSize: '16px' }}>用户信息</span>,
            key: "info",
            render: (_, record) => (
                <div style={{ padding: '12px 0' }}>
                    <div style={{
                        fontWeight: 800,
                        fontSize: '18px',
                        color: '#1a1a1a',
                        marginBottom: '4px'
                    }}>{record.name}</div>
                    <div style={{
                        color: '#4a6cf7',
                        fontWeight: 500,
                        fontSize: '14px',
                        backgroundColor: 'rgba(74, 108, 247, 0.1)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        display: 'inline-block',
                        marginBottom: '6px'
                    }}>{record.username}</div>
                    <div style={{
                        color: '#666',
                        fontSize: '14px'
                    }}>{record.email}</div>
                </div>
            )
        },
        {
            title: <span style={{ fontWeight: 700, fontSize: '16px' }}>状态</span>,
            dataIndex: "enable",
            key: "enable",
            width: 120,
            align: 'center',
            render: (enable) => (
                <div style={{
                    backgroundColor: enable ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)',
                    color: enable ? '#2ecc71' : '#e74c3c',
                    fontWeight: 600,
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    border: `1px solid ${enable ? '#2ecc71' : '#e74c3c'}`
                }}>
                    {enable ? "已启用" : "已禁用"}
                </div>
            )
        },
        {
            title: <span style={{ fontWeight: 700, fontSize: '16px' }}>操作</span>,
            key: "action",
            width: 240,
            render: (_, record) => (
                <Space wrap>
                    <Button
                        type="primary"
                        size="middle"
                        icon={<UserSwitchOutlined />}
                        onClick={() => onRoleClick(record)}
                        style={{
                            background: 'linear-gradient(45deg, #8e44ad, #9b59b6)',
                            border: 'none',
                            fontWeight: 600,
                            boxShadow: '0 4px 10px rgba(142, 68, 173, 0.3)',
                            borderRadius: '8px',
                            padding: '0 16px',
                            height: '36px'
                        }}
                    >
                        分配角色
                    </Button>
                    <Button
                        type="primary"
                        size="middle"
                        icon={<EditOutlined />}
                        onClick={() => onEditClick(record)}
                        style={{
                            background: 'linear-gradient(45deg, #3498db, #2980b9)',
                            border: 'none',
                            fontWeight: 600,
                            boxShadow: '0 4px 10px rgba(52, 152, 219, 0.3)',
                            borderRadius: '8px',
                            padding: '0 16px',
                            height: '36px'
                        }}
                    >
                        编辑
                    </Button>
                    {record.id !== 1 && (
                        <Button
                            danger
                            size="middle"
                            icon={<DeleteOutlined />}
                            onClick={() => onDeleteClick(record)}
                            style={{
                                background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
                                border: 'none',
                                fontWeight: 600,
                                boxShadow: '0 4px 10px rgba(231, 76, 60, 0.3)',
                                borderRadius: '8px',
                                padding: '0 16px',
                                height: '36px'
                            }}
                        >
                            删除
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className="page" style={{
            padding: '24px',
            background: 'linear-gradient(135deg, #f5f7fa, #e4e7eb)',
            minHeight: '100vh'
        }}>
            <Card
                title={
                    <div style={{
                        fontSize: '24px',
                        fontWeight: 800,
                        color: '#2c3e50',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <UserSwitchOutlined style={{ marginRight: '12px', color: '#8e44ad' }} />
                        <span>用户信息管理</span>
                    </div>
                }
                bordered={false}
                headStyle={{
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    padding: '0 24px'
                }}
                bodyStyle={{ padding: '24px' }}
                style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden'
                }}
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={onAddBtnClick}
                        style={{
                            background: 'linear-gradient(45deg, #2ecc71, #27ae60)',
                            border: 'none',
                            fontWeight: 600,
                            boxShadow: '0 4px 15px rgba(46, 204, 113, 0.3)',
                            borderRadius: '8px',
                            height: '42px',
                            padding: '0 24px'
                        }}
                    >
                        添加用户
                    </Button>
                }
            >
                <Row gutter={[24, 24]}>
                    <Col span={24}>
                        <Table
                            rowKey="id"
                            columns={columns}
                            dataSource={users}
                            rowClassName={(record) => record.id === 1 ? 'admin-row' : ''}
                            pagination={{
                                position: ['bottomCenter'],
                                showSizeChanger: true,
                                pageSizeOptions: ['5', '10', '20'],
                                style: { margin: '24px 0 0' }
                            }}
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.05)',
                                borderRadius: '12px',
                                overflow: 'hidden'
                            }}
                        />
                    </Col>
                </Row>
            </Card>

            <UserEditModal
                open={editModalOpen}
                onCreate={onEditModalCreate}
                onCancel={onEditModalCancel}
                initialValues={editEntity}
            />

            <UserRoleEditModal
                open={editRoleModalOpen}
                onCreate={onEditModalCreate}
                onCancel={onEditModalCancel}
                initialValues={editEntity}
            />
        </div>
    );
};

export default UserPage;