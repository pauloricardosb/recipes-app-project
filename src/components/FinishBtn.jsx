import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Context from '../context/context';
import '../styles/RecipeDetail.css';

function FinishBtn() {
  const history = useHistory();
  const { id } = useParams();
  const { fetchProgressFood,
    fetchProgressDrink,
    doneRecipesLocal,
    isFinish,
  } = useContext(Context);

  const handleFinish = () => {
    if (history.location.pathname === `/drinks/${id}/in-progress`) {
      doneRecipesLocal({
        id: fetchProgressDrink.idDrink,
        type: 'drink',
        nationality: '',
        category: fetchProgressDrink.strCategory,
        alcoholicOrNot: fetchProgressDrink.strAlcoholic,
        name: fetchProgressDrink.strDrink,
        image: fetchProgressDrink.strDrinkThumb,
        doneDate: fetchProgressDrink.dateModified,
        tags: [],
      });
    }
    if (history.location.pathname === `/foods/${id}/in-progress`) {
      doneRecipesLocal({
        id: fetchProgressFood.idMeal,
        type: 'food',
        nationality: fetchProgressFood.strArea,
        category: fetchProgressFood.strCategory,
        alcoholicOrNot: '',
        name: fetchProgressFood.strMeal,
        image: fetchProgressFood.strMealThumb,
        doneDate: fetchProgressFood.dateModified,
        tags: fetchProgressFood.strTags.split(','),
        // .fetchProgressFood.strTags.filter((_, i) => i < '2'),
      });
    }
    history.push('/done-recipes');
  };

  return (
    <div>
      <button
        type="button"
        className="btn-start-recipe"
        data-testid="finish-recipe-btn"
        onClick={ () => handleFinish() }
        disabled={ isFinish }
      >
        Finish recipe
      </button>
    </div>
  );
}

export default FinishBtn;
