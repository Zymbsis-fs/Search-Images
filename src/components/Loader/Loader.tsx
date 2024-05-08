import { FC } from 'react';
import { TailSpin } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader: FC<{}> = () => {
  return (
    <div className={css.loader}>
      <TailSpin
        visible={true}
        height="120"
        width="120"
        color="rgba(44, 81, 88, 1)"
        ariaLabel="tail-spin-loading"
        radius="3"
      />
    </div>
  );
};

export default Loader;
