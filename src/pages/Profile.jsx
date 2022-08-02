import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Profile.css';

function Profile() {
  const [email, setEmail] = useState({});
  const profile = 'Profile';
  const bool = false;

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    setEmail(userEmail);
  }, []);

  const handleLogout = () => localStorage.clear();

  return (
    <div>
      <Header title={ profile } hasSearch={ bool } />
      <div>
        <h3
          className="email"
          data-testid="profile-email"
        >
          { email && email.email}
        </h3>
        <div className="profile-btn">
          <Link to="/done-recipes">
            <button className="btn" type="button" data-testid="profile-done-btn">
              Done Recipes
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <button className="btn" type="button" data-testid="profile-favorite-btn">
              Favorite Recipes
            </button>
          </Link>
          <Link to="/">
            <button
              onClick={ handleLogout }
              className="btn"
              type="button"
              data-testid="profile-logout-btn"
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
