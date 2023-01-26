import React, { useState } from 'react';
import { Button, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import styles from './register.module.scss';
import { useAtom } from 'jotai';
import { setAlertAtom } from '../../store/alert';
import { authApi } from '../../api/auth';

interface RegisterProps {}
export const Register: React.FC<RegisterProps> = ({}) => {
  const [_, setAlert] = useAtom(setAlertAtom);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    fullname: '',
    password: '',
    password2: '',
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onRegister = async () => {
    if (form.password.length <= 5) {
      setAlert({ type: 'error', message: 'Password cannot be less than 6 characters' });
      return;
    }
    if (form.password !== form.password2) {
      setAlert({ type: 'error', message: 'Passwords do not match' });
      return;
    }
    if (!form.email) {
      setAlert({ type: 'warning', message: 'Email is not provided' });
      return;
    }
    if (!form.fullname) {
      setAlert({ type: 'warning', message: 'Fullname is not provided' });
      return;
    }
    const isRegistered = await authApi.register({
      email: form.email,
      password: form.password,
      fullname: form.fullname,
    });
    if (typeof isRegistered === 'string') {
      setAlert({ type: 'error', message: isRegistered });
      return;
    }
    if (isRegistered === true) {
      setAlert({ type: 'success', message: 'Successfully registered in' });
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
        <Typography.Title level={5}>Fullname</Typography.Title>
        <Input size='large' name='fullname' value={form.fullname} onChange={onChange} width={200} />
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
      <div style={{ marginBottom: '10px' }}>
        <Typography.Title level={5}>Confirm password</Typography.Title>
        <Input.Password
          size='large'
          type='password'
          name='password2'
          value={form.password2}
          onChange={onChange}
          width={200}
        />
      </div>
      <div className={styles.footer}>
        <Link to={'/login'}>Already have an account? Go and sign in</Link>
        <Button onClick={onRegister}>Sign in</Button>
      </div>
    </div>
  );
};
