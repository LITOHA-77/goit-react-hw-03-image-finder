import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ tags, webformatURL, largeImageURL, onClick }) => (
  <li className={css.imageGalleryItem}>
    <img
      src={webformatURL}
      alt={tags}
      className={css.imageGalleryItem__image}
      onClick={() => onClick(tags, largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
