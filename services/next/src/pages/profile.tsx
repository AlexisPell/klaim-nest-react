import React from 'react';
import Head from 'next/head';

import styles from '@/styles/Home.module.scss';

import { HeaderComponent } from '../layouts/Header/Header.component';

export default function Page({}) {
  return (
    <>
      <Head>
        <title>Klaim | Profile</title>
        <meta name='description' content='Klaim test application' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.pageWrapper}>
        <HeaderComponent />
        profile
      </div>
    </>
  );
}
