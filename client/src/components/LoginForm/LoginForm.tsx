import React, { FC, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useActions } from '../../hooks/useActions';
import { rules } from '../../utils/rules';

const LoginForm: FC = () => {
  const { login } = useActions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    login(username, password);
  };
  return (
    <Form onFinish={submit}>
      <Form.Item label="имя пользователя" name="login" rules={[rules.required('Введите логин')]}>
        <Input value={username} onChange={evt => setUsername(evt.target.value)} />
      </Form.Item>

      <Form.Item label="введите пароль" name="password" rules={[rules.required('Введите пароль')]}>
        <Input.Password value={password} onChange={evt => setPassword(evt.target.value)} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
