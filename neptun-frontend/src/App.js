import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContractInteractor from './components/ContractInteractor';
import BackendInteractor from './components/BackendInteractor';

function App() {
  const carrotEmojis = '🥕'.repeat(1000);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="display-4">🥕🥕🥕 Wheel and Deal Carrots 🥕🥕🥕</h1>
        <div className="container mt-5">
          <ContractInteractor />
          <BackendInteractor />
        </div>
        <div className="carrot-container mt-3">
          {carrotEmojis}
        </div>
      </header>
    </div>
  );
}

export default App;

