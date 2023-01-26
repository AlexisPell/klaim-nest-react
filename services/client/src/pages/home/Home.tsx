import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

import styles from './home.module.scss';
import { generalApi } from '../../api/general';

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const { info } = getInfo();

  return <div className={styles.homeWrapper}>{info ? <h3>{info}</h3> : <Spin />}</div>;
};

const getInfo = () => {
  const [info, setInfo] = useState('');

  useEffect(() => {
    async function fetchInfo() {
      const info = await generalApi.getInfo();
      setInfo(info);
    }
    fetchInfo();
  }, []);

  return { info };
};
