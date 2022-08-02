import React, { useContext, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useHistory, useParams } from 'react-router-dom';
import Context from '../context/context';
import share from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/RecipeDetail.css';
import FinishBtn from '../components/FinishBtn';

function DrinksIdProgress() {
  const history = useHistory();
  const { id } = useParams();
  const {
    isCopy,
    setCopy,
    favoritesArray,
    isFavorite,
    setIsFavorite,
    fetchProgressFood,
    setFetchProgressFood,
    ingredientsArray,
    amountArray,
    setAmmount,
    setIngredients,
    inProgressArrayFood,
    setFavoritesArray,
    setInProgressArrayFood,
    setIsFinish,
    checkeds,
    setCheckeds,
  } = useContext(Context);

  const handleShare = () => {
    copy(
      `http://localhost:3000${history.location.pathname.replace(
        '/in-progress',
        '',
      )}`,
    );
    setCopy(true);
  };

  const handleFavoritesDrink = () => {
    const objFavorites = {
      id: fetchProgressFood.idMeal,
      type: 'food',
      nationality: fetchProgressFood.strArea,
      category: fetchProgressFood.strCategory,
      alcoholicOrNot: '',
      name: fetchProgressFood.strMeal,
      image: fetchProgressFood.strMealThumb,
      // tags: fetchProgressFood.strTags.split(','),
    };
    let novoArray = [];
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
      novoArray = favoritesArray.filter((e) => e.id !== objFavorites.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(novoArray));
      setFavoritesArray(novoArray);
    } else {
      novoArray = [...favoritesArray, objFavorites];
      localStorage.setItem('favoriteRecipes', JSON.stringify(novoArray));
      setFavoritesArray(novoArray);
    }
  };

  const handleLocal = (dados, reduce, ammoutReduce) => {
    const objInprogress = {
      id: dados.idMeal,
      type: 'food',
      nationality: dados.strArea,
      category: dados.strCategory,
      alcoholicOrNot: '',
      name: dados.strMeal,
      image: dados.strMealThumb,
      amount: ammoutReduce,
      ingredient: reduce,
    };
    // let novoArray = [];
    let novoArray = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (
      inProgressArrayFood.length
        && inProgressArrayFood.some((item) => item.id === id)
    ) {
      novoArray = inProgressArrayFood.filter((e) => e.id !== objInprogress.id);
      localStorage.setItem('inProgressRecipes', JSON.stringify(novoArray));
      setInProgressArrayFood(novoArray);
    } else {
      novoArray = [...inProgressArrayFood, objInprogress];
      localStorage.setItem('inProgressRecipes', JSON.stringify(novoArray));
      setInProgressArrayFood(novoArray);
    }
  };

  const handleInProgress = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getFetch = await fetch(url);
    const dataJson = await getFetch.json();
    const responseIdArray = dataJson.meals[0];
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
    setFetchProgressFood(responseIdArray);
    handleLocal(responseIdArray, reduce, ammoutReduce);
  };

  const handleChecked = (value) => {
    const localCheckeds = JSON.parse(localStorage.getItem('checkedsRecipes'));
    if (checkeds && checkeds.includes(value)) {
      localStorage.setItem('checkedsRecipes', (
        JSON.stringify(checkeds.filter((item) => item !== value))
      ));
      setCheckeds(checkeds.filter((item) => item !== value));
    } else if (localCheckeds) {
      localStorage.setItem('checkedsRecipes', JSON.stringify([...localCheckeds, value]));
      setCheckeds(checkeds.length === 0 ? [value] : [...localCheckeds, value]);
    } else if (!checkeds.includes(value) && !localCheckeds) {
      localStorage.setItem('checkedsRecipes', JSON.stringify([value]));
      setCheckeds(checkeds.length === 0 ? [value] : [...localCheckeds, value]);
    }
  };

  const verifaInput = () => {
    const checked = document.querySelectorAll('.checkd-ui');
    for (let index = 0; index < checked.length; index += 1) {
      const element = checked[index].checked;
      if (element) {
        setIsFinish(false);
      } else {
        setIsFinish(true);
      }
    }
  };

  useEffect(() => {
    handleInProgress();
    if (favoritesArray.some((item) => item.id === id)) {
      setIsFavorite(false);
    }
  }, []);

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
          src={ fetchProgressFood.strMealThumb }
          alt="foto-drink"
          data-testid="recipe-photo"
          className="details-img"
        />
        <h1 data-testid="recipe-title">{fetchProgressFood.strMeal}</h1>
        <h2 data-testid="recipe-category">{fetchProgressFood.strCategory}</h2>
        <ol className="ingredients-inprogress">
          {ingredientsArray.map(
            (item, i) => item && (
              <li
                data-testid={ `${i}-ingredient-step` }
                key={ i }
              >
                {`${amountArray[i]} ${item} —`}
                <input
                  type="checkbox"
                  onChange={ ({ target: { value } }) => {
                    handleChecked(value);
                    verifaInput();
                  } }
                  className="checkd-ui"
                  value={ item }
                  checked={ !!(checkeds && checkeds.includes(item)) }
                />
              </li>
            ),
          )}
        </ol>
        <div className="recipe-end-div">
          <p className="instructions" data-testid="instructions">
            {fetchProgressFood.strInstructions}
          </p>
        </div>
      </div>
      <FinishBtn />
    </div>
  );
}

export default DrinksIdProgress;
