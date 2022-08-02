import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testando o component FavoriteRecipes', () => {
    // it('Testando se os botões estão na tela', () => {
    //     renderWithRouter(<FavoriteRecipes />)
    //     const drink = screen.getByTestId('drinks-bottom-btn');
    //     expect(drink).toBeInTheDocument();

    //     const food = screen.getByTestId('food-bottom-btn');
    //     expect(food).toBeInTheDocument();
    // });
    // it('Testando o redirecionamento dos elementos', () => {
    //     const { history } = renderWithRouter(<FavoriteRecipes />)
    //     const fav = screen.getByTestId('0-horizontal-name');
    //     userEvent.click(fav);
    //     expect(history.location.pathname).not.toBe('/favorite-recipes');
    // });
    // it('Testando se o botão de favoritos está na tela', () => {
    //     renderWithRouter(<FavoriteRecipes />)
    //     const favorite = screen.getByTestId('favorite-bottom-btn');
    //     expect(favorite).toBeInTheDocument();
    // });
    // it('Testando o botão de compartilhar', () => {
    //     renderWithRouter(<FavoriteRecipes />)
    //     const share = screen.getByTestId('share-bottom-btn');
    //     expect(share).toBeInTheDocument();
    // });
});