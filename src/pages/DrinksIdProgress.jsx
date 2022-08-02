import React, { useContext, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useHistory, useParams } from 'react-router-dom';
import Context from '../context/context';
import share from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import FinishBtn from '../components/FinishBtn';

// import { Container } from './styles';

function DrinksIdProgress() {
  const history = useHistory();
  const { id } = useParams();
  const {
    isCopy,
    setCopy,
    favoritesArray,
    isFavorite,
    setIsFavorite,
    fetchProgressDrink,
    setFetchProgressDrink,
    ingredientsArray,
    amountArray,
    setAmmount,
    setIngredients,
    setFavoritesArray,
    inProgressArrayDrink,
    setInProgressArrayDrink,
    setIsFinish,
    checkeds,
    setCheckeds,
  } = useContext(Context);

  // const objInprogressDrink = {
  //   id: fetchProgressDrink.idDrink,
  //   type: 'drink',
  //   nationality: '',
  //   category: fetchProgressDrink.strCategory,
  //   alcoholicOrNot: fetchProgressDrink.strAlcoholic,
  //   name: fetchProgressDrink.strDrink,
  //   image: fetchProgressDrink.strDrinkThumb,
  //   ingredient: ingredientsArray,
  //   amount: amountArray,
  //   checkeds: [],
  // };

  const handleLocal = (dados, reduce, ammoutReduce) => {
    const objInprogress = {
      id: dados.idDrink,
      type: 'drink',
      nationality: '',
      category: dados.strCategory,
      alcoholicOrNot: dados.strAlcoholic,
      name: dados.strDrink,
      image: dados.strDrinkThumb,
      ingredient: reduce,
      amount: ammoutReduce,
    };
    let novoArray = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (
      inProgressArrayDrink.length
        && inProgressArrayDrink.some((item) => item.id === id)
    ) {
      novoArray = inProgressArrayDrink.filter((e) => e.id !== objInprogress.id);
      localStorage.setItem('inProgressRecipes', JSON.stringify(novoArray));
      setInProgressArrayDrink(novoArray);
    } else {
      novoArray = [...inProgressArrayDrink, objInprogress];
      localStorage.setItem('inProgressRecipes', JSON.stringify(novoArray));
      setInProgressArrayDrink(novoArray);
    }
  };

  const handleShare = () => {
    copy(`http://localhost:3000${history.location.pathname.replace('/in-progress', '')}`);
    setCopy(true);
  };

  const handleFavoritesDrink = () => {
    const objFavorites = {
      id: fetchProgressDrink.idDrink,
      type: 'drink',
      nationality: '',
      category: fetchProgressDrink.strCategory,
      alcoholicOrNot: fetchProgressDrink.strAlcoholic,
      name: fetchProgressDrink.strDrink,
      image: fetchProgressDrink.strDrinkThumb,
      // tags: [],
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

  const handleInProgress = async () => {
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
    setFetchProgressDrink(responseIdArray);
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
          src={ fetchProgressDrink.strDrinkThumb }
          alt="foto-drink"
          data-testid="recipe-photo"
          className="details-img"
        />
        <h1 data-testid="recipe-title">{fetchProgressDrink.strDrink}</h1>
        <h2 data-testid="recipe-category">{fetchProgressDrink.strAlcoholic}</h2>
        <ol className="ingredients-inprogress">
          {ingredientsArray.map(
            (item, i) => item && (
              <li data-testid={ `${i}-ingredient-step` } key={ i }>
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
          <p
            className="instructions"
            data-testid="instructions"
          >
            {fetchProgressDrink.strInstructions}
          </p>
        </div>
      </div>
      <FinishBtn />
    </div>
  );
}

export default DrinksIdProgress;
