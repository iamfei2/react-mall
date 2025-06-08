import React, { forwardRef, useContext, useImperativeHandle } from 'react';

import { Form, Checkbox, Modal } from 'antd';

import { ServiceContext } from '../../contexts/ServiceContext';
import { useEffect } from 'react';

const UserRoleEditForm = forwardRef(({ initialValues }, ref) => {
  const { role: roleService } = useContext(ServiceContext);
  const [form] = Form.useForm();

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useImperativeHandle(ref, () => form, []);

  const roleOptions = roleService.getRoles().map(role => ({ label: role.name, value: role.id }));
  
  // 管理员特殊逻辑
  useEffect(() => {
    if (form.getFieldValue('id') === 1) {
      roleOptions.forEach(option => {
        if (option.value === 1) {
          option.checked = true;
        }
        option.disabled = true;
      });
      form.setFieldsValue({role: roleOptions.map(option => option.value)});
    }
  }, [ /* eslint-disable-line react-hooks/exhaustive-deps */]);

  return (
    <Form 
      layout="horizontal" labelCol={{span: 4}} wrapperCol={{span: 20}}
      form={form} initialValues={initialValues} preserve={false}
    >
      <Form.Item name="role" label="角色">
        <Checkbox.Group options={roleOptions}/>
      </Form.Item>
    </Form>
  );
});

const UserRoleEditFormModal = ({ open, onCreate, onCancel, initialValues }) => {
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
      title="用户角色编辑"
      okText="确定"
      cancelText="取消"
      okButtonProps={{ autoFocus: true }}
      onCancel={onCancel}
      destroyOnClose
      onOk={handleOk}
    >
      <UserRoleEditForm ref={formRef} initialValues={initialValues} />
    </Modal>
  );
};

export default UserRoleEditFormModal;