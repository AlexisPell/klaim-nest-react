import React, { useEffect, useState } from 'react';
import { authApi } from '../../api/auth';
import { IUser } from '../../interfaces/user';

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
  const { me, setMe } = useGetMe();

  console.log(me);

  return <div>My profile page</div>;
};

const useGetMe = () => {
  const [me, setMe] = useState<IUser | null>(null);

  useEffect(() => {
    const getMe = async () => {
      const me = await authApi.getProfile();
      setMe(me);
    };
    getMe();
  }, []);

  return { me, setMe };
};
