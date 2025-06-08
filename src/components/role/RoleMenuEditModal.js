import React, { forwardRef, useContext, useImperativeHandle } from 'react';

import { Form, Checkbox, Modal } from 'antd';

import { ServiceContext } from '../../contexts/ServiceContext';
import { useEffect } from 'react';

const RoleMenuEditForm = forwardRef(({ initialValues }, ref) => {
  const { menu: menuService } = useContext(ServiceContext);
  const [form] = Form.useForm();

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useImperativeHandle(ref, () => form, []);

  const menuOptions = menuService.getMenus().map(menu => ({ label: menu.name, value: menu.id }));
  
  // 管理员特殊逻辑
  useEffect(() => {
    if (form.getFieldValue('id') === 1) {
      menuOptions.forEach(option => {
        option.checked = true;
        option.disabled = true;
      });
      form.setFieldsValue({menu: menuOptions.map(option => option.value)});
    }
  }, [ /* eslint-disable-line react-hooks/exhaustive-deps */]);

  return (
    <Form 
      layout="horizontal" labelCol={{span: 4}} wrapperCol={{span: 20}}
      form={form} initialValues={initialValues} preserve={false}
    >
      <Form.Item name="menu" label="菜单">
        <Checkbox.Group options={menuOptions}/>
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
        // 管理员特殊逻辑
        if (values.id === 1) {
          values.menu = ['*'];
        }
        onCreate(values);
      }
    } catch (error) {
      console.log('Failed:', error);
    }
  };

  return (
    <Modal
      open={open}
      title="角色菜单编辑"
      okText="确定"
      cancelText="取消"
      okButtonProps={{ autoFocus: true }}
      onCancel={onCancel}
      destroyOnClose
      onOk={handleOk}
    >
      <RoleMenuEditForm ref={formRef} initialValues={initialValues} />
    </Modal>
  );
};

export default RoleMenuEditFormModal;