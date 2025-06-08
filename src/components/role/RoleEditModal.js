import React, { useImperativeHandle } from 'react';

import { Form, Input, Modal, Switch } from 'antd';
import { forwardRef } from 'react';

const RoleEditForm = forwardRef(({ initialValues }, ref) => {
  const [form] = Form.useForm();

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useImperativeHandle(ref, () => form, []);

  return (
    <Form 
      layout="horizontal" labelCol={{span: 4}} wrapperCol={{span: 20}}
      form={form} initialValues={initialValues} preserve={false}
    >
      <Form.Item name="id" label="编号">
        <Input disabled/>
      </Form.Item>
      <Form.Item name="name" label="角色"
        rules={[
          {
            required: true,
            message: '请输入角色名称',
          },
        ]}
      >
        <Input disabled={initialValues.id === 1}/>
      </Form.Item>
      <Form.Item name="desc" label="描述"
        rules={[
          {
            required: true,
            message: '请输入描述',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="enable" label="是否启用" valuePropName="checked">
        <Switch disabled={initialValues.id === 1} />
      </Form.Item>
    </Form>
  );
});

const RoleEditFormModal = ({ open, onCreate, onCancel, initialValues }) => {
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
      title="角色编辑"
      okText="确定"
      cancelText="取消"
      okButtonProps={{
        autoFocus: true,
      }}
      onCancel={onCancel}
      destroyOnClose
      onOk={handleOk}
    >
      <RoleEditForm
        ref={formRef}
        initialValues={initialValues}
      />
    </Modal>
  );
};

export default RoleEditFormModal;