import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './renderWithPath';

describe('Testando o componente SearchBar', () => {
    it('Testando o input radio de ingredient', () => {
        renderPath("/foods")
        const btnSearch = screen.getByTestId('search-top-btn');
        userEvent.click(btnSearch);

        const inputSearch = screen.getByTestId('search-input');
        const radioIngredient = screen.getByTestId('ingredient-search-radio');
        const sendBtn = screen.getByTestId('exec-search-btn');

        userEvent.type(inputSearch, 'o')
        userEvent.click(radioIngredient);
        userEvent.click(sendBtn);
    });
    test('Testando o input radio do name ', () => {
        renderPath("/foods")
        const btnSearch = screen.getByTestId('search-top-btn');
        userEvent.click(btnSearch);
  
        const inputSearch = screen.getByTestId('search-input');
        const radioName = screen.getByTestId('name-search-radio');
        const sendBtn = screen.getByTestId('exec-search-btn');
  
        userEvent.type(inputSearch , 'l')
        userEvent.click(radioName);
        userEvent.click(sendBtn);
    });
    test('Testando o radio de firstLetter', () => {
        renderPath("/foods")
        const btnSearch = screen.getByTestId('search-top-btn');
        userEvent.click(btnSearch);
    
        const inputSearch = screen.getByTestId('search-input');
        const radioFirstletter = screen.getByTestId('first-letter-search-radio');
        const sendBtn = screen.getByTestId('exec-search-btn');
    
        userEvent.type(inputSearch , 'a')
        userEvent.click(radioFirstletter);
        userEvent.click(sendBtn);
    });
})