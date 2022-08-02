import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

describe('Verifica cobertura da tela de perfil', () => {
  it('Testa se elementos são renderizados na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const userEmail = screen.getByTestId('profile-email');
    const doneButton = screen.getByTestId('profile-done-btn');
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    const logoutButton = screen.getByTestId('profile-logout-btn');
    const header = screen.getByTestId('page-title');
    const profileIcon = screen.getByTestId('profile-top-btn');

    expect(userEmail).toBeInTheDocument();
    expect(doneButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
  });

});

describe('Testa funcionalidade dos botões', () => {
  it('Testa Done Button', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const doneButton = screen.getByTestId('profile-done-btn');

    userEvent.click(doneButton);
    expect(history.location.pathname).toBe('/done-recipes');
  })

  it('Testa Favorite Button', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const favoriteButton = screen.getByTestId('profile-favorite-btn');

    userEvent.click(favoriteButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  })

  it('Testa Logout Button', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const logoutButton = screen.getByTestId('profile-logout-btn');

    userEvent.click(logoutButton);
    expect(history.location.pathname).toBe('/');
  })

});