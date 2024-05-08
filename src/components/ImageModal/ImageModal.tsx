import ReactModal from 'react-modal';
import { FC } from 'react';
import { ImgDetails } from '../../types';
import { FaWindowClose } from 'react-icons/fa';
import css from './ImageModal.module.css';

interface ImageModalProps {
  isOpen: boolean;
  image: ImgDetails | null;
  setter: (newValue: boolean) => void;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, image, setter }) => {
  ReactModal.setAppElement('#root');
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setter(false)}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      bodyOpenClassName={css.myModal}
      overlayClassName={css.myOverlay}
      className={css.modal}
    >
      {image && (
        <>
          <button
            className={css.closeButton}
            onClick={() => setter(false)}
            aria-label="close button"
          >
            <FaWindowClose className={css.modalIcon} size={30} />
          </button>
          <div className={css.modalImgWrapper}>
            <img
              className={css.modalImg}
              src={image.regular}
              alt={image.alt_description}
            />
          </div>
        </>
      )}
    </ReactModal>
  );
};

export default ImageModal;
