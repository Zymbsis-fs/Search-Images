import { FC } from 'react';
import error from '../../img/oops.png';
import css from './ErrorMessage.module.css';

const ErrorMessage: FC<{}> = () => {
  return (
    <div>
      <img
        className={css.errorMessage}
        src={error}
        alt="Bad request"
        width={574}
        height={600}
      />
      <p className={css.errorText}>
        Oops! It is like something went wrong. Please, reload your page or try
        again later
      </p>
    </div>
  );
};
export default ErrorMessage;
