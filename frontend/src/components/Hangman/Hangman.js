import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Game from '../Game/Game'; // Import the Game component

const Hangman = () => {
  const [phrases, setPhrases] = useState([]);
  const [selectedPhrase, setSelectedPhrase] = useState('');

  useEffect(() => {
    console.log('Fetching phrases...');
    axios.get('http://localhost:5001/api/phrases')
      .then(response => {
        console.log('Data fetched:', response.data);
        setPhrases(response.data);
        // Select a random phrase for the game
        const randomPhrase = response.data[Math.floor(Math.random() * response.data.length)];
        setSelectedPhrase(randomPhrase);
      })
      .catch(error => console.error('Error fetching phrases:', error));
  }, []);

  return (
    <div>
      <h1>Hangman with Phrases or Quotes</h1>
      {selectedPhrase && <Game phrase={selectedPhrase} />}
    </div>
  );
};

export default Hangman;
