import { FC } from 'react';
import { ImgArray } from '../../types';
import css from './Notifications.module.css';

interface NotificationsProps {
  condition: ImgArray | null;
}

const Notifications: FC<NotificationsProps> = ({ condition }) => {
  if (condition === null) return;
  return (
    <>
      {condition.length === 0 ? (
        <p className={css.notification}>Nothing found. Try another request</p>
      ) : (
        <p className={css.notification}>That is all we have got for you</p>
      )}
    </>
  );
};

export default Notifications;
