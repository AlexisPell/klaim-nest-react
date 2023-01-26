import React, { useState } from 'react';
import { Button, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import styles from './login.module.scss';
import { useAtom } from 'jotai';
import { setAlertAtom } from '../../store/alert';
import { authApi } from '../../api/auth';

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const [_, setAlert] = useAtom(setAlertAtom);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onLogin = async () => {
    if (form.password.length <= 5) {
      setAlert({ type: 'error', message: 'Password cannot be less than 6 characters' });
      return;
    }
    if (!form.email) {
      setAlert({ type: 'warning', message: 'Email is not provided' });
      return;
    }
    const isLoggedIn = await authApi.login(form);
    if (typeof isLoggedIn === 'string') {
      setAlert({ type: 'error', message: isLoggedIn });
      return;
    }
    if (isLoggedIn === true) {
      setAlert({ type: 'success', message: 'Successfully logged in' });
      navigate('/profile');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div style={{ marginBottom: '10px' }}>
        <Typography.Title level={5}>Email</Typography.Title>
        <Input
          size='large'
          type='email'
          name='email'
          value={form.email}
          onChange={onChange}
          width={200}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <Typography.Title level={5}>Password</Typography.Title>
        <Input.Password
          size='large'
          type='password'
          name='password'
          value={form.password}
          onChange={onChange}
          width={200}
        />
      </div>
      <div className={styles.footer}>
        <Link to={'/register'}>Not registered yet? Go to sign up</Link>
        <Button onClick={onLogin}>Sign in</Button>
      </div>
    </div>
  );
};
