import React from 'react';
import { Modal, Form, Input, Checkbox } from 'antd';
import OrderService from '../../service/OrderService';

const OrderEditModal = ({ open, onCreate, onCancel, initialValues }) => {
    const [form] = Form.useForm();
    const orderService = new OrderService();  // 创建 OrderService 的实例

    const handleCreate = (values) => { 
        values.status = values.status ? 1 : 0;
        const newOrder = orderService.addNewOrder(values);
        onCreate(newOrder);
        form.resetFields();
    } 
    
    return (
        <Modal 
            open={open} 
            title={initialValues ? '编辑订单' : '添加订单'} 
            okText="保存" 
            cancelText="取消" 
            onCancel={onCancel} 
            onOk={() => { 
                form.validateFields().then(values => { 
                    handleCreate(values); 
                }).catch(info => { 
                    console.log('Validate Failed:', info); 
                }); 
            }}>
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={initialValues}
            >
                <Form.Item
                    name="productName"
                    label="商品名称"
                    rules={[{ required: true, message: 'Please input the product name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="customerName"
                    label="顾客用户名"
                    rules={[{ required: true, message: 'Please input the customer name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="storeName"
                    label="商品厂商"
                    rules={[{ required: true, message: 'Please input the storeName!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="金额"
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="数量"
                    rules={[{ required: true, message: 'Please input the amount!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="发货状态"
                    valuePropName="checked" 
                >
                    <Checkbox>已发货</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OrderEditModal;