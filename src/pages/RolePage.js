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
            title: '确认删除角色',
            content: `您确定要删除角色 "${record.name}" 吗？此操作不可恢复。`,
            okText: '确认删除',
            cancelText: '取消',
            okButtonProps: { danger: true },
            onOk() {
                roleService.deleteRole(record.id);
                setRoles(roleService.getRoles());
            },
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
            title: "角色名称",
            dataIndex: "name",
            key: "name",
            render: (name) => <span style={{ fontWeight: 600 }}>{name}</span>
        },
        {
            title: "描述",
            dataIndex: "desc",
            key: "desc",
            width: "25%",
            ellipsis: true
        },
        {
            title: '用户数量',
            key: 'userCount',
            align: 'center',
            width: 120,
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UserOutlined style={{ marginRight: 6, color: blue.primary }} />
                    <span>{roleService.getRoleUserCount(record.id)}</span>
                </div>
            ),
        },
        {
            title: "状态",
            dataIndex: "enable",
            key: "enable",
            align: 'center',
            width: 100,
            render: (enable) => (
                <Tag color={enable ? green[5] : red[5]}>
                    {enable ? "启用" : "禁用"}
                </Tag>
            )
        },
        {
            title: "操作",
            key: "action",
            width: 220,
            render: (_, record) => (
                <Space size="small">
                    <Button
                        size="small"
                        icon={<MenuOutlined />}
                        onClick={() => onEditMenuClick(record)}
                        style={{ background: purple[1], color: purple[6], borderColor: purple[2] }}
                    >
                        分配菜单
                    </Button>
                    <Button
                        size="small"
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => onEditClick(record)}
                    >
                        编辑
                    </Button>
                    {record.id !== 1 && (
                        <Button
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() => onDeleteClick(record)}
                        >
                            删除
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className="page" style={{ padding: 24 }}>
            <Card
                title="角色管理"
                bordered={false}
                headStyle={{
                    borderBottom: '1px solid #f0f0f0',
                    padding: '16px 24px',
                    fontSize: '16px',
                    fontWeight: 500
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
                                showTotal: (total) => `共 ${total} 个角色`
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
        </div>
    );
};

export default RolePage;