import React from 'react';
import Header from '../components/Header';
import ButtonFilterFavorite from '../components/ButtonFilterFavorite';

function FavoritesRecipes() {
  const bool = false;

  return (
    <div>
      <Header title="Favorite Recipes" hasSearch={ bool } />
      <ButtonFilterFavorite />
    </div>
  );
}

export default FavoritesRecipes;
