import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import StartRecipe from '../components/StartRecipe';
import Context from '../context/context';
import share from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/RecipeDetail.css';

// import { Container } from './styles';

function FoodsId() {
  const {
    setFetchId,
    fetchId,
    favoritesArray,
    setFavoritesArray,
    ingredientsArrayFood,
    setIngredientsArrayFood,
    amountArray,
    setAmmount,
  } = useContext(Context);
  const { id } = useParams();
  const history = useHistory();
  const [isCopy, setCopy] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);
  const [drinkArray, setDrink] = useState([]);

  const handleFetchIdFood = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getFetch = await fetch(url);
    const dataJson = await getFetch.json();
    const responseIdArrayFood = dataJson.meals[0];
    const reduce = Object.entries(responseIdArrayFood).reduce((acc, item) => {
      if (item[0].includes('strIngredient')) {
        acc.push(item[1]);
      }
      return acc;
    }, []);
    const ammoutReduce = Object.entries(responseIdArrayFood).reduce(
      (acc, item) => {
        if (item[0].includes('strMeasure')) {
          acc.push(item[1]);
        }
        return acc;
      },
      [],
    );

    setAmmount(ammoutReduce);
    setIngredientsArrayFood(reduce);
    setFetchId(responseIdArrayFood);
  };

  const recommendationFetch = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const data = await response.json();
    setDrink(data.drinks.filter((_, i) => i < '6'));
  };

  useEffect(() => {
    handleFetchIdFood();
    recommendationFetch();
    if (favoritesArray.some((item) => item.id === id)) {
      setIsFavorite(false);
    }
  }, []);

  const handleShare = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setCopy(true);
  };

  const handleFavorites = () => {
    const objFavorites = {
      id: fetchId.idMeal,
      type: 'food',
      nationality: fetchId.strArea,
      category: fetchId.strCategory,
      alcoholicOrNot: '',
      name: fetchId.strMeal,
      image: fetchId.strMealThumb,
      // tags: fetchId.strTags.split(','),
    };
    let joao = [];
    if (
      favoritesArray.length
      && favoritesArray.some((item) => item.id === id)
    ) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
    if (
      favoritesArray.length
      && favoritesArray.some((item) => item.id === id)
    ) {
      joao = favoritesArray.filter((e) => e.id !== objFavorites.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(joao));
      setFavoritesArray(joao);
    } else {
      joao = [...favoritesArray, objFavorites];
      localStorage.setItem('favoriteRecipes', JSON.stringify(joao));
      setFavoritesArray(joao);
    }
  };

  return (
    <div>
      <div className="buttons">
        <button
          type="button"
          data-testid="share-btn"
          onClick={ handleShare }
          className="share-btn"
        >
          {!isCopy ? <img src={ share } alt="share" /> : 'Link copied!'}
        </button>
        <button type="button" onClick={ handleFavorites }>
          <img
            src={ !isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="blackHeart"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      <div className="recipe-div">
        <img
          src={ fetchId.strMealThumb }
          alt="foto-drink"
          data-testid="recipe-photo"
          className="details-img"
        />
        <h1 data-testid="recipe-title">{fetchId.strMeal}</h1>
        <h2 data-testid="recipe-category">{fetchId.strCategory}</h2>
        <div>
          <p className="instructions-title">Ingredients</p>
          <ul className="ingredients">
            {ingredientsArrayFood.map(
              (item, i) => item && (
                <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                  {`${amountArray[i]} ${item}`}
                </li>
              ),
            )}
          </ul>
          <div className="recipe-end-div">
            <p className="instructions-title">Instructions</p>
            <p
              className="instructions"
              data-testid="instructions"
            >
              {fetchId.strInstructions}
            </p>
          </div>
          <p className="instructions-title">Video</p>
          <div className="recipe-video">
            {fetchId.strYoutube && (
              <iframe
                title="youtube"
                src={ fetchId.strYoutube.replace('watch?v=', 'embed/') }
                data-testid="video"
              />
            )}
          </div>
        </div>
      </div>
      <p
        className="recommendation-span"
      >
        Experimente essa receita com nossas recomendações!
      </p>
      <div className="recommendationItens">
        {drinkArray.map((item, i) => (
          <div data-testid={ `${i}-recomendation-card` } key={ i }>
            <Link to={ `/drinks/${item.idDrink}` } key={ i }>
              <div className="recipe-card" data-testid={ `${i}-recipe-card` }>
                <img
                  src={ item.strDrinkThumb }
                  alt="foto-receita"
                  data-testid={ `${i}-card-img` }
                  className="recommendationImage"
                />
                <h2 data-testid={ `${i}-recomendation-title` }>
                  {item.strDrink}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <StartRecipe />
    </div>
  );
}

export default FoodsId;
