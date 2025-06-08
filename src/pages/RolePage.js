import React from "react";
import { useEffect, useState, useCallback, useContext } from "react";
import { App, Button, Space, Table, Card, Tag, Row, Col } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    MenuOutlined,
    UserOutlined
} from "@ant-design/icons";
import { green, red, blue, purple } from "@ant-design/colors";

import { ServiceContext } from "../contexts/ServiceContext";
import RoleEditModal from "../components/role/RoleEditModal";
import RoleMenuEditModal from "../components/role/RoleMenuEditModal";

const RolePage = () => {
    const { modal } = App.useApp();
    const { role: roleService } = useContext(ServiceContext);

    const [roles, setRoles] = useState([]);
    useEffect(() => {
        setRoles(roleService.getRoles());
    }, [/* eslint-disable-line react-hooks/exhaustive-deps */]);

    const onEditClick = useCallback((record) => {
        setEditEntity(record);
        setEditModalOpen(true);
    }, []);

    const onEditMenuClick = useCallback((record) => {
        setEditEntity(record);
        setEditMenuModalOpen(true);
    }, []);

    const onDeleteClick = useCallback((record) => {
        modal.confirm({
            title: <span style={{ fontSize: '18px', fontWeight: 600 }}>确认删除角色</span>,
            content: (
                <div style={{ margin: '16px 0 20px', fontSize: '15px' }}>
                    您确定要删除角色 <span style={{ fontWeight: 600, color: '#ff4d4f' }}>"{record.name}"</span> 吗？此操作不可恢复。
                </div>
            ),
            okText: '确认删除',
            cancelText: '取消',
            okButtonProps: {
                danger: true,
                style: {
                    background: 'linear-gradient(45deg, #ff4d4f, #cf1322)',
                    border: 'none',
                    fontWeight: 600,
                    borderRadius: '8px',
                    height: '40px',
                    padding: '0 24px'
                }
            },
            cancelButtonProps: {
                style: {
                    border: '1px solid #d9d9d9',
                    fontWeight: 600,
                    borderRadius: '8px',
                    height: '40px',
                    padding: '0 24px'
                }
            },
            onOk() {
                roleService.deleteRole(record.id);
                setRoles(roleService.getRoles());
            },
            width: 520,
            style: { borderRadius: '12px' }
        });
    }, [/* eslint-disable-line react-hooks/exhaustive-deps */]);

    const [editEntity, setEditEntity] = useState({});
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editMenuModalOpen, setEditMenuModalOpen] = useState(false);

    const onEditModalCreate = useCallback((values) => {
        setEditModalOpen(false);
        setEditMenuModalOpen(false);
        const role = { ...editEntity, ...values };
        if (values.id === -1) {
            roleService.addRole(role);
        } else {
            roleService.editRole(role);
        }
        setRoles(roleService.getRoles());
    }, [editEntity /* eslint-disable-line react-hooks/exhaustive-deps */]);

    const onEditModalCancel = useCallback(() => {
        setEditModalOpen(false);
        setEditMenuModalOpen(false);
    }, []);

    const columns = [
        {
            title: <span style={{ fontWeight: 700, fontSize: '16px', color: '#2c3e50' }}>角色名称</span>,
            dataIndex: "name",
            key: "name",
            render: (name) => (
                <span style={{
                    fontWeight: 700,
                    fontSize: '16px',
                    color: '#1a1a1a'
                }}>
                    {name}
                </span>
            )
        },
        {
            title: <span style={{ fontWeight: 700, fontSize: '16px', color: '#2c3e50' }}>描述</span>,
            dataIndex: "desc",
            key: "desc",
            width: "25%",
            ellipsis: true,
            render: (desc) => (
                <span style={{
                    color: '#666',
                    fontSize: '14px',
                    lineHeight: '1.6'
                }}>
                    {desc}
                </span>
            )
        },
        {
            title: <span style={{ fontWeight: 700, fontSize: '16px', color: '#2c3e50' }}>用户数量</span>,
            key: 'userCount',
            align: 'center',
            width: 140,
            render: (_, record) => (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(24, 144, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '4px 12px'
                }}>
                    <UserOutlined style={{
                        marginRight: '8px',
                        color: blue.primary,
                        fontSize: '16px'
                    }} />
                    <span style={{
                        fontWeight: 600,
                        color: blue.primary
                    }}>
                        {roleService.getRoleUserCount(record.id)}
                    </span>
                </div>
            ),
        },
        {
            title: <span style={{ fontWeight: 700, fontSize: '16px', color: '#2c3e50' }}>状态</span>,
            dataIndex: "enable",
            key: "enable",
            align: 'center',
            width: 120,
            render: (enable) => (
                <Tag
                    style={{
                        fontWeight: 600,
                        fontSize: '14px',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        minWidth: '80px',
                        textAlign: 'center'
                    }}
                    color={enable ? "success" : "error"}
                >
                    {enable ? "启用" : "禁用"}
                </Tag>
            )
        },
        {
            title: <span style={{ fontWeight: 700, fontSize: '16px', color: '#2c3e50' }}>操作</span>,
            key: "action",
            width: 260,
            render: (_, record) => (
                <Space size={12} wrap>
                    <Button
                        size="middle"
                        icon={<MenuOutlined />}
                        onClick={() => onEditMenuClick(record)}
                        style={{
                            background: 'linear-gradient(45deg, #8e44ad, #9b59b6)',
                            border: 'none',
                            fontWeight: 600,
                            color: 'white',
                            boxShadow: '0 4px 10px rgba(142, 68, 173, 0.3)',
                            borderRadius: '8px',
                            padding: '0 16px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        分配菜单
                    </Button>
                    <Button
                        size="middle"
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => onEditClick(record)}
                        style={{
                            background: 'linear-gradient(45deg, #3498db, #2980b9)',
                            border: 'none',
                            fontWeight: 600,
                            boxShadow: '0 4px 10px rgba(52, 152, 219, 0.3)',
                            borderRadius: '8px',
                            padding: '0 16px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center'
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
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center'
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
            background: 'linear-gradient(135deg, #f0f4f8, #e2e8f0)',
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
                        <MenuOutlined style={{
                            marginRight: '16px',
                            color: '#8e44ad',
                            fontSize: '28px'
                        }} />
                        <span>角色管理</span>
                    </div>
                }
                bordered={false}
                headStyle={{
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    padding: '16px 24px',
                    background: 'linear-gradient(to right, #f8f9fa, #ffffff)',
                    borderRadius: '16px 16px 0 0'
                }}
                bodyStyle={{ padding: '24px' }}
                style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 0, 0, 0.06)'
                }}
            >
                <Row gutter={[24, 24]}>
                    <Col span={24}>
                        <Table
                            rowKey="id"
                            columns={columns}
                            dataSource={roles}
                            rowClassName={(record) => record.id === 1 ? 'admin-row' : ''}
                            pagination={{
                                position: ['bottomCenter'],
                                showSizeChanger: true,
                                pageSizeOptions: ['5', '10', '20'],
                                showTotal: (total) => <span style={{ fontWeight: 500 }}>共 {total} 个角色</span>,
                                style: {
                                    margin: '24px 0 0',
                                    padding: '12px 16px',
                                    background: '#f8f9fa',
                                    borderRadius: '0 0 12px 12px'
                                }
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

            <RoleEditModal
                open={editModalOpen}
                onCreate={onEditModalCreate}
                onCancel={onEditModalCancel}
                initialValues={editEntity}
            />

            <RoleMenuEditModal
                open={editMenuModalOpen}
                onCreate={onEditModalCreate}
                onCancel={onEditModalCancel}
                initialValues={editEntity}
            />

            <style jsx global>{`
                .ant-table-thead > tr > th {
                    background-color: #f8fafc !important;
                    font-weight: 600 !important;
                    color: #2c3e50 !important;
                    padding: 16px 16px !important;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
                }
                .ant-table-tbody > tr > td {
                    padding: 16px 16px !important;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.03) !important;
                    transition: all 0.3s ease;
                }
                .ant-table-tbody > tr:hover > td {
                    background-color: rgba(52, 152, 219, 0.03) !important;
                }
                .ant-pagination-item-active {
                    border-color: #3498db !important;
                    background: #3498db !important;
                }
                .ant-pagination-item-active a {
                    color: white !important;
                }
                .admin-row > td {
                    background-color: rgba(255, 229, 100, 0.1) !important;
                    border-top: 2px solid rgba(255, 193, 7, 0.3) !important;
                    border-bottom: 2px solid rgba(255, 193, 7, 0.3) !important;
                }
            `}</style>
        </div>
    );
};

export default RolePage;