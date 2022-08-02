import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import FavoritesRecipes from '../pages/FavoriteRecipes';
import DoneRecipes from '../pages/DoneRecipes';
import FoodsId from '../pages/FoodsId';
import FoodsIdProgress from '../pages/FoodsIdProgress';
import DrinksId from '../pages/DrinksId';
import DrinksIdProgress from '../pages/DrinksIdProgress';

// import { Container } from './styles';

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods/:id" component={ FoodsId } />
        <Route path="/foods/:id/in-progress" component={ FoodsIdProgress } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:id" component={ DrinksId } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinksIdProgress } />
        <Route path="/profile" component={ Profile } />
        <Route path="/favorite-recipes" component={ FavoritesRecipes } />
        <Route path="/done-recipes" component={ DoneRecipes } />
      </Switch>
    </div>
  );
}

export default Routes;
