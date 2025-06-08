import React, { forwardRef, useContext, useImperativeHandle, useEffect } from 'react';
import { Form, Checkbox, Modal, Tag, Row, Col } from 'antd';
import { blue, green, purple } from "@ant-design/colors";
import { ServiceContext } from '../../contexts/ServiceContext';

const RoleMenuEditForm = forwardRef(({ initialValues }, ref) => {
  const { menu: menuService } = useContext(ServiceContext);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => form, []);

  const menuOptions = menuService.getMenus().map(menu => ({
    label: menu.name,
    value: menu.id,
    style: { marginBottom: '12px' }
  }));

  // 管理员特殊逻辑
  useEffect(() => {
    if (form.getFieldValue('id') === 1) {
      menuOptions.forEach(option => {
        option.checked = true;
        option.disabled = true;
      });
      form.setFieldsValue({ menu: menuOptions.map(option => option.value) });
    }
  }, []);

  return (
      <Form
          layout="vertical"
          form={form}
          initialValues={initialValues}
          preserve={false}
          style={{ padding: '16px 24px' }}
      >
        <Form.Item
            name="menu"
            label={
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#2c3e50',
                marginBottom: '16px'
              }}>
                菜单权限
                <Tag color="gold" style={{ marginLeft: '8px' }}>
                  勾选后可访问
                </Tag>
              </div>
            }
        >
          <Checkbox.Group
              options={menuOptions}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}
          />
        </Form.Item>
      </Form>
  );
});

const RoleMenuEditFormModal = ({ open, onCreate, onCancel, initialValues }) => {
  const formRef = React.createRef();

  const handleOk = async () => {
    try {
      const formInstance = formRef.current;
      if (formInstance) {
        const values = await formInstance.validateFields();
        formInstance.resetFields();
        if (values.id === 1) {
          values.menu = ['*'];
        }
        onCreate(values);
      }
    } catch (error) {
      console.log('Failed:', error);
    }
  };

  const isAdmin = initialValues?.id === 1;

  return (
      <Modal
          open={open}
          title={
            <div style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#2c3e50',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span>角色菜单权限配置</span>
              {isAdmin && (
                  <Tag color="purple" style={{ marginLeft: '12px' }}>
                    管理员权限
                  </Tag>
              )}
            </div>
          }
          okText="保存配置"
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
          width={680}
          style={{ borderRadius: '12px', overflow: 'hidden' }}
          maskStyle={{ background: 'rgba(0, 0, 0, 0.45)' }}
      >
        <div style={{
          background: isAdmin ? 'rgba(114, 46, 209, 0.05)' : '#fff',
          borderTop: isAdmin ? '2px solid rgba(114, 46, 209, 0.3)' : 'none',
          borderBottom: isAdmin ? '2px solid rgba(114, 46, 209, 0.3)' : 'none',
          padding: '16px 0'
        }}>
          <RoleMenuEditForm ref={formRef} initialValues={initialValues} />
        </div>

        {isAdmin && (
            <div style={{
              background: 'rgba(255, 229, 100, 0.2)',
              padding: '12px 24px',
              borderTop: '1px solid rgba(0, 0, 0, 0.05)',
              fontSize: '14px',
              color: '#8c6e12'
            }}>
              <strong>管理员提示：</strong> 系统管理员默认拥有所有菜单权限，此配置不可更改。
            </div>
        )}
      </Modal>
  );
};

export default RoleMenuEditFormModal;