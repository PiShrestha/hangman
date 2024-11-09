import React, { useState } from 'react';
import axios from 'axios';
import Game from '../Game/Game';

const Hangman = () => {
  const [selectedPhrase, setSelectedPhrase] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const tags = ['motivation', 'inspiration', 'life', 'love', 'success', 'happiness', 'growth'];

  const fetchQuote = async (tag) => {
    try {
      const response = await axios.get(`http://localhost:5001/quotes/${tag}`);
      if (response.data && response.data.quote) {
        setSelectedPhrase(response.data);
      } else {
        setSelectedPhrase({ quote: 'No quote available', author: '' });
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      setSelectedPhrase({ quote: 'Failed to load quote', author: '' });
    }
  };

  const handleTagSelection = (tag) => {
    setSelectedTag(tag);
    fetchQuote(tag);
  };

  const restartGame = () => {
    if (selectedTag) {
      fetchQuote(selectedTag);
    }
  };

  return (
    <div>
      <h1>Hangman with Phrases or Quotes</h1>
      <div>
        <h2>Select a Tag:</h2>
        {tags.map(tag => (
          <button key={tag} onClick={() => handleTagSelection(tag)}>
            {tag}
          </button>
        ))}
      </div>
      {selectedPhrase && selectedPhrase.quote && (
        <div>
          <p>You have selected <strong>{selectedTag}</strong> </p>
          <p><strong>Quote Author:</strong> <em>{selectedPhrase.author || "Unknown"}</em></p>
          <Game phrase={selectedPhrase.quote} onRestartGame={restartGame} />
        </div>
      )}
    </div>
  );
};

export default Hangman;
