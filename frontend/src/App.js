// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import { Login } from "./login-register/Login.jsx"
import { Register } from "./login-register/Register"
import WinnerScreen from './winner-screen/WinnerScreen.jsx';

function App() {
  const [dogImages, setDogImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    fetchDogImages();
  }, []);

  // const fetchDogImages = async () => {
  //   try {
  //     const response = await axios.get('/api/dogs');
  //     setDogImages(response.data);
  //   } catch (error) {
  //     console.error('Error fetching dog images: ', error);
  //   }
  // };

  const fetchDogImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dogs');
      console.log(response.data); // Log the response to check its format
      setDogImages(response.data);
    } catch (error) {
      console.error('Error fetching dog images: ', error);
    }
  };
  

  const handleSelectWinner = () => {
    if (selectedImageIndex !== null) {
      axios.post('/api/saveWinner', { winnerIndex: selectedImageIndex })
        .then(response => {
          console.log(response.data.message);
          // Implement logic to navigate to the Winner Screen
        })
        .catch(error => {
          console.error('Error saving winner: ', error);
        });
    }
  };

  return (
    <Router>
      <div className="App">
        {/* <Login /> */}
        <header className="App-header">
          <h1>Dog Match</h1>
          <div className="dog-images">
            {dogImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Dog ${index + 1}`}
                className={selectedImageIndex === index ? 'selected' : ''}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
          <Routes> {/* Wrap your routes with <Routes> */}
            <Route path="/winner-screen" element={<WinnerScreen />} /> {/* Use the element prop */}
          </Routes>
          <Link to="/winner-screen">
              <button className="select-button">Select Winner</button>
          </Link>
          {/* <button className="select-button" onClick={handleSelectWinner}>
            Select Winner
          </button> */}
        </header>
      </div>
      {/* <Route path='/winner-screen' component={WinnerScreen} />     */}
    </Router>
  );
}

export default App;
