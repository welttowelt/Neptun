import React, { useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import { fetchBalance, transferTokens, stakeTokens } from './ContractInteractor';

function App() {
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [stakingAmount, setStakingAmount] = useState('');

  async function getBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await fetchBalance(provider, accounts[0]);
    setBalance(balance);
  }

  async function handleTransfer() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    await transferTokens(provider, signer, recipient, ethers.utils.parseEther(amount));
  }

  async function handleStake() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    await stakeTokens(provider, signer, ethers.utils.parseEther(stakingAmount));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Token Dashboard</h1>
        <button onClick={getBalance}>Get Balance</button>
        {balance && <p>Balance: {balance}</p>}
        <div>
          <h2>Transfer Tokens</h2>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleTransfer}>Transfer</button>
        </div>
        <div>
          <h2>Stake Tokens</h2>
          <input
            type="text"
            placeholder="Amount to Stake"
            value={stakingAmount}
            onChange={(e) => setStakingAmount(e.target.value)}
          />
          <button onClick={handleStake}>Stake</button>
        </div>
      </header>
    </div>
  );
}

export default App;

