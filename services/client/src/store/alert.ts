import { atom } from 'jotai';

const defaultAlert: IAlert = {
  type: 'success',
  message: '',
};

interface IAlert {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}
export const alertAtom = atom<IAlert>(defaultAlert);

export const setAlertAtom = atom<null, IAlert>(null, async (get, set, alert) => {
  set(alertAtom, alert);
  setTimeout(() => set(alertAtom, defaultAlert), 2500);
});
