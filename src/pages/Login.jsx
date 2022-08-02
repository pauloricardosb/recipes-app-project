import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/context';
import '../styles/Login.css';
import logotipo from '../images/logo.png';

function Login() {
  const { disabledBtn, loginInput, handleChange } = useContext(Context);
  const history = useHistory();

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: loginInput.email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  return (
    <div className="login-div">
      <div className="logo-div">
        <img className="login-logo" src={ logotipo } alt="logotipo" />
        <span>Our Recipes</span>
      </div>
      <h1 className="login-title">Login</h1>
      <h2 className="login-title-label">Welcome! Please enter your details.</h2>
      <div className="form-div">
        <form>
          <label className="mail-label" htmlFor="mail-input">
            <p>Email</p>
            <input
              type="email"
              value={ loginInput.email }
              className="mail-input"
              data-testid="email-input"
              onChange={ handleChange }
              name="email"
            />
          </label>

          <label className="password-label" htmlFor="password-input">
            <p>Password</p>
            <input
              type="password"
              className="password-input"
              data-testid="password-input"
              value={ loginInput.password }
              onChange={ handleChange }
              name="password"
            />
          </label>
        </form>
        <div className="login-btn-div">
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ disabledBtn }
            onClick={ handleSubmit }
            className="sign-btn"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
