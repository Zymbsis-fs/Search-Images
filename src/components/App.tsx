import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ImgArray, ImgDetails } from '../types';
import splashRequest from '../splash-api';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageModal from './ImageModal/ImageModal';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Notifications from './Notifications/Notifications';
import './App.css';

interface SplashData {
  results: ImgArray;
  total_pages: number;
}

function App() {
  const [imageArray, setImageArray] = useState<ImgArray | null>(null);
  const [valueForSearch, setValueForSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadMoreButton, setLoadMoreButton] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<ImgDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const imgGalleryRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!valueForSearch.length) {
      return;
    }
    async function fetchFunction(): Promise<void> {
      try {
        setLoadMoreButton(false);
        setLoading(true);
        setError(false);
        const { results, total_pages }: SplashData = await splashRequest(
          currentPage,
          valueForSearch
        );
        setImageArray(prev => (prev ? [...prev, ...results] : results));
        if (total_pages > currentPage) {
          setLoadMoreButton(true);
        } else if (total_pages === currentPage || total_pages === 0) {
          setNotification(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchFunction();
  }, [valueForSearch, currentPage]);

  useLayoutEffect(() => {
    if (imgGalleryRef.current !== null && currentPage > 1) {
      const elemHeight: number = (
        imgGalleryRef.current?.lastChild as HTMLElement
      ).getBoundingClientRect().height;
      const valueForScrollWindow: number = Math.ceil(elemHeight * 2.5);
      window.scrollBy({ top: valueForScrollWindow, behavior: 'smooth' });
    }
  }, [imageArray, currentPage]);

  const onSearch = (value: string): void => {
    if (value === valueForSearch) {
      return;
    }
    setNotification(false);
    setCurrentPage(1);
    setValueForSearch(value);
    setImageArray(null);
  };

  const onClick = (): void => {
    setCurrentPage(currentPage + 1);
  };

  const onImageClick = (obj: ImgDetails): void => {
    setIsModalOpen(true);
    setModalImage(obj);
  };

  return (
    <>
      <SearchBar onSearch={onSearch} />
      <div className="img-container">
        {Array.isArray(imageArray) && imageArray.length && (
          <ImageGallery
            imgData={imageArray}
            onClick={onImageClick}
            ref={imgGalleryRef}
          />
        )}
        {loading && <Loader />}
        {notification && <Notifications condition={imageArray} />}
        {loadMoreButton && <LoadMoreBtn onClick={onClick} />}
        {error && <ErrorMessage />}
      </div>
      <ImageModal
        isOpen={isModalOpen}
        image={modalImage}
        setter={setIsModalOpen}
      />
    </>
  );
}

export default App;
