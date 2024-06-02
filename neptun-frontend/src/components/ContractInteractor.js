import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const contractAddress = "0x155469ecE36aa6108d9Ab3c64D24d8718389C38f";
const contractABI = [
  // Füge hier dein ABI ein
];

const ContractInteractor = () => {
  const [totalSupply, setTotalSupply] = useState(0);

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

  return (
    <div>
      <h2>Total Supply: {totalSupply} MTK</h2>
    </div>
  );
};

export default ContractInteractor;

