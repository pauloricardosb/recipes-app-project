import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Context from '../context/context';
import '../styles/Foods&Drinks.css';

function Foods() {
  const history = useHistory();
  const { foodsResponse } = useContext(Context);
  const bool = true;
  const foods = 'Foods';

  useEffect(() => {
    if (foodsResponse.length === 1) {
      history.push(`/foods/${foodsResponse[0].idMeal}`);
    }
  }, [foodsResponse, history]);

  return (
    <div>
      <Header title={ foods } hasSearch={ bool } />
      <div>
        {foodsResponse.map((item, i) => (
          <div className="responses" data-testid={ `${i}-recipe-card` } key={ i }>
            <img
              src={ item.strMealThumb }
              alt="foto-receita"
              data-testid={ `${i}-card-img` }
            />
            <h2 data-testid={ `${i}-card-name` }>{item.strMeal}</h2>
          </div>
        ))}
      </div>
      {!foodsResponse.length && <Recipes />}
      <Footer />
    </div>
  );
}

export default Foods;
