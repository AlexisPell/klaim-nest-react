import React from 'react';
import { Button, Space } from 'antd';
import styles from './Header.module.scss';
import { useRouter } from 'next/router';

interface HeaderComponentProps {}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({}) => {
  const router = useRouter();
  console.log('r', router.pathname);

  const onClickAbout = () => {
    router.push('/');
  };

  const onCLickProfile = () => {
    router.push('/profile');
  };

  const onSignIn = () => {
    router.push('/signin');
  };

  const onSignUp = () => {
    router.push('/signup');
  };

  const onSignOut = () => {
    console.log('ON SIGN OUT');
  };

  return (
    <Space className={styles.headerWrapper}>
      <Button onClick={onClickAbout}>About us</Button>
      <Button onClick={onCLickProfile}>Profile</Button>
      <Button onClick={onSignIn}>Sign in</Button>
      <Button onClick={onSignUp}>Sign up</Button>
      <Button onClick={onSignOut}>Sign out</Button>
    </Space>
  );
};
