import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import getPicturesPixabayApi from '../../services/pixabay-api';

import { Loader } from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

class App extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      error: null,
      showModal: false,
      tags: '',
      largeImageURL: '',
      loading: false,
      showButton: false,
    });
  };

  componentDidUpdate = (_, prevState) => {
    const prevQuery = prevState.query;
    const { query, page, images } = this.state;

    if (prevQuery !== query || prevState.page !== page) {
      this.setState({ loading: true });

      getPicturesPixabayApi(query, page, images)
        .then(images => {
          images.data.hits.length === 0 &&
            toast.warn('There are no images for this search');

          if (page < Math.ceil(images.data.totalHits / 12)) {
            this.setState({ showButton: true });
          } else this.setState({ showButton: false });

          if (prevQuery !== query) {
            this.setState({ images: [...images.data.hits] });
          } else
            this.setState({
              images: [...prevState.images, ...images.data.hits],
            });

          if (images.length > 12) {
            this.pageScroll();
          }
        })
        .catch(error => {
          this.setState({
            error: toast.error('Enter a normal query!'),
          });
        })
        .finally(() => this.setState({ loading: false }));
    }
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  pageScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = (tags, largeImageURL) => {
    this.setState({ tags, largeImageURL });
    this.toggleModal();
  };

  render() {
    const {
      showModal,
      tags,
      largeImageURL,
      query,
      page,
      images,
      loading,
      showButton,
    } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {loading && <Loader />}

        {images && (
          <ImageGallery
            query={query}
            page={page}
            images={images}
            loadMore={this.loadMore}
            onImageClick={this.onImageClick}
          />
        )}

        {showButton && <Button loadMore={this.loadMore} />}

        {showModal && (
          <Modal
            onClose={this.toggleModal}
            tags={tags}
            largeImageURL={largeImageURL}
          />
        )}

        <ToastContainer autoClose={5000} />
      </div>
    );
  }
}

export default App;
