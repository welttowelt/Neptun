import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';

const contractAddress = "0x155469ecE36aa6108d9Ab3c64D24d8718389C38f";
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "initialSupply",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const ContractInteractor = () => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [balance, setBalance] = useState(0);
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

  return (
    <div className="container">
      <h2>Total Supply: {totalSupply} MTK</h2>
      <button onClick={fetchBalance} className="btn btn-primary mt-3">Check Balance</button>
      <h3 className="mt-3">Balance: {balance} MTK</h3>
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
      <button onClick={transferTokens} className="btn btn-success mt-3">Transfer Tokens</button>
    </div>
  );
};

export default ContractInteractor;

