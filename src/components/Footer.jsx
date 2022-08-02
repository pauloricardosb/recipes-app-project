import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

// import { Container } from './styles';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <div className="son-footer">
        <div>
          <Link to="/drinks">
            <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="drinkIcon" />
          </Link>
        </div>
        <div>
          <Link to="/foods">
            <img src={ mealIcon } alt="mealIcon" data-testid="food-bottom-btn" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
