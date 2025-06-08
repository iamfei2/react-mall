import React, { useImperativeHandle } from 'react';

import { Form, Input, Modal, Switch, InputNumber } from 'antd';
import { forwardRef } from 'react';

const MenuEditForm = forwardRef(({ initialValues }, ref) => {
  const [form] = Form.useForm();

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useImperativeHandle(ref, () => form, []);

  return (
    <Form 
      layout="horizontal" labelCol={{span: 4}} wrapperCol={{span: 20}}
      form={form} initialValues={initialValues} preserve={false}
    >
      <Form.Item name="id" label="编号">
        <Input type="number" disabled/>
      </Form.Item>
      <Form.Item name="name" label="菜单"
        rules={[
          {
            required: true,
            message: '请输入菜单名称',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="parent" label="父级"
        rules={[
          {
            type: 'number',
            required: true,
            message: '请输入父级菜单编号, 0为顶级菜单',
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name="path" label="路径"
        rules={[
          {
            required: true,
            message: '请输入路径',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="enable" label="是否启用" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  );
});

const MenuEditFormModal = ({ open, onCreate, onCancel, initialValues }) => {
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
      title="菜单编辑"
      okText="确定"
      cancelText="取消"
      okButtonProps={{
        autoFocus: true,
      }}
      onCancel={onCancel}
      destroyOnClose
      onOk={handleOk}
    >
      <MenuEditForm
        ref={formRef}
        initialValues={initialValues}
      />
    </Modal>
  );
};

export default MenuEditFormModal;