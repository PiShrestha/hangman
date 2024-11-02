import React, { useState, useEffect } from 'react';
import '../styles/TriviaGame.css'; // Import CSS file for styling

const TriviaGame = () => {
  const [gameType, setGameType] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch categories from the API when the component loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        setCategories(data.trivia_categories);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again later.');
      }
    };

    fetchCategories();
  }, []);

  // Fetch questions for the selected category
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=3&category=${selectedCategory}&type=multiple`
        );
        const data = await response.json();
        if (data.response_code === 0) {
          setQuestions(data.results);
          setCurrentQuestionIndex(0); // Reset question index
          setScore(0); // Reset score
          setUserAnswers([]); // Clear previous answers
        } else {
          setError('Failed to load questions. Please try again later.');
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions. Please try again later.');
      }
    };

    fetchQuestions();
  }, [selectedCategory]);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setUserAnswers([...userAnswers, { question: currentQuestion.question, answer }]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
      return null;
    }

    return (
      <div className="question-card">
        <p dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
        <ul>
          {shuffleAnswers([
            currentQuestion.correct_answer,
            ...currentQuestion.incorrect_answers,
          ]).map((answer, index) => (
            <li key={index}>
              <button onClick={() => handleAnswer(answer)} dangerouslySetInnerHTML={{ __html: answer }} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleGameTypeSelection = (type) => {
    setGameType(type);
    setSelectedCategory(null);
    setQuestions([]);
    setScore(0);
    setUserAnswers([]);
  };

  const resetGame = () => {
    setGameType(null);
    setCategories([]);
    setSelectedCategory(null);
    setQuestions([]);
    setScore(0);
    setUserAnswers([]);
    setError(null);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  // If no game type is selected, show game type options
  if (!gameType) {
    return (
      <div className="game-type-selection">
        <h3>Select a Game Type</h3>
        <button onClick={() => handleGameTypeSelection('trivia')}>Trivia</button>
        <button onClick={() => handleGameTypeSelection('quickPuzzle')}>Quick Puzzle</button>
        <button onClick={() => handleGameTypeSelection('rockPaperScissors')}>Rock Paper Scissors</button>
      </div>
    );
  }

  // If no category is selected, show category options
  if (gameType === 'trivia' && !selectedCategory) {
    return (
      <div className="category-selection">
        <h3>Select a Trivia Category</h3>
        <div className="category-buttons">
          {categories.length > 0 ? (
            categories.map((category) => (
              <button key={category.id} onClick={() => setSelectedCategory(category.id)}>
                {category.name}
              </button>
            ))
          ) : (
            <div>Loading categories...</div>
          )}
        </div>
      </div>
    );
  }

  // If questions are still loading, show loading indicator
  if (gameType === 'trivia' && questions.length === 0) {
    return <div className="loading">Loading questions...</div>;
  }

  // If all questions have been answered, show the score
  if (gameType === 'trivia' && currentQuestionIndex >= questions.length) {
    return (
      <div className="score-display">
        <h3>Your Score: {score} out of {questions.length}</h3>
        <button onClick={resetGame}>Play Again</button>
      </div>
    );
  }

  // Render the current question
  return (
    <div className="trivia-game">
      <h3>Trivia Questions</h3>
      {renderQuestion()}
    </div>
  );
};

// Utility function to shuffle answers
const shuffleAnswers = (answers) => {
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  return answers;
};

export default TriviaGame;
