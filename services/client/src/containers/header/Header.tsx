import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './header.module.scss';
import { useAtom } from 'jotai';
import { setAlertAtom } from '../../store/alert';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [_, setAlert] = useAtom(setAlertAtom);
  const [IsLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem('token'));

  console.log('LOCATION', location);

  useEffect(() => {
    setIsLoggedIn(!!window.localStorage.getItem('token'));
  }, [location.pathname]);

  const onSignOut = () => {
    window.localStorage.setItem('token', '');
    navigate('/');
    setAlert({ type: 'warning', message: 'Successfully logged out' });
  };

  return (
    <Space className={styles.headerWrapper}>
      <Link to={'/'}>
        <Button>About us</Button>
      </Link>
      {IsLoggedIn && (
        <Link to={'/profile'}>
          <Button>Profile</Button>
        </Link>
      )}
      {!IsLoggedIn && (
        <>
          <Link to={'/login'}>
            <Button>Sign in</Button>
          </Link>
          <Link to={'/register'}>
            <Button>Sign up</Button>
          </Link>
        </>
      )}
      {IsLoggedIn && (
        <Button style={{ alignSelf: 'flex-end' }} onClick={onSignOut}>
          Sign out
        </Button>
      )}
    </Space>
  );
};
