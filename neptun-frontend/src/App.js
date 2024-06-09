import React, { useEffect, useState } from 'react';
import './App.css';
import { init, fetchBalance, transferTokens, stakeTokens } from './ContractInteractor';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [stakeAmount, setStakeAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTo, setTransferTo] = useState('');

  useEffect(() => {
    const initApp = async () => {
      const address = await init();
      setWalletAddress(address);
      const balance = await fetchBalance(address);
      setBalance(balance);
    };

    initApp();
  }, []);

  const handleTransfer = async () => {
    await transferTokens(transferTo, transferAmount);
    const balance = await fetchBalance(walletAddress);
    setBalance(balance);
  };

  const handleStake = async () => {
    await stakeTokens(stakeAmount);
    const balance = await fetchBalance(walletAddress);
    setBalance(balance);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Crypto Staking App</h1>
        <p>Shrecker iupdate: Das ist eine neue Änderung.</p>
        <p>Your wallet address: {walletAddress}</p>
        <p>Your balance: {balance}</p>
        <div>
          <h2>Transfer Tokens</h2>
          <input
            type="text"
            placeholder="Recipient address"
            value={transferTo}
            onChange={(e) => setTransferTo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
          <button onClick={handleTransfer}>Transfer</button>
        </div>
        <div>
          <h2>Stake Tokens</h2>
          <input
            type="text"
            placeholder="Amount"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
          />
          <button onClick={handleStake}>Stake</button>
        </div>
      </header>
    </div>
  );
}

export default App;

