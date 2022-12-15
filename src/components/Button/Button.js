import PropTypes from 'prop-types';

import css from './Button.module.css';

const Button = ({ loadMore }) => (
  <div className={css.container}>
    <button type="button" className={css.button} onClick={loadMore}>
      Load more
    </button>
  </div>
);

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
