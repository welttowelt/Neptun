import React from 'react';
import './App.css';
import ContractInteractor from './components/ContractInteractor';
import BackendInteractor from './components/BackendInteractor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Neptun DApp</h1>
        <ContractInteractor />
        <BackendInteractor />
      </header>
    </div>
  );
}

export default App;

