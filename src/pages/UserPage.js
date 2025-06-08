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
    }, [/* eslint-disable-line react-hooks/exhaustive-deps */]);

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
            content: <div style={{ color: red.primary }}>
                该操作不可撤销，将永久删除用户<br />{record.name} ({record.username})
            </div>,
            okText: '确认删除',
            cancelText: '取消',
            okButtonProps: { danger: true },
            onOk() {
                userService.deleteUser(record.id);
                setUsers(userService.getUsers());
            },
        });
    }, [/* eslint-disable-line react-hooks/exhaustive-deps */]);

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
    }, [editEntity, /* eslint-disable-line react-hooks/exhaustive-deps */]);

    const onEditModalCancel = useCallback(() => {
        setEditModalOpen(false);
        setRoleEditModalOpen(false);
    }, []);

    const columns = [
        {
            title: "用户信息",
            key: "info",
            render: (_, record) => (
                <div>
                    <div style={{ fontWeight: 600, fontSize: '16px' }}>{record.name}</div>
                    <div style={{ color: blue.primary }}>{record.username}</div>
                    <div>{record.email}</div>
                </div>
            )
        },
        {
            title: "状态",
            dataIndex: "enable",
            key: "enable",
            width: 100,
            align: 'center',
            render: (enable) => (
                <Tag color={enable ? green[5] : red[5]}>
                    {enable ? "已启用" : "已禁用"}
                </Tag>
            )
        },
        {
            title: "操作",
            key: "action",
            width: 220,
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        size="small"
                        icon={<UserSwitchOutlined />}
                        onClick={() => onRoleClick(record)}
                        style={{ background: purple.primary }}
                    >
                        分配角色
                    </Button>
                    <Button
                        type="primary"
                        size="small"
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
        <div className="page" style={{ padding: '24px' }}>
            <Card
                title="用户管理"
                bordered={false}
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={onAddBtnClick}
                        style={{ background: green[5], borderColor: green[5] }}
                    >
                        添加用户
                    </Button>
                }
                headStyle={{ borderBottom: '1px solid #f0f0f0' }}
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
                                pageSizeOptions: ['5', '10', '20']
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