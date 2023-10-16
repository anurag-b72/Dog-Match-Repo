const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());

let dogImages = [];

app.get('/api/dogs', async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random/2');
    dogImages = response.data.message;
    res.json(dogImages);
  } catch (error) {
    console.error('Error fetching dog images: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/saveWinner', (req, res) => {
  const { winnerIndex } = req.body;
  const winnerImage = dogImages[winnerIndex];
  // Save the winnerImage to the server or database as needed
  console.log(`Winner saved: ${winnerImage}`);
  res.json({ message: 'Winner saved successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
