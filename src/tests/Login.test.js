import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

describe('Testando a tela de Login', () => {
    it('Testando se os elementos já estão na página', () => {
        renderWithRouter(<App/>)
        const inputEmail = screen.getByTestId('email-input');
        const inputSenha = screen.getByTestId('password-input');
        const btnSubmit = screen.getByTestId('login-submit-btn');

        expect(inputEmail).toBeInTheDocument();
        expect(inputSenha).toBeInTheDocument();
        expect(btnSubmit).toBeInTheDocument();
    })

    it('Testando a validação dos inputs e o redirecionamento para a página de Foods', () => {
        const { history } = renderWithRouter(<App/>)
        const inputEmail = screen.getByTestId('email-input');
        const inputSenha = screen.getByTestId('password-input');
        const btnSubmit = screen.getByTestId('login-submit-btn');

        expect(btnSubmit).toBeDisabled();
        userEvent.type(inputEmail, 'alunoTrybe@gmail.com');
        userEvent.type(inputSenha, '1234567');
        expect(btnSubmit).not.toBeDisabled();

        userEvent.click(btnSubmit);
        expect(history.location.pathname).toBe('/foods')
    })
})