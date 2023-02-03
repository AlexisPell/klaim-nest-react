import React, { useEffect } from 'react';
import { redirect } from 'react-router-dom';

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = ({}) => {
  useEffect(() => {
    redirect('/');
  }, []);
  return <div></div>;
};
