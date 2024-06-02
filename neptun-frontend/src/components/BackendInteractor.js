import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BackendInteractor = () => {
  const [tokenInfo, setTokenInfo] = useState({ name: '', symbol: '', total_supply: '' });

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/token');
        setTokenInfo(response.data);
      } catch (error) {
        console.error("Error fetching token info:", error);
      }
    };

    fetchTokenInfo();
  }, []);

  return (
    <div className="container">
      <h2>Token Name: {tokenInfo.name}</h2>
      <h3>Symbol: {tokenInfo.symbol}</h3>
      <h3>Total Supply: {tokenInfo.total_supply}</h3>
    </div>
  );
};

export default BackendInteractor;

