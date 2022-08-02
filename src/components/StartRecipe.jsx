import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

// import { Container } from './styles';

function StartRecipe() {
  const history = useHistory();
  const { id } = useParams();

  const handleStartBtn = () => {
    if (history.location.pathname === `/foods/${id}`) {
      history.push(`/foods/${id}/in-progress`);
    }
    if (history.location.pathname === `/drinks/${id}`) {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  return (
    <div>
      <button
        className="btn-start-recipe"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleStartBtn }
      >
        Start Recipe
      </button>
    </div>
  );
}

export default StartRecipe;
