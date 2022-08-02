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

function DrinkId() {
  const { setFetchIdDrink,
    fetchIdDrink,
    favoritesArray,
    setFavoritesArray,
    isCopy,
    setCopy,
    ingredientsArray,
    setIngredients,
    setAmmount,
    amountArray,
  } = useContext(Context);
  const { id } = useParams();
  const history = useHistory();
  const [isFavorite, setIsFavorite] = useState(true);
  const [foodArray, setFood] = useState([]);

  const handleFetchIdDrink = async () => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getFetch = await fetch(url);
    const dataJson = await getFetch.json();
    const responseIdArray = dataJson.drinks[0];
    const reduce = Object.entries(responseIdArray).reduce((acc, item) => {
      if (item[0].includes('strIngredient')) {
        acc.push(item[1]);
      }
      return acc;
    }, []);
    const ammoutReduce = Object.entries(responseIdArray).reduce((acc, item) => {
      if (item[0].includes('strMeasure')) {
        acc.push(item[1]);
      }
      return acc;
    }, []);

    setAmmount(ammoutReduce);
    setIngredients(reduce);
    setFetchIdDrink(responseIdArray);
  };

  const recommendationFetch = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const data = await response.json();
    setFood(data.meals.filter((_, i) => i < '6'));
  };

  const handleShare = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setCopy(true);
  };

  const handleFavoritesDrink = () => {
    const objFavorites = {
      id: fetchIdDrink.idDrink,
      type: 'drink',
      nationality: '',
      category: fetchIdDrink.strCategory,
      alcoholicOrNot: fetchIdDrink.strAlcoholic,
      name: fetchIdDrink.strDrink,
      image: fetchIdDrink.strDrinkThumb,
      // tags: [],
    };
    let joao = [];
    if (favoritesArray.length
      && favoritesArray.some((item) => item.id === id)) {
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

  useEffect(() => {
    handleFetchIdDrink();
    recommendationFetch();
    if (favoritesArray.some((item) => item.id === id)) {
      setIsFavorite(false);
    }
  }, []);
  // testando novamente
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
        <button type="button" onClick={ handleFavoritesDrink }>
          <img
            src={ !isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="blackHeart"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      <div className="recipe-div">
        <img
          src={ fetchIdDrink.strDrinkThumb }
          alt="foto-drink"
          data-testid="recipe-photo"
          className="details-img"
        />
        <h1 data-testid="recipe-title">{fetchIdDrink.strDrink}</h1>
        <h2 data-testid="recipe-category">{fetchIdDrink.strAlcoholic}</h2>

        <div>
          <p className="instructions-title">Ingredients</p>
          <ul className="ingredients">
            {ingredientsArray.map(
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
              {fetchIdDrink.strInstructions}
            </p>
          </div>
        </div>
      </div>
      <p
        className="recommendation-span"
      >
        Experimente essa receita com nossas recomendações!
      </p>
      <div className="recommendationItens">
        {foodArray.map((item, i) => (
          <div data-testid={ `${i}-recomendation-card` } key={ i }>
            <Link to={ `/foods/${item.idMeal}` } key={ i }>
              <div className="recipe-card" data-testid={ `${i}-recipe-card` }>
                <img
                  src={ item.strMealThumb }
                  alt="foto-receita"
                  data-testid={ `${i}-card-img` }
                  className="recommendationImage"
                />
                <h2 data-testid={ `${i}-recomendation-title` }>
                  {item.strMeal}
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

export default DrinkId;
