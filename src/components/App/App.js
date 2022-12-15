import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
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
    images: [],
    page: 1,
    error: null,
    showModal: false,
    tags: '',
    largeImageURL: '',
    loading: false,
  };

  handleFormSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  fetchApi = () => {
    const { query, page } = this.state;

    getPicturesPixabayApi(query, page)
      .then(({ data: { hits } }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  loadMore = () => {
    this.fetchApi(this.state.page);
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const { query, page, images } = this.state;

    if (prevQuery !== query) {
      this.setState({ loading: true });
      this.fetchApi(query, page);
    }

    if (images.length > 12) {
      this.pageScroll();
    }
  }

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
    const { showModal, tags, largeImageURL, query, page, images, loading } =
      this.state;

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


        {images.length >= 12 && <Button loadMore={this.loadMore} />}

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
