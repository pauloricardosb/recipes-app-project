import React, { useContext } from 'react';
import Context from '../context/context';
import '../styles/SearchBar.css';

// import { Container } from './styles';

function SearchBar() {
  const { setRadios, handleSubmit, setInputSearch } = useContext(Context);
  const handleChanges = ({ target: { value } }) => {
    setInputSearch(value);
  };

  return (
    <div className="search-bar">
      <span className="close">&times;</span>
      <div className="radios">
        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            name="radio"
            onChange={ () => setRadios('ingredient') }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            data-testid="name-search-radio"
            name="radio"
            onChange={ () => setRadios('name') }
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            id="firstLetter"
            data-testid="first-letter-search-radio"
            name="radio"
            onChange={ () => setRadios('firstLetter') }
          />
          Primeira letra
        </label>
      </div>
      <div className="pesquisa">
        <input
          type="text"
          id="input-search"
          className="input-search"
          name="inputSearch"
          data-testid="search-input"
          onChange={ handleChanges }
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          className="search-button"
          onClick={ handleSubmit }
        >
          Buscar

        </button>

      </div>
    </div>
  );
}

export default SearchBar;
