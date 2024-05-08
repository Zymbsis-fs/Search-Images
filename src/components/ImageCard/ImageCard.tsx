import { FC } from 'react';
import { ImgDetails, ImgInstance } from '../../types';
import css from './ImageCard.module.css';

interface ImageCardProps {
  imgData: Omit<ImgInstance, 'id'>;
  onClick: (obj: ImgDetails) => void;
}

const ImageCard: FC<ImageCardProps> = ({
  imgData: {
    urls: { small, regular },
    alt_description,
  },
  onClick,
}) => {
  return (
    <>
      <div className={css.imgWrapper}>
        <img
          src={small}
          alt={alt_description}
          width={300}
          height={250}
          onClick={() => onClick({ regular, alt_description })}
        />
      </div>
    </>
  );
};
export default ImageCard;
