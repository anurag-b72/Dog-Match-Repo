import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WinnerScreen.css';

function WinnerScreen() {
  const [winnerImage, setWinnerImage] = useState(null);
  const [loserImages, setLoserImages] = useState([]);

  useEffect(() => {
    fetchWinnerData();
  }, []);

  const fetchWinnerData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/winnerData'); // Replace with your backend endpoint
      setWinnerImage(response.data.winner);
      setLoserImages(response.data.losers);
    } catch (error) {
      console.error('Error fetching winner data: ', error);
    }
  };

  return (
    <div className="winner-screen">
      <h1>Winner Screen</h1>
      {winnerImage && <img src={winnerImage} alt="Winner Dog" className="winner-image" />}
      {loserImages.length > 0 && (
        <div className="loser-images">
          <h2>Loser Dogs</h2>
          {loserImages.map((loser, index) => (
            <img key={index} src={loser} alt={`Loser Dog ${index + 1}`} className="loser-image" />
          ))}
        </div>
      )}
    </div>
  );
}

export default WinnerScreen;
