import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './renderWithPath';

describe('Testando componente Finish Button', () => {

  it('Verifica se button é renderizado na tela de Drinks', () => {
    renderPath("/drinks/:id/in-progress")
    
    const finishBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishBtn).toBeInTheDocument();
  })

  it('Verifica se button é renderizado na tela de Foods', () => {
    renderPath("/foods/:id/in-progress")
    
    const finishBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishBtn).toBeInTheDocument();
  }) 

  it('Verifica se ao clicar é direcionado para tela de receitas feitas de Foods', () => {
    const { history } = renderPath("/foods/:id/in-progress")

    const finishBtn = screen.getByTestId('finish-recipe-btn');

    userEvent.click(finishBtn);
    expect(history.location.pathname).toBe('/foods/:id/in-progress');
  })

  it('Verifica se ao clicar é direcionado para tela de receitas feitas de Drinks', () => {
    const { history } = renderPath("/drinks/:id/in-progress")

    const finishBtn = screen.getByTestId('finish-recipe-btn');

    userEvent.click(finishBtn);
    expect(history.location.pathname).toBe('/drinks/:id/in-progress');
  })

  it('Verifica se botão está desativado inicialmente em Foods', () => {
    renderPath("/foods/:id/in-progress")

    const finishBtn = screen.getByTestId('finish-recipe-btn');

    userEvent.click(finishBtn);
    expect(finishBtn).toBeDisabled();
  })

  it('Verifica se botão está desativado inicialmente em Drinks', () => {
    renderPath("/drinks/:id/in-progress")

    const finishBtn = screen.getByTestId('finish-recipe-btn');

    userEvent.click(finishBtn);
    expect(finishBtn).toBeDisabled();
  })

  it('Testa função HandleFinish em Foods', async () => {
    renderPath("/foods/:id/in-progress")
    const handleFinish = jest.fn();
 
    const finishButton = screen.getByTestId('finish-recipe-btn');
  
    userEvent.click(finishButton);
    await waitFor(() => expect(handleFinish).toBeCalledTimes(0));  
})

  it('Testa função HandleFinish em Drinks', async () => {
    renderPath("/drinks/:id/in-progress")
    const handleFinish = jest.fn();

    const finishButton = screen.getByTestId('finish-recipe-btn');
    userEvent.click(finishButton);

    await waitFor(() => expect(handleFinish).toBeCalledTimes(0));  
  })
});