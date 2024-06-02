import React from 'react';
import './App.css';
import ContractInteractor from './components/ContractInteractor';
import BackendInteractor from './components/BackendInteractor';

function App() {
  const carrotEmojis = '🥕'.repeat(1000); // Ändere die Zahl nach Bedarf, um mehr oder weniger Karotten-Emojis anzuzeigen

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Neptun DApp</h1>
        <ContractInteractor />
        <BackendInteractor />
        <div style={{ marginTop: '20px', fontSize: '20px' }}>
          {carrotEmojis}
        </div>
      </header>
    </div>
  );
}

export default App;

