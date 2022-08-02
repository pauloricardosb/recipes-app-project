import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const FilterBtns = () => {
  const history = useHistory();
  const [allRecipesDone, setAllRecipesDone] = useState([]);
  const [load, setLoad] = useState(false);
  const [appearLink, setAppearLink] = useState(false);

  const remove = (value) => {
    console.log('value', value);
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

    favorite.splice(favorite.findIndex((fav) => fav.id === value), 1);

    document.location.reload(true);
    return localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
  };

  useEffect(() => {
    setAllRecipesDone(JSON.parse(localStorage.getItem('favoriteRecipes')));
    setLoad(true);
  }, []);

  const getOnlyDrinks = () => {
    const xab = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const onlyDrinks = xab.filter((drink) => (
      drink.type === 'drink'
    ));
    setAllRecipesDone(onlyDrinks);
  };

  const getOnlyFoods = () => {
    const xib = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const onlyFoods = xib.filter((food) => (
      food.type === 'food'
    ));
    setAllRecipesDone(onlyFoods);
  };

  const getAllRecipes = () => {
    const all = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setAllRecipesDone(all);
  };

  const shareUrlFood = (id) => {
    const endpoint = `http://localhost:3000/foods/${id}`;
    const url = navigator.clipboard.writeText(endpoint);
    setAppearLink(true);
    return url;
  };

  const shareUrlDrink = (id) => {
    const endpoint = `http://localhost:3000/drinks/${id}`;
    const url = navigator.clipboard.writeText(endpoint);
    setAppearLink(true);
    return url;
  };

  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        name="btnAll"
        onClick={ getAllRecipes }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        name="btnFood"
        onClick={ getOnlyFoods }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        name="btnDrink"
        onClick={ getOnlyDrinks }
      >
        Drinks
      </button>

      <div>
        {allRecipesDone !== null && load && allRecipesDone.map((item, i) => (

          <div key={ i }>
            {item.type === 'food' && (
              <div>
                <button
                  type="button"
                  onClick={ () => history.push(`/foods/${item.id}`) }
                >
                  <img
                    src={ item.image }
                    style={ { width: '8em' } }
                    alt="imagem da receita"
                    data-testid={ `${i}-horizontal-image` }
                  />
                </button>
                <Link to={ `/foods/${item.id}` }>
                  <p data-testid={ `${i}-horizontal-name` }>{item.name}</p>
                </Link>

              </div>
            )}
            { item.type === 'drink' && (
              <div>

                <button
                  type="button"
                  onClick={ () => history.push(`/drinks/${item.id}`) }
                >
                  <img
                    src={ item.image }
                    style={ { width: '6em' } }
                    alt="foto"
                    data-testid={ `${i}-horizontal-image` }
                  />

                </button>

                <Link to={ `/drinks/${item.id}` }>
                  <p data-testid={ `${i}-horizontal-name` }>{item.name}</p>
                </Link>

              </div>
            )}
            <p data-testid={ `${i}-horizontal-top-text` }>
              {item.type === 'food'
                ? `${item.nationality} - ${item.category}` : item.alcoholicOrNot }
            </p>
            <p
              data-testid={ `${i}-horizontal-done-date` }
            >
              23/06/2020
            </p>

            {item.type === 'food' && <input
              data-testid={ `${i}-horizontal-share-btn` }
              type="image"
              src={ shareIcon }
              alt={ shareIcon }
              onClick={ () => shareUrlFood(item.id) }
            />}
            {item.type === 'drink' && <input
              data-testid={ `${i}-horizontal-share-btn` }
              type="image"
              src={ shareIcon }
              alt={ shareIcon }
              onClick={ () => shareUrlDrink(item.id) }
            />}
            <button
              type="button"
              onClick={ () => remove(item.id) }
              // value={ item.id }
            >
              <img
                src={ blackHeart }
                alt={ blackHeart }
                data-testid={ `${i}-horizontal-favorite-btn` }
              />
            </button>
            {appearLink && <p>Link copied!</p>}

          </div>
        ))}
      </div>
    </div>
  );
};
export default FilterBtns;
