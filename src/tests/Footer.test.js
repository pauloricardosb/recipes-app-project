import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Footer from '../components/Footer';

describe('Testando o component Footer', () => {
    it('Testando se os elementos estão na tela', () => {
        renderWithRouter(<Footer />)
        const drink = screen.getByTestId('drinks-bottom-btn');
        expect(drink).toBeInTheDocument();

        const food = screen.getByTestId('food-bottom-btn');
        expect(food).toBeInTheDocument();
    })
    it('Testando o redirecionamento dos elementos', () => {
        const { history } = renderWithRouter(<Footer />)
        const drink = screen.getByTestId('drinks-bottom-btn');
        userEvent.click(drink);
        expect(history.location.pathname).toBe('/drinks');

        const food = screen.getByTestId('food-bottom-btn');
        userEvent.click(food);
        expect(history.location.pathname).toBe('/foods');
    })
})