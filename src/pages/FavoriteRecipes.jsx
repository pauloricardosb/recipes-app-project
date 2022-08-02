import React from 'react';
// import { Link, useParams } from 'react-router-dom';
// import FiltersBtns from '../components/FiltersBtns';
import Header from '../components/Header';
// import Context from '../context/context';
// import share from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import ButtonFilterFavorite from '../components/ButtonFilterFavorite';

function FavoritesRecipes() {
//   const { id } = useParams();
//   const favorite = 'Favorite Recipes';
  const bool = false;
  //   const { isCopy,
  //     setCopy,
  //     favoritesArray,
  //     isFavorite,
  //     setIsFavorite,
  //   } = useContext(Context);
  //   const history = useHistory();
  //   const [localFavorites, setlocalFavorites] = useState([]);
  //   const [teste, setTeste] = useState(false);

  //   const handleShare = () => {
  //     copy(
  //       `http://localhost:3000${history.location.pathname.replace(
  //         '/in-progress',
  //         '',
  //       )}`,
  //     );
  //     setCopy(true);
  //   };

  //   useEffect(() => {
  //     const favoritesRecipes = JSON.parse(
  //       localStorage.getItem('favoriteRecipes'),
  //     );
  //     setlocalFavorites(favoritesRecipes);
  //     if (favoritesArray.some((item) => item.id === id)) {
  //       setIsFavorite(false);
  //     }
  //   }, []);

  //   const verifyType = (item) => {
  //     if (item.type === 'drink') {
  //       const { pathname } = window.location;
  //       const drinks = pathname === '/drinks';
  //       return drinks;
  //     }
  //   };

  //   const handleFavorites = (target) => {
  //     console.log(target);
  //     setTeste(!teste);
  //     const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //     let arrayFavorites = [];
  //     if (
  //       favoritesArray.length
  //       && favoritesArray.some((item) => item.id === id)
  //     ) {
  //       setIsFavorite(true);
  //     } else {
  //       setIsFavorite(false);
  //     }
  //     if (
  //       favorites.length
  //       && favorites.some((item) => item.id === id)
  //     ) {
  //       arrayFavorites = favorites.filter((e) => e.id !== target);
  //       localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavorites));
  //       setFavoritesArray(arrayFavorites);
  //     }
  //   };

  return (
    <div>
      <Header title="Favorite Recipes" hasSearch={ bool } />
      <ButtonFilterFavorite />
    </div>
  //     <div>
  //       {console.log('ai', localFavorites)}
  //       <Header title={ favorite } hasSearch={ bool } />
  //       <FiltersBtns />
  //       <div>
  //         {localFavorites
  //           && localFavorites.map((item, i) => (
  //             <div key={ i }>
  //               <Link
  //                 to={
  //                   verifyType(item) === false
  //                     ? `/drinks/${item.id}`
  //                     : `/foods/${item.id}`
  //                 }
  //               >
  //                 <img
  //                   src={ item.image }
  //                   alt="imagem"
  //                   data-testid={ `${i}-horizontal-image` }
  //                   className="img-done"
  //                 />
  //                 <h1 data-testid={ `${i}-horizontal-name` }>{item.name}</h1>
  //               </Link>
  //               <h4 data-testid={ `${i}-horizontal-top-text` }>
  //                 {item.nationality}
  //                 {' '}
  //                 -
  //                 {' '}
  //                 {item.category}
  //               </h4>
  //               <h3 data-testid={ `${i}-horizontal-top-text` }>
  //                 {item.alcoholicOrNot ? item.alcoholicOrNot : null}
  //               </h3>

  //               <h3 data-testid={ `${i}-horizontal-done-date` }>{item.doneDate}</h3>
  //               {item.tags.map((e) => (
  //                 <h4 data-testid={ `${i}-${e}-horizontal-tag` } key={ e }>
  //                   {e}
  //                 </h4>
  //               ))}
  //               {!isCopy ? (
  //                 <input
  //                   type="image"
  //                   src={ share }
  //                   data-testid={ `${i}-horizontal-share-btn` }
  //                   alt="searchIcon"
  //                   onClick={ handleShare }
  //                 />
  //               ) : (
  //                 'Link copied!'
  //               )}
  //               <button
  //                 type="button"
  //                 onClick={ () => handleFavorites(item.id) }
  //               >
  //                 <img
  //                   src={ !isFavorite ? blackHeartIcon : whiteHeartIcon }
  //                   alt="blackHeart"
  //                   data-testid="favorite-btn"
  //                 />
  //               </button>
  //             </div>
  //           ))}
  //       </div>
  //     </div>
  );
}

export default FavoritesRecipes;
