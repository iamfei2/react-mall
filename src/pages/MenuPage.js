import React from "react";
import { useEffect, useState, useCallback, useContext } from "react";
import { Button, Space, Table, App, Card, Tag, Row, Col } from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    HomeOutlined,
    FolderOutlined,
    LockOutlined
} from "@ant-design/icons";
import { green, red, blue, orange } from "@ant-design/colors";

import { ServiceContext } from "../contexts/ServiceContext";
import MenuEditModal from "../components/menu/MenuEditModal";

const MenuPage = () => {
    const { modal } = App.useApp();
    const { menu: menuService } = useContext(ServiceContext);

    const [menus, setMenus] = useState([]);
    useEffect(() => {
        setMenus(menuService.getMenus());
    }, [/* eslint-disable-line react-hooks/exhaustive-deps */]);

    const onEditClick = useCallback((record) => {
        setEditEntity(record);
        setEditModalOpen(true);
    }, []);

    const onDeleteClick = useCallback((record) => {
        modal.confirm({
            title: <span style={{ fontSize: '16px', fontWeight: 600 }}>确认删除菜单</span>,
            content: <div style={{ margin: '12px 0 16px', fontSize: '14px' }}>您确定要删除 <span style={{ fontWeight: 600 }}>"{record.name}"</span> 菜单吗？此操作不可恢复。</div>,
            okText: '确认删除',
            cancelText: '取消',
            okButtonProps: {
                danger: true,
                style: {
                    background: 'linear-gradient(45deg, #ff4d4f, #cf1322)',
                    border: 'none',
                    fontWeight: 600,
                    borderRadius: '6px',
                    height: '36px',
                    padding: '0 20px'
                }
            },
            cancelButtonProps: {
                style: {
                    border: '1px solid #d9d9d9',
                    fontWeight: 600,
                    borderRadius: '6px',
                    height: '36px',
                    padding: '0 20px'
                }
            },
            onOk() {
                menuService.deleteMenu(record.id);
                setMenus(menuService.getMenus());
            },
            width: 520,
            style: { borderRadius: '10px' }
        });
    }, [/* eslint-disable-line react-hooks/exhaustive-deps */]);

    const [editEntity, setEditEntity] = useState({});
    const [editModalOpen, setEditModalOpen] = useState(false);

    const onAddBtnClick = useCallback(() => {
        setEditEntity({ id: -1 });
        setEditModalOpen(true);
    }, [])

    const onEditModalCreate = useCallback((values) => {
        setEditModalOpen(false);
        if (values.id === -1) {
            menuService.addMenu(values);
        } else {
            menuService.editMenu(values);
        }
        setMenus(menuService.getMenus());
    }, [editEntity, /* eslint-disable-line react-hooks/exhaustive-deps */]);

    const onEditModalCancel = useCallback(() => {
        setEditModalOpen(false);
    }, []);

    const columns = [
        {
            title: <span style={{ fontWeight: 600, fontSize: '14px' }}>菜单信息</span>,
            key: "info",
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {record.path === 'home' ?
                        <HomeOutlined style={{
                            fontSize: 18,
                            color: orange.primary,
                            marginRight: 12,
                            background: 'rgba(255, 169, 64, 0.15)',
                            borderRadius: '8px',
                            padding: '6px',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} /> :
                        <FolderOutlined style={{
                            fontSize: 18,
                            color: blue.primary,
                            marginRight: 12,
                            background: 'rgba(24, 144, 255, 0.15)',
                            borderRadius: '8px',
                            padding: '6px',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} />
                    }
                    <div>
                        <div style={{ fontWeight: 600, fontSize: '15px' }}>{record.name}</div>
                        <div style={{ color: '#666', fontSize: '13px', marginTop: '4px' }}>{record.path}</div>
                    </div>
                </div>
            )
        },
        {
            title: <span style={{ fontWeight: 600, fontSize: '14px' }}>状态</span>,
            dataIndex: "enable",
            key: "enable",
            align: 'center',
            width: 100,
            render: (enable, record) => (
                <Tag
                    color={enable ? green[5] : red[5]}
                    icon={record.locked ? <LockOutlined /> : null}
                    style={{
                        fontWeight: 600,
                        borderRadius: '20px',
                        padding: '4px 12px',
                        border: 'none',
                        background: enable
                            ? 'linear-gradient(45deg, #52c41a, #73d13d)'
                            : 'linear-gradient(45deg, #ff4d4f, #ff7875)'
                    }}
                >
                    {enable ? "启用" : "禁用"}
                </Tag>
            )
        },
        {
            title: <span style={{ fontWeight: 600, fontSize: '14px' }}>父级</span>,
            dataIndex: "parent",
            key: "parent",
            align: 'center',
            render: (parent) => (
                parent ?
                    <span style={{ fontWeight: 500 }}>{parent}</span> :
                    <span style={{ color: '#bfbfbf', fontStyle: 'italic' }}>无</span>
            )
        },
        {
            title: <span style={{ fontWeight: 600, fontSize: '14px' }}>操作</span>,
            key: "action",
            align: 'center',
            width: 200,
            render: (_, record) => (
                <Space size="middle">
                    {(record.locked || record.path === 'home') ? (
                        <div style={{ color: '#bfbfbf', fontSize: '13px', fontStyle: 'italic' }}>系统菜单</div>
                    ) : (
                        <>
                            <Button
                                size="middle"
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => onEditClick(record)}
                                style={{
                                    background: 'linear-gradient(45deg, #1890ff, #096dd9)',
                                    border: 'none',
                                    fontWeight: 600,
                                    borderRadius: '6px',
                                    boxShadow: '0 2px 6px rgba(24, 144, 255, 0.3)'
                                }}
                            >
                                编辑
                            </Button>
                            <Button
                                danger
                                size="middle"
                                icon={<DeleteOutlined />}
                                onClick={() => onDeleteClick(record)}
                                style={{
                                    background: 'linear-gradient(45deg, #ff4d4f, #cf1322)',
                                    border: 'none',
                                    fontWeight: 600,
                                    borderRadius: '6px',
                                    boxShadow: '0 2px 6px rgba(255, 77, 79, 0.3)'
                                }}
                            >
                                删除
                            </Button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className="page" style={{ padding: '24px 32px' }}>
            <Card
                title={
                    <div style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#2c3e50',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <span>菜单管理</span>
                        <Tag color="blue" style={{ marginLeft: '12px', fontWeight: 600 }}>
                            共 {menus.length} 个菜单
                        </Tag>
                    </div>
                }
                bordered={false}
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={onAddBtnClick}
                        style={{
                            background: 'linear-gradient(45deg, #52c41a, #73d13d)',
                            border: 'none',
                            fontWeight: 600,
                            borderRadius: '6px',
                            boxShadow: '0 4px 10px rgba(82, 196, 26, 0.3)',
                            height: '38px',
                            padding: '0 20px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        添加菜单
                    </Button>
                }
                headStyle={{
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                    padding: '20px 24px',
                    background: '#f9fbfd',
                    borderRadius: '12px 12px 0 0'
                }}
                bodyStyle={{ padding: '0 24px 24px', borderRadius: '0 0 12px 12px' }}
                style={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(0, 0, 0, 0.06)'
                }}
            >
                <Row gutter={[24, 24]}>
                    <Col span={24}>
                        <Table
                            rowKey="id"
                            columns={columns}
                            dataSource={menus}
                            pagination={{
                                position: ['bottomCenter'],
                                showSizeChanger: true,
                                pageSizeOptions: ['5', '10', '20'],
                                showTotal: (total) => <span style={{ fontWeight: 500 }}>共 {total} 个菜单</span>
                            }}
                            rowClassName={() => "menu-table-row"}
                            style={{
                                borderRadius: '8px',
                                border: '1px solid rgba(0, 0, 0, 0.06)'
                            }}
                        />
                    </Col>
                </Row>
            </Card>

            <MenuEditModal
                open={editModalOpen}
                onCreate={onEditModalCreate}
                onCancel={onEditModalCancel}
                initialValues={editEntity}
            />

            <style jsx global>{`
                .ant-table-thead > tr > th {
                    background-color: #f5f7fa !important;
                    font-weight: 600 !important;
                    color: #2c3e50 !important;
                    padding: 16px 16px !important;
                }
                .ant-table-tbody > tr > td {
                    padding: 16px 16px !important;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.03) !important;
                    transition: all 0.3s ease;
                }
                .ant-table-tbody > tr:hover > td {
                    background-color: rgba(24, 144, 255, 0.03) !important;
                }
                .ant-pagination-item-active {
                    border-color: #1890ff !important;
                    background: #1890ff !important;
                }
                .ant-pagination-item-active a {
                    color: white !important;
                }
            `}</style>
        </div>
    );
};

export default MenuPage;