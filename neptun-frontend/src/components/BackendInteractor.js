import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BackendInteractor = () => {
  const [tokenInfo, setTokenInfo] = useState({});

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
    <div>
      <h2>Token Info</h2>
      <pre>{JSON.stringify(tokenInfo, null, 2)}</pre>
    </div>
  );
};

export default BackendInteractor;

