import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

describe('Testando o component do Header', () => {
    it('Teste se os elementos estão na tela', () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods');
        const imgPerfil = screen.getByTestId('profile-top-btn');
        const imgLupa = screen.getByTestId('search-top-btn');
        const titleHeader = screen.getByTestId('page-title');

        expect(imgPerfil).toBeInTheDocument();
        expect(imgLupa).toBeInTheDocument();
        expect(titleHeader).toBeInTheDocument();
    })

    it('Testando o redirecionamento do botão', () => {
        const { history } = renderWithRouter(<App />)
        history.push('/foods');
        const imgPerfil = screen.getByTestId('profile-top-btn');

        userEvent.click(imgPerfil);
        expect(history.location.pathname).toBe('/profile')
    })

    it('Testando o click do botão de Buscar', () => {
        const { history } = renderWithRouter(<App />)
        history.push('/foods');
        const imgLupa = screen.getByTestId('search-top-btn');
        
        userEvent.click(imgLupa);
        const radioIngredient = screen.getByTestId('ingredient-search-radio');
        const inputSearch = screen.getByTestId('search-input');
        const radioName = screen.getByTestId('name-search-radio');
        const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
        const btnSearch = screen.getByTestId('exec-search-btn');
        expect(radioIngredient).toBeInTheDocument();
        expect(radioName).toBeInTheDocument();
        expect(radioFirstLetter).toBeInTheDocument();
        expect(btnSearch).toBeInTheDocument();
        expect(inputSearch).toBeInTheDocument();
        
        userEvent.click(imgLupa);
        expect(radioIngredient).not.toBeInTheDocument();
        expect(radioName).not.toBeInTheDocument();
        expect(radioFirstLetter).not.toBeInTheDocument();
        expect(btnSearch).not.toBeInTheDocument();
        expect(inputSearch).not.toBeInTheDocument();
    })
})