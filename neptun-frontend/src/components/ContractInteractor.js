import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';

const contractAddress = "0x208F061f0b321B74e4D71549C50283C70eb56B0b"; // Deine Contract-Adresse
const contractABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "stake",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const ContractInteractor = () => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [balance, setBalance] = useState(0);
  const [stake, setStake] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchTotalSupply = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        try {
          const supply = await contract.totalSupply();
          setTotalSupply(ethers.utils.formatUnits(supply, 18));
        } catch (error) {
          console.error("Error fetching total supply:", error);
        }
      } else {
        console.error("MetaMask not installed");
      }
    };

    fetchTotalSupply();
  }, []);

  const fetchBalance = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const address = await signer.getAddress();
        const balance = await contract.balanceOf(address);
        setBalance(ethers.utils.formatUnits(balance, 18));
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    } else {
      console.error("MetaMask not installed");
    }
  };

  const fetchStake = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const address = await signer.getAddress();
        const stake = await contract.getStake(address);
        setStake(ethers.utils.formatUnits(stake, 18));
      } catch (error) {
        console.error("Error fetching stake:", error);
      }
    } else {
      console.error("MetaMask not installed");
    }
  };

  const transferTokens = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const tx = await contract.transfer(recipient, ethers.utils.parseUnits(amount, 18));
        await tx.wait();
        alert('Transfer successful');
        fetchBalance(); // Update balance after transfer
      } catch (error) {
        console.error("Error transferring tokens:", error);
        alert('Transfer failed');
      }
    } else {
      console.error("MetaMask not installed");
    }
  };

  const stakeTokens = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const address = await signer.getAddress();
        const balance = await contract.balanceOf(address);
        const parsedAmount = ethers.utils.parseUnits(amount, 18);

        if (balance.lt(parsedAmount)) {
          alert('Not enough balance to stake');
          return;
        }

        const tx = await contract.stake(parsedAmount, { gasLimit: 3000000 });
        await tx.wait();
        alert('Staking successful');
        fetchBalance();
        fetchStake();
      } catch (error) {
        console.error("Error staking tokens:", error);
        alert(`Staking failed: ${error.message}`);
      }
    } else {
      console.error("MetaMask not installed");
    }
  };

  return (
    <div className="container">
      <h2>Total Supply: {totalSupply} MTK</h2>
      <button onClick={fetchBalance} className="btn btn-primary mt-3">Check Balance</button>
      <button onClick={fetchStake} className="btn btn-primary mt-3">Check Stake</button>
      <h3 className="mt-3">Balance: {balance} MTK</h3>
      <h3 className="mt-3">Stake: {stake} MTK</h3>
      <div className="form-group mt-3">
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group mt-3">
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-control"
        />
      </div>
      <button onClick={transferTokens} className="btn btn-primary mt-3">Transfer Tokens</button>
      <button onClick={stakeTokens} className="btn btn-primary mt-3">Stake Tokens</button>
    </div>
  );
};

export default ContractInteractor;

