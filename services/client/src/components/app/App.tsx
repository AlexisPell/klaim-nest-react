import React from 'react';
import { Routes, Route } from 'react-router-dom';

import styles from './app.module.scss';
import { Header } from '../header/Header';
import { Home } from '../../pages/home/Home';
import { Login } from '../../pages/login/Login';
import { Register } from '../../pages/register/Register';
import { Alert } from '../alert/Alert';
import { useAtom } from 'jotai';
import { alertAtom } from '../../store/alert';
import { Profile } from '../../pages/profile/Profile';
import { NotFound } from '../../pages/notFound/NotFound';

interface AppProps {}
export const App: React.FC<AppProps> = ({}) => {
  const [alert] = useAtom(alertAtom);
  return (
    <div className={styles.appWrapper}>
      <Header />
      {alert.message && <Alert />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};
