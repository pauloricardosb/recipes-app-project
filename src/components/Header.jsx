import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profiler from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
// import InputSearch from './InputSearch';
import SearchBar from './SearchBar';
import '../styles/Header.css';

// import { Container } from './styles';

function Header({ title, hasSearch }) {
  const [isSearch, setIsSearch] = useState(false);
  const handleSearch = () => (!isSearch ? setIsSearch(true) : setIsSearch(false));
  return (
    <div className="main-header">
      <Link to="/profile">
        <img
          className="profile-icon"
          src={ profiler }
          alt="icone-perfil"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 className="page-title" data-testid="page-title">{title}</h1>
      {hasSearch && (
        <div>
          <button
            type="button"
            onClick={ handleSearch }
            className="search-button"
          >
            <img
              src={ search }
              alt="icone-search"
              data-testid="search-top-btn"
              className="search-icon"
            />
          </button>
          {isSearch && <SearchBar /> }
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearch: PropTypes.bool.isRequired,
};

export default Header;
