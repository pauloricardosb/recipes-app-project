import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const ButtonFilterFavorite = () => {
  const history = useHistory();
  const [allRecipesDone, setAllRecipesDone] = useState([]);
  const [load, setLoad] = useState(false);
  const [appLink, setAppLink] = useState(false);

  const remove = (value) => {
    console.log('value', value);
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

    favorite.splice(
      favorite.findIndex((fav) => fav.id === value),
      1,
    );

    document.location.reload(true);
    return localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
  };

  useEffect(() => {
    setAllRecipesDone(JSON.parse(localStorage.getItem('favoriteRecipes')));
    setLoad(true);
  }, []);

  const getOnlyDrinks = () => {
    const xab = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const onlyDrinks = xab.filter((drink) => drink.type === 'drink');
    setAllRecipesDone(onlyDrinks);
  };

  const getOnlyFoods = () => {
    const xib = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const onlyFoods = xib.filter((food) => food.type === 'food');
    setAllRecipesDone(onlyFoods);
  };

  const shareUrlFood = (id) => {
    const endpoint = `http://localhost:3000/foods/${id}`;
    const url = navigator.clipboard.writeText(endpoint);
    setAppLink(true);
    return url;
  };

  const getAllRecipes = () => {
    const all = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setAllRecipesDone(all);
  };

  const shareUrlDrink = (id) => {
    const endpoint = `http://localhost:3000/drinks/${id}`;
    const url = navigator.clipboard.writeText(endpoint);
    setAppLink(true);
    return url;
  };

  return (
    <div>
      <div className="filters-buttons-div">
        <button
          className="filters-btn"
          data-testid="filter-by-all-btn"
          type="button"
          name="btnAll"
          onClick={ getAllRecipes }
        >
          All
        </button>
        <button
          className="filters-btn"
          data-testid="filter-by-food-btn"
          type="button"
          name="btnFood"
          onClick={ getOnlyFoods }
        >
          Food
        </button>
        <button
          className="filters-btn"
          data-testid="filter-by-drink-btn"
          type="button"
          name="btnDrink"
          onClick={ getOnlyDrinks }
        >
          Drinks
        </button>
      </div>
      <div className="done-recipe-div">
        {allRecipesDone !== null
          && load
          && allRecipesDone.map((item, i) => (
            <div className="done-recipe" key={ i }>
              {item.type === 'food' && (
                <div>
                  <button
                    className="recipe-btn"
                    type="button"
                    onClick={ () => history.push(`/foods/${item.id}`) }
                  >
                    <img
                      src={ item.image }
                      alt="imagem da receita"
                      style={ { width: '6em' } }
                      data-testid={ `${i}-horizontal-image` }
                    />
                  </button>
                  <Link to={ `/foods/${item.id}` }>
                    <p data-testid={ `${i}-horizontal-name` }>{item.name}</p>
                  </Link>
                </div>
              )}
              {item.type === 'drink' && (
                <div>
                  <button
                    className="recipe-btn"
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
                  ? `${item.nationality} - ${item.category}`
                  : item.alcoholicOrNot}
              </p>
              <p data-testid={ `${i}-horizontal-done-date` }>23/06/2020</p>
              <div className="actions-div">
                {item.type === 'food' && (
                  <input
                    data-testid={ `${i}-horizontal-share-btn` }
                    type="image"
                    src={ shareIcon }
                    alt={ shareIcon }
                    style={ { width: '2em', marginBottom: '60px' } }
                    onClick={ () => shareUrlFood(item.id) }
                  />
                )}
                {item.type === 'drink' && (
                  <input
                    data-testid={ `${i}-horizontal-share-btn` }
                    type="image"
                    src={ shareIcon }
                    alt={ shareIcon }
                    style={ { width: '2em', marginBottom: '60px' } }
                    onClick={ () => shareUrlDrink(item.id) }
                  />
                )}
                <button
                  className="fav-btn"
                  type="button"
                  onClick={ () => remove(item.id) }
                >
                  <img
                    src={ blackHeart }
                    alt={ blackHeart }
                    style={ { width: '1.9em' } }
                    data-testid={ `${i}-horizontal-favorite-btn` }
                  />
                </button>
                {appLink && <p>Link copied!</p>}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default ButtonFilterFavorite;
