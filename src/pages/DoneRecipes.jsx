import React from 'react';
import Header from '../components/Header';
import '../styles/DoneRecipes.css';
import ButtonFilterDone from '../components/ButtonFilterDone';

function DoneRecipes() {
  // const history = useHistory();
  // const { isCopy, setCopy } = useContext(Context);
  // const done = 'Done Recipes';
  const bool = false;
  // const [localDone, setLocalDone] = useState([]);

  // const handleShare = () => {
  //   copy(
  //     `http://localhost:3000${history.location.pathname.replace(
  //       '/in-progress',
  //       '',
  //     )}`,
  //   );
  //   setCopy(true);
  // };

  // useEffect(() => {
  //   const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  //   setLocalDone(doneRecipes);
  // }, []);

  // const verifyType = (item) => {
  //   if (item.type === 'drink') {
  //     const { pathname } = window.location;
  //     const drinks = pathname === '/drinks';
  //     return drinks;
  //   }
  // };

  return (
    <div>
      <Header title="Done Recipes" hasSearch={ bool } />
      <ButtonFilterDone />
    </div>
    // <div>
    //   <Header title={ done } hasSearch={ bool } />
    //   <FiltersBtns />
    //   <div className="done-recipe-div">
    //     {localDone && localDone.map((item, i) => (
    //       <div className="done-recipe" key={ i }>
    //         <Link
    //           to={ verifyType(item) === false
    //             ? `/drinks/${item.id}`
    //             : `/foods/${item.id}` }
    //         >
    //           <img
    //             src={ item.image }
    //             alt="imagem"
    //             data-testid={ `${i}-horizontal-image` }
    //             className="img-done"
    //           />
    //           <h1 data-testid={ `${i}-horizontal-name` }>{item.name}</h1>
    //         </Link>
    //         <h4
    //           data-testid={ `${i}-horizontal-top-text` }
    //         >
    //           {item.nationality}
    //           {' '}
    //           -
    //           {' '}
    //           {item.category}
    //         </h4>
    //         <h3
    //           data-testid={ `${i}-horizontal-top-text` }
    //         >
    //           { (item.alcoholicOrNot) ? item.alcoholicOrNot : null }

  //         </h3>
  //         <h3 data-testid={ `${i}-horizontal-done-date` }>{item.doneDate}</h3>
  //         {item.tags.map((e) => (
  //           <h4 data-testid={ `${i}-${e}-horizontal-tag` } key={ e }>
  //             {e}
  //           </h4>
  //         ))}
  //         {!isCopy ? <input
  //           type="image"
  //           src={ share }
  //           data-testid={ `${i}-horizontal-share-btn` }
  //           alt="searchIcon"
  //           onClick={ handleShare }
  //         /> : 'Link copied!'}
  //       </div>
  //     ))}
  //   </div>
  // </div>
  );
}

export default DoneRecipes;
