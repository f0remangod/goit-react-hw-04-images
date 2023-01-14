import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { getImages } from '../../services/api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PacmanLoader from 'react-spinners/PacmanLoader';

export class App extends Component {
  state = {
    searchQuery: '',
    loadedImages: [],
    error: false,
    page: 1,
    isLoading: false,
    isModalOpen: false,
    imageUrl: '',
    imageInModal: {
      link: '',
      alt: '',
    },
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });

        const images = await getImages(searchQuery, page);

        this.setState(state => ({
          loadedImages: [...state.loadedImages, ...images.hits],
        }));

        this.showNotificationAfterQuery(images);
      } catch (error) {
        this.setState({ error: true });

        toast.error('Oops, something went wrong :(');

        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  showNotificationAfterQuery = images => {
    if (this.state.page === 1) {
      images.hits.length > 0
        ? toast.success(`🦄 Wow! We found ${images.total} results!`, {
            theme: 'dark',
          })
        : toast.warn(`Sorry, but there are no results for your query`, {
            theme: 'dark',
          });
    }
  };

  handleLoadMoreClick = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery !== searchQuery) {
      this.setState({ searchQuery, page: 1, loadedImages: [] });
    }
  };

  handleImageClick = image => {
    const { largeImageURL, tags } = image;

    this.setState({
      isLoading: true,
      isModalOpen: true,
      imageInModal: {
        link: largeImageURL,
        alt: tags,
      },
    });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  handleModalImageLoaded = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const { loadedImages, isLoading, isModalOpen, imageInModal } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>

        <ImageGallery
          images={loadedImages}
          onClick={this.handleImageClick}
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
          <Button text="Load more" onClick={this.handleLoadMoreClick}></Button>
        )}

        {isModalOpen && (
          <Modal
            image={imageInModal}
            onClose={this.handleModalClose}
            onLoad={this.handleModalImageLoaded}
          ></Modal>
        )}

        <ToastContainer />
      </>
    );
  }
}
