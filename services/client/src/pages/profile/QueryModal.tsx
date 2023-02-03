import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useAtom } from 'jotai';

import { setAlertAtom } from '../../store/alert';
import { IAuthor } from '../../interfaces/author';
import { IQuote } from '../../interfaces/quote';
import { authorApi } from '../../api/author';
import { quoteApi } from '../../api/quote';
import { timeout } from '../../libs/utils/timeout';

interface QueryModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  passAuthor: (a: IAuthor | null) => void;
  passQuote: (q: IQuote | null) => void;
}
export const QueryModal: React.FC<QueryModalProps> = ({ open, setOpen, passQuote, passAuthor }) => {
  const [_, setAlert] = useAtom(setAlertAtom);

  const { modalText } = useQueryModal({ setOpen, passQuote, passAuthor });

  const onModalCancel = () => {
    setAlert({ message: 'Request cancelled', type: 'warning' });
    setOpen(false);
  };

  return (
    <Modal
      title={<h3>Requesting the quote</h3>}
      open={open}
      confirmLoading={true}
      onCancel={onModalCancel}
      okText='Querying...'
    >
      {modalText.map((str) => (
        <p key={str}>{str}</p>
      ))}
    </Modal>
  );
};

const useQueryModal = ({
  passAuthor,
  passQuote,
  setOpen,
}: {
  setOpen: (value: boolean) => void;
  passAuthor: (a: IAuthor | null) => void;
  passQuote: (q: IQuote | null) => void;
}) => {
  const [_, setAlert] = useAtom(setAlertAtom);
  const [modalText, setModalText] = useState<string[]>([]);

  const [author, setAuthor] = useState<IAuthor | null>(null);
  const [quote, setQuote] = useState<IQuote | null>(null);
  const [authorPending, setAuthorPending] = useState(false);
  const [quotePending, setQuotePending] = useState(false);

  useEffect(() => {
    async function getData() {
      setAuthorPending(true);
      const [author] = await Promise.all([await authorApi.getRandomAuthor(), timeout(2000)]);
      if (typeof author === 'string') {
        setAlert({ message: 'Error querying author, try later', type: 'warning' });
        setOpen(false);
        return;
      }
      setAuthor(author);
      setAuthorPending(false);

      setQuotePending(true);
      const [quote] = await Promise.all([
        await quoteApi.getRandomQuoteByAuthorId(author.id),
        timeout(2000),
      ]);
      if (typeof quote === 'string') {
        setAlert({ message: 'Error querying, try later', type: 'warning' });
        setOpen(false);
        return;
      }
      setQuote(quote);
      setQuotePending(false);
    }
    getData();
  }, []);

  useEffect(() => {
    if (authorPending) {
      setModalText(['Step 1: Requesting author..']);
    }
    if (quotePending) {
      setModalText(['Step 1: Requesting author.. Completed', 'Step 2: Requesting quote..']);
    }
    if (author && quote) {
      passAuthor(author);
      passQuote(quote);
      setOpen(false);
      setAlert({ type: 'success', message: 'Successfully queried author and one of his quotes' });
    }
  }, [author, quote, quotePending, authorPending]);

  return { modalText };
};
