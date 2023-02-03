import React from 'react';
import { Alert as AntdAlert, message } from 'antd';
import { useAtom } from 'jotai';
import { alertAtom } from '../../store/alert';

interface AlertProps {}
export const Alert: React.FC<AlertProps> = () => {
  const [{ type, message }, setAlert] = useAtom(alertAtom);

  return <AntdAlert banner message={message} type={type} closable />;
};
