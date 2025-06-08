import React, { useImperativeHandle } from 'react';
import { Form, Input, Modal, Switch } from 'antd';
import { forwardRef } from 'react';

const UserEditForm = forwardRef(({ initialValues }, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => form, []);

  // 自定义表单字段样式
  const formItemStyle = {
    marginBottom: '22px',
    padding: '8px 0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
  };

  return (
      <Form
          layout="vertical"
          form={form}
          initialValues={initialValues}
          preserve={false}
          style={{ padding: '0 16px' }}
      >
        <Form.Item
            name="id"
            label={<span style={{ fontWeight: 600, color: '#2c3e50' }}>编号</span>}
            style={formItemStyle}
        >
          <Input
              type="number"
              disabled
              style={{
                height: '42px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                padding: '0 16px'
              }}
          />
        </Form.Item>

        <Form.Item
            name="username"
            label={<span style={{ fontWeight: 600, color: '#2c3e50' }}>账号</span>}
            rules={[{ required: true, message: '请输入您的账号' }]}
            style={formItemStyle}
        >
          <Input
              disabled={initialValues.id === 1}
              placeholder="请输入账号"
              style={{
                height: '42px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                padding: '0 16px',
                backgroundColor: initialValues.id === 1 ? '#f9f9f9' : '#fff'
              }}
          />
        </Form.Item>

        <Form.Item
            name="password"
            label={<span style={{ fontWeight: 600, color: '#2c3e50' }}>密码</span>}
            rules={[{ required: true, message: '请输入密码' }]}
            style={formItemStyle}
        >
          <Input.Password
              placeholder="请输入密码"
              style={{
                height: '42px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                padding: '0 16px'
              }}
          />
        </Form.Item>

        <Form.Item
            name="name"
            label={<span style={{ fontWeight: 600, color: '#2c3e50' }}>姓名</span>}
            rules={[{ required: true, message: '请输入姓名' }]}
            style={formItemStyle}
        >
          <Input
              disabled={initialValues.id === 1}
              placeholder="请输入姓名"
              style={{
                height: '42px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                padding: '0 16px',
                backgroundColor: initialValues.id === 1 ? '#f9f9f9' : '#fff'
              }}
          />
        </Form.Item>

        <Form.Item
            name="email"
            label={<span style={{ fontWeight: 600, color: '#2c3e50' }}>邮箱</span>}
            rules={[
              { type: 'email', required: true, message: '邮箱格式不正确' }
            ]}
            style={formItemStyle}
        >
          <Input
              placeholder="请输入邮箱"
              style={{
                height: '42px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                padding: '0 16px'
              }}
          />
        </Form.Item>

        <Form.Item
            name="enable"
            label={<span style={{ fontWeight: 600, color: '#2c3e50' }}>是否启用</span>}
            valuePropName="checked"
            style={{ ...formItemStyle, marginBottom: '8px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Switch
                disabled={initialValues.id === 1}
                checkedChildren="启用"
                unCheckedChildren="禁用"
                style={{
                  width: '60px',
                  backgroundColor: initialValues.enable ? '#52c41a' : '#f5222d'
                }}
            />
            {initialValues.id === 1 && (
                <span style={{ marginLeft: '12px', color: '#bfbfbf', fontSize: '13px' }}>
              (管理员账号不可禁用)
            </span>
            )}
          </div>
        </Form.Item>
      </Form>
  );
});

const UserEditFormModal = ({ open, onCreate, onCancel, initialValues }) => {
  const formRef = React.createRef();

  const handleOk = async () => {
    try {
      const formInstance = formRef.current;
      if (formInstance) {
        const values = await formInstance.validateFields();
        formInstance.resetFields();
        onCreate(values);
      }
    } catch (error) {
      console.log('Failed:', error);
    }
  };

  return (
      <Modal
          open={open}
          title={
            <div style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#2c3e50',
              display: 'flex',
              alignItems: 'center',
              padding: '16px 24px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <span>用户编辑</span>
            </div>
          }
          okText="保存"
          cancelText="取消"
          okButtonProps={{
            style: {
              background: 'linear-gradient(45deg, #1890ff, #096dd9)',
              border: 'none',
              fontWeight: 600,
              boxShadow: '0 4px 10px rgba(24, 144, 255, 0.3)',
              borderRadius: '8px',
              height: '42px',
              padding: '0 24px'
            }
          }}
          cancelButtonProps={{
            style: {
              border: '1px solid #d9d9d9',
              fontWeight: 600,
              borderRadius: '8px',
              height: '42px',
              padding: '0 24px'
            }
          }}
          onCancel={onCancel}
          destroyOnClose
          onOk={handleOk}
          bodyStyle={{ padding: '0' }}
          width={600}
          style={{ borderRadius: '12px', overflow: 'hidden' }}
      >
        <div style={{ padding: '16px 0' }}>
          <UserEditForm ref={formRef} initialValues={initialValues} />
        </div>
      </Modal>
  );
};

export default UserEditFormModal;