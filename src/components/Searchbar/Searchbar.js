import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';

import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      return toast.error('Enter a normal query!');
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  handlEqueryChange = e => {
    this.setState({ query: e.target.value.toLowerCase() });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchForm__button}>
            <AiOutlineSearch size={25} fill={'black'} />
          </button>
          <input
            className={css.searchForm__input}
            type="text"
            name="search"
            value={this.state.query}
            placeholder="Search images and photos"
            onChange={this.handlEqueryChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
