import React from 'react';
import Header from '../components/Header';
import '../styles/DoneRecipes.css';
import ButtonFilterDone from '../components/ButtonFilterDone';

function DoneRecipes() {
  const bool = false;

  return (
    <div>
      <Header title="Done Recipes" hasSearch={ bool } />
      <ButtonFilterDone />
    </div>
  );
}

export default DoneRecipes;
