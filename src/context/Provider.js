import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './context';

function ProviderRecipes({ children }) {
  const message = 'Sorry, we haven\'t found any recipes for these filters.';
  const history = useHistory();
  const [loginInput, setLogin] = useState({
    email: '',
    password: '',
  });
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [radios, setRadios] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [searchBtn, setInputSearchBtn] = useState('');
  const [foodsResponse, setFoodsResponse] = useState([]);
  const [drinksResponse, setDrinksResponse] = useState([]);
  const [twelveFood, setTwelveFood] = useState([]);
  const [twelveDrink, setTwelveDrink] = useState([]);
  const [btnFetchFood, setBtnFetchFood] = useState([]);
  const [btnFetchDrink, setBtnFetchDrink] = useState([]);
  const [btnAll, setBtnAll] = useState([]);
  const [btnAllDrinks, setBtnAllDrinks] = useState([]);
  const [fetchId, setFetchId] = useState([]);
  const [fetchIdDrink, setFetchIdDrink] = useState([]);
  const joaozinho = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [favoritesArray, setFavoritesArray] = useState(joaozinho);
  const [isCopy, setCopy] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);
  const [ingredientsArray, setIngredients] = useState([]);
  const [amountArray, setAmmount] = useState([]);
  const [fetchProgressDrink, setFetchProgressDrink] = useState([]);
  const [fetchProgressFood, setFetchProgressFood] = useState([]);
  const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  const [inProgressArrayFood, setInProgressArrayFood] = useState(inProgressStorage);
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  const [inProgressArrayDrink, setInProgressArrayDrink] = useState(inProgress);
  const [ingredientsArrayFood, setIngredientsArrayFood] = useState([]);
  const [checkedsState, setCheckedsState] = useState([]);
  const doneStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [doneRecipesArray, setDoneRecipesArray] = useState(doneStorage);
  const [isFinish, setIsFinish] = useState(true);
  const [checkeds, setCheckeds] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    setLogin((oldState) => ({ ...oldState, [name]: value }));
    const tamMin = 6;
    const regex = /\w+@[a-z]+.com/g;
    if (loginInput.email.match(regex) && loginInput.password.length >= tamMin) {
      setDisabledBtn(false);
    } else {
      return setDisabledBtn(true);
    }
  };
  const getFoods = async () => {
    try {
      if (radios === 'ingredient') {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchBtn}`;
        const getFetch = await fetch(url);
        const dataJson = await getFetch.json();
        const json = dataJson;
        setFoodsResponse(json);
      }
    } catch (error) {
      global.alert(message, error);
    }
    try {
      if (radios === 'name') {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBtn}`;
        const getFetch = await fetch(url);
        const dataJson = await getFetch.json();
        const json = dataJson.meals.filter((_, i) => i < '12');
        setFoodsResponse(json);
      }
    } catch (error) {
      global.alert(message, error);
    }
    try {
      if (radios === 'firstLetter' && searchBtn.length === 1) {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchBtn}`;
        const getFetch = await fetch(url);
        const dataJson = await getFetch.json();
        const json = dataJson.meals.filter((_, i) => i < '12');
        setFoodsResponse(json);
      }
    } catch (error) {
      global.alert(message, error);
    }

    if (radios === 'firstLetter' && searchBtn.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    return null;
  };

  const getDrinks = async () => {
    try {
      if (radios === 'ingredient') {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchBtn}`;
        const getFetch = await fetch(url);
        const dataJson = await getFetch.json();
        const json = dataJson.drinks.filter((_, i) => i < '12');
        setDrinksResponse(json);
      }
    } catch (error) {
      global.alert(message, error);
    }
    try {
      if (radios === 'name') {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchBtn}`;
        const getFetch = await fetch(url);
        const dataJson = await getFetch.json();
        const json = dataJson.drinks.filter((_, i) => i < '12');
        setDrinksResponse(json);
      }
    } catch (error) {
      global.alert(message, error);
    }
    try {
      if (radios === 'firstLetter' && searchBtn.length === 1) {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchBtn}`;
        const getFetch = await fetch(url);
        const dataJson = await getFetch.json();
        const json = dataJson.drinks.filter((_, i) => i < '12');
        setDrinksResponse(json);
      }
    } catch (error) {
      global.alert(message, error);
    }
    if (radios === 'firstLetter' && searchBtn.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    return null;
  };

  useEffect(() => {
    if (history.location.pathname === '/foods') {
      getFoods();
    }
  }, [history.location.pathname, searchBtn]);

  useEffect(() => {
    if (history.location.pathname === '/drinks') {
      getDrinks();
    }
  }, [history.location.pathname, searchBtn]);

  const handleSubmit = () => {
    setInputSearchBtn(inputSearch);
  };

  const doneRecipesLocal = (objInprogress) => {
    const novoArray = JSON.parse(localStorage.getItem('doneRecipes'));
    if (
      novoArray
    ) {
      localStorage.setItem('doneRecipes', JSON.stringify([...novoArray, objInprogress]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([objInprogress]));
    }
  };

  const contextValue = {
    loginInput,
    handleChange,
    disabledBtn,
    setRadios,
    radios,
    setInputSearch,
    foodsResponse,
    drinksResponse,
    handleSubmit,
    setTwelveFood,
    twelveFood,
    setTwelveDrink,
    twelveDrink,
    btnFetchFood,
    setBtnFetchFood,
    btnFetchDrink,
    setBtnFetchDrink,
    setFoodsResponse,
    setBtnAll,
    btnAll,
    btnAllDrinks,
    setBtnAllDrinks,
    fetchId,
    setFetchId,
    fetchIdDrink,
    setFetchIdDrink,
    setFavoritesArray,
    favoritesArray,
    isCopy,
    setCopy,
    isFavorite,
    setIsFavorite,
    ingredientsArray,
    setIngredients,
    amountArray,
    setAmmount,
    fetchProgressDrink,
    setFetchProgressDrink,
    fetchProgressFood,
    setFetchProgressFood,
    inProgressArrayFood,
    setInProgressArrayFood,
    inProgressArrayDrink,
    setInProgressArrayDrink,
    ingredientsArrayFood,
    setIngredientsArrayFood,
    checkedsState,
    setCheckedsState,
    doneRecipesArray,
    setDoneRecipesArray,
    doneRecipesLocal,
    isFinish,
    setIsFinish,
    checkeds,
    setCheckeds,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

ProviderRecipes.propTypes = { children: PropTypes.node.isRequired };

export default ProviderRecipes;
