import React from 'react';
import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

describe('Testa componete Start Recipe', () => {
  it('Verifica se é renderizado na tela de Foods', () => {
    const { history } = renderWithRouter(<App/>)
    history.push('/foods/:id');

    const startBtn = screen.getByTestId('start-recipe-btn');
    expect(startBtn).toBeInTheDocument();
  })

  it('Verifica se é renderizado na tela de Drinks', () => {
    const { history } = renderWithRouter(<App/>)
    history.push('/drinks/:id');

    const startBtn = screen.getByTestId('start-recipe-btn');
    expect(startBtn).toBeInTheDocument();
  })

  it('Verifica se ao clicar muda para Foods in progress', () => {
  const { history } = renderWithRouter(<App/>)
  history.push('/foods/:id');

  const startBtn = screen.getByTestId('start-recipe-btn');
  userEvent.click(startBtn);

  expect(history.location.pathname).toBe('/foods/:id/in-progress')
  })

  it('Verifica se ao clicar muda para Drinks in progress', () => {
  const { history } = renderWithRouter(<App/>)
  history.push('/drinks/:id');

  const startBtn = screen.getByTestId('start-recipe-btn');
  userEvent.click(startBtn);

  expect(history.location.pathname).toBe('/drinks/:id/in-progress')
  })
})