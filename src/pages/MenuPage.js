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
            title: '确认删除菜单',
            content: `您确定要删除 "${record.name}" 菜单吗？此操作不可恢复。`,
            okText: '确认删除',
            cancelText: '取消',
            okButtonProps: { danger: true },
            onOk() {
                menuService.deleteMenu(record.id);
                setMenus(menuService.getMenus());
            },
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
            title: "菜单信息",
            key: "info",
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {record.path === 'home' ?
                        <HomeOutlined style={{ fontSize: 16, color: orange.primary, marginRight: 8 }} /> :
                        <FolderOutlined style={{ fontSize: 16, color: blue.primary, marginRight: 8 }} />
                    }
                    <div>
                        <div style={{ fontWeight: 600 }}>{record.name}</div>
                        <div style={{ color: '#666', fontSize: 13 }}>{record.path}</div>
                    </div>
                </div>
            )
        },
        {
            title: "状态",
            dataIndex: "enable",
            key: "enable",
            align: 'center',
            width: 100,
            render: (enable, record) => (
                <Tag
                    color={enable ? green[5] : red[5]}
                    icon={record.locked ? <LockOutlined /> : null}
                >
                    {enable ? "启用" : "禁用"}
                </Tag>
            )
        },
        {
            title: "父级",
            dataIndex: "parent",
            key: "parent",
            align: 'center',
            render: (parent) => (
                parent ? <span>{parent}</span> : <span style={{ color: '#999' }}>无</span>
            )
        },
        {
            title: "操作",
            key: "action",
            align: 'center',
            width: 180,
            render: (_, record) => (
                <Space size="small">
                    {(record.locked || record.path === 'home') ? (
                        <div style={{ color: '#999', fontSize: 13 }}>系统菜单</div>
                    ) : (
                        <>
                            <Button
                                size="small"
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => onEditClick(record)}
                            >
                                编辑
                            </Button>
                            <Button
                                danger
                                size="small"
                                icon={<DeleteOutlined />}
                                onClick={() => onDeleteClick(record)}
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
        <div className="page" style={{ padding: 24 }}>
            <Card
                title="菜单管理"
                bordered={false}
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={onAddBtnClick}
                        style={{ background: green[5], borderColor: green[5] }}
                    >
                        添加菜单
                    </Button>
                }
                headStyle={{
                    borderBottom: '1px solid #f0f0f0',
                    padding: '16px 24px',
                    fontSize: '16px',
                    fontWeight: 500
                }}
                bodyStyle={{ padding: '0 24px' }}
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
                                showTotal: (total) => `共 ${total} 个菜单`
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
        </div>
    );
};

export default MenuPage;