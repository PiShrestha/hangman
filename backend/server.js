const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001; // Changed 5000 to 5001

// Middleware
app.use(cors());
app.use(express.json());

// Sample phrases
const phrases = [
    "To be or not to be",
    "I think, therefore I am",
    "The only thing we have to fear is fear itself"
];

// API endpoint to get phrases
app.get('/api/phrases', (req, res) => {
    res.json(phrases);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
