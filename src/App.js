import React from 'react';
import ProviderRecipes from './context/Provider';
import Routes from './routes/Routes';
import './App.css';

function App() {
  return (
    <ProviderRecipes>
      <Routes />
    </ProviderRecipes>
  );
}

export default App;
