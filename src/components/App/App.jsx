import { Searchbar } from '../Searchbar/Searchbar';
import { getImages } from '../../services/api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loadedImages, setLoadedImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageInModal, setImageInModal] = useState({
    link: '',
    alt: '',
  });

  const showNotificationAfterQuery = useCallback(
    images => {
      if (page === 1) {
        images.hits.length > 0
          ? toast.success(`🦄 Wow! We found ${images.total} results!`, {
              theme: 'dark',
            })
          : toast.warn(`Sorry, but there are no results for your query`, {
              theme: 'dark',
            });
      }
    },
    [page]
  );

  useEffect(() => {
    if (searchQuery !== '') {
      try {
        setIsLoading(true);

        getImages(searchQuery, page).then(res => {
          setLoadedImages(prev => [...prev, ...res.hits]);
          showNotificationAfterQuery(res);
          setIsLoading(false);
        });
      } catch (error) {
        toast.error('Oops, something went wrong :(');
        console.log(error);
      }
    }
  }, [page, searchQuery, showNotificationAfterQuery]);

  const handleLoadMoreClick = () => {
    setPage(prev => prev + 1);
  };

  const handleFormSubmit = ssearchQuery => {
    if (searchQuery !== ssearchQuery) {
      setSearchQuery(ssearchQuery);
      setPage(1);
      setLoadedImages([]);
    }
  };

  const handleImageClick = image => {
    const { largeImageURL, tags } = image;

    setIsLoading(true);
    setIsModalOpen(true);
    setImageInModal({ link: largeImageURL, alt: tags });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalImageLoaded = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>

      <ImageGallery
        images={loadedImages}
        onClick={handleImageClick}
      ></ImageGallery>

      {isLoading && (
        <PacmanLoader
          color="#3f51b5"
          size="30px"
          cssOverride={{
            display: 'block',
            margin: '0 auto ',
            borderColor: '#3f51b5',
          }}
        />
      )}

      {loadedImages.length > 0 && isLoading === false && (
        <Button text="Load more" onClick={handleLoadMoreClick}></Button>
      )}

      {isModalOpen && (
        <Modal
          image={imageInModal}
          onClose={handleModalClose}
          onLoad={handleModalImageLoaded}
        ></Modal>
      )}

      <ToastContainer />
    </>
  );
};
