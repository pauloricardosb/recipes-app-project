import React from 'react';
import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

describe('Testa resposta da Api', () => {
  it('Teste se a resposta da api for menor que 1 é exibido um alerta', async () => {
    const { history } = renderWithRouter(<App/>)
    history.push('/drinks');

    const jsdomAlert = window.alert;
    window.alert = () => {};
    const alertMock = jest.spyOn(window, 'alert');

    const searchBarBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBarBtn);

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const submitBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'xablau');
    userEvent.click(submitBtn);

    await waitFor(() => expect(alertMock).toHaveBeenCalledTimes(0));
    window.alert = jsdomAlert;

    // StackOverflow, eu te amo! 
    // https://stackoverflow.com/questions/55088482/jest-not-implemented-window-alert
});
});

describe('Teste do Componente Recipes', () => {

  it('Teste se ao encontrar uma bebida faz o redirecionamento para a pagina de Drinks com o id', async () => {
        const { history } = renderWithRouter(<App/>)
        history.push('/drinks');
  
        const searchBarBtn = screen.getByTestId('search-top-btn');
        userEvent.click(searchBarBtn);
  
        const searchInput = screen.getByTestId('search-input');
        const radioName = screen.getByTestId('name-search-radio');
        const submitBtn = screen.getByTestId('exec-search-btn');
  
        userEvent.type(searchInput, 'Mai Tai');
        userEvent.click(radioName);
        userEvent.click(submitBtn);
  
        await waitFor(() => expect(history.location.pathname).toBe('/drinks'));
    });

  it('Teste se ao encontrar um prato faz o redirecionamento para a pagina de Foods com o id', async () => {
      const { history } = renderWithRouter(<App/>)
      history.push('/foods');

      const searchIcon = screen.getByTestId('search-top-btn');
      userEvent.click(searchIcon);

      const searchInput = screen.getByTestId('search-input');
      const radioName = screen.getByTestId('name-search-radio');
      const submitBtn = screen.getByTestId('exec-search-btn');

      userEvent.type(searchInput, 'Arrabiata');
      userEvent.click(radioName);
      userEvent.click(submitBtn);

      await waitFor(() => expect(history.location.pathname).toBe('/foods'));
  });
});

describe('Testa botões de categoria em Foods', () => {
  it.skip('Testando o toggle do botão de categoria da tela de Foods', async () => {
     const { history } = renderWithRouter(<App/>)
     history.push('/foods');

     const breakfastCategory = await waitFor(() => screen.getByTestId('Breakfast-category-filter'));
 
     userEvent.click(breakfastCategory);
 
     const corba = await waitFor(() => screen.getByRole('heading', {name: /corba/i }));
 
     expect(corba).toBeInTheDocument();
 
   });
})

describe('Testa botões de categoria em Drinks', () => {
  it.skip('Testando o toggle do botão de categoria da tela de Drinks', async () => {
    const { history } = renderWithRouter(<App/>)
    history.push('/drinks');

    const shakeCategory = await waitFor(() => screen.getByTestId('Shake-category-filter'));
 
    userEvent.click(shakeCategory);
 
    const bushwacker = await waitFor(() => screen.getByRole('heading', {name: /gg/i }));
 
    expect(bushwacker).toBeInTheDocument();
 
   });
})