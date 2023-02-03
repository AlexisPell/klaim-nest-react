import React, { useEffect, useState } from 'react';
import { Button, Card, Image, Typography } from 'antd';

import styles from './profile.module.scss';
import { authApi } from '../../api/auth';
import { IUser } from '../../interfaces/user';
import { QueryModal } from './QueryModal';
import { useAuthorized } from '../../libs/hooks/useAuthorized';
import { IAuthor } from '../../interfaces/author';
import { IQuote } from '../../interfaces/quote';

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
  useAuthorized();
  const { me } = useGetMe();
  const [author, setAuthor] = useState<IAuthor | null>(null);
  const [quote, setQuote] = useState<IQuote | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setAuthor(null);
    setQuote(null);
    setModalOpen(true);
  };

  return (
    <div style={{ margin: '15px' }}>
      <div className={styles.headerWrapper}>
        <Image
          preview={false}
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBD3ZOo-lpfThztDe2tvbLrnrIgzGblHvsz092s12ZpYcJJ8gASUiEnBnpqQDIWHMqmMU&usqp=CAU'
          className={styles.img}
        />
        <div className={styles.infoWrapper}>
          {me?.fullname && <Typography.Title level={1}>Welcome, {me?.fullname}</Typography.Title>}
          <div>
            <Button onClick={showModal}>Query random author and his quote</Button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <QueryModal
          open={modalOpen}
          setOpen={setModalOpen}
          passAuthor={setAuthor}
          passQuote={setQuote}
        />
      )}
      {author && quote && (
        <div className={styles.authorAndQuoteInfo}>
          <Card title={author.name} style={{ width: 300 }}>
            <p>
              <b>Great words of great people</b>
            </p>
            <p>{quote.quote}</p>
          </Card>
        </div>
      )}
    </div>
  );
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
