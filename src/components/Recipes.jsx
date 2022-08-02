import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Context from '../context/context';
import '../styles/Recipes.css';

function Recipes() {
  const {
    setTwelveFood,
    setTwelveDrink,
    twelveFood,
    twelveDrink,
    setBtnFetchFood,
    setBtnFetchDrink,
    btnFetchDrink,
    btnFetchFood,
    setBtnAll,
    btnAll,
    setBtnAllDrinks,
    btnAllDrinks,
  } = useContext(Context);

  const [isSearch, setIsSearch] = useState(false);
  const history = useHistory();

  const twelveFetchFood = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const getFetch = await fetch(url);
    const dataJson = await getFetch.json();
    setBtnAll(dataJson.meals);
    const json = dataJson.meals.filter((_, i) => i < '12');
    setTwelveFood(json);
  };

  const twelveFetchDrink = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const getFetch = await fetch(url);
    const dataJson = await getFetch.json();
    setBtnAllDrinks(dataJson.drinks);
    const json = dataJson.drinks.filter((_, i) => i < '12');
    setTwelveDrink(json);
  };

  const handleBtnFetchFood = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const getFetch = await fetch(url);
    const dataJson = await getFetch.json();
    const json = dataJson.meals.filter((_, i) => i < '5');
    setBtnFetchFood(json);
  };

  const handleBtnFetchDrink = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const getFetch = await fetch(url);
    const dataJson = await getFetch.json();
    const json = dataJson.drinks.filter((_, i) => i < '5');
    setBtnFetchDrink(json);
  };

  useEffect(() => {
    if (history.location.pathname === '/foods') {
      twelveFetchFood();
      handleBtnFetchFood();
      setBtnFetchDrink([]);
      setTwelveDrink([]);
    }
    if (history.location.pathname === '/drinks') {
      twelveFetchDrink();
      handleBtnFetchDrink();
      setBtnFetchFood([]);
      setTwelveFood([]);
    }
  }, []);

  const handleBtnAllFood = () => {
    if (history.location.pathname === '/foods') {
      setTwelveFood(btnAll.filter((_, i) => i < '12'));
    }
    if (history.location.pathname === '/drinks') {
      setTwelveDrink(btnAllDrinks.filter((_, i) => i < '12'));
    }
  };

  const handleClickCategoryFood = async ({ target }) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.innerText}`;
    const getFetch = await fetch(url);
    const dataJson = await getFetch.json();
    const json = dataJson.meals.filter((_, i) => i < '12');
    setTwelveFood(json);
    if (!isSearch) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
      handleBtnAllFood();
    }
  };

  const handleClickCategoryDrink = async ({ target }) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.innerText}`;
    const getFetch = await fetch(url);
    const dataJson = await getFetch.json();
    const json = dataJson.drinks.filter((_, i) => i < '12');
    setTwelveDrink(json);
    if (!isSearch) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
      handleBtnAllFood();
    }
  };

  return (
    <div className="recipes-page">
      <div className="buttons-div">
        {btnFetchFood.map((item, i) => (
          <div key={ i } className="btnMeals">
            <button
              type="button"
              data-testid={ `${item.strCategory}-category-filter` }
              onClick={ handleClickCategoryFood }
            >
              {item.strCategory}
            </button>
          </div>
        ))}
        {btnFetchDrink.map((item, i) => (
          <div key={ i }>
            <button
              type="button"
              data-testid={ `${item.strCategory}-category-filter` }
              className="drinkBtn"
              onClick={ handleClickCategoryDrink }
            >
              {item.strCategory}
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={ handleBtnAllFood }
          data-testid="All-category-filter"
        >
          All
        </button>
      </div>
      <div className="itens">
        {twelveFood.map((item, i) => (
          <Link to={ `/foods/${item.idMeal}` } key={ i }>
            <div data-testid={ `${i}-recipe-card` }>
              <img
                src={ item.strMealThumb }
                alt="foto-receita"
                data-testid={ `${i}-card-img` }
              />
              <h2 data-testid={ `${i}-card-name` }>{item.strMeal}</h2>
            </div>
          </Link>
        ))}
        {twelveDrink.map((item, i) => (
          <Link to={ `/drinks/${item.idDrink}` } key={ i }>
            <div data-testid={ `${i}-recipe-card` }>
              <img
                src={ item.strDrinkThumb }
                alt="foto-receita"
                data-testid={ `${i}-card-img` }
              />
              <h2 data-testid={ `${i}-card-name` }>{item.strDrink}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
