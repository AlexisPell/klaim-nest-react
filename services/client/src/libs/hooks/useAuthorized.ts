import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { setAlertAtom } from '../../store/alert';

export const useAuthorized = () => {
  const [_, setAlert] = useAtom(setAlertAtom);
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');
  if (!token) {
    setAlert({ message: 'Unauthorized', type: 'error' });
    navigate('/');
  }
};
