const express = require('express'); // web application framework for Node.js and you can set up routes, handle requests and responses, manage middleware
const cors = require('cors'); // security, restrictions, prevent malicious websites
const axios = require('axios'); // make HTTP requests (like GET, POST, PUT, DELETE) 

const app = express();
const PORT = process.env.PORT || 5001; // localhost:5001

app.use(cors());
app.use(express.json());

app.get('/quotes/:tag', async (req, res) => {
    const { tag } = req.params; // frontend the requests a tag 
    try {
        const response = await axios.get(`https://quoteslate.vercel.app/api/quotes/random?tags=${tag}&count=4&minLength=0&maxLength=100`);
        // get the quotes from the data
        const quotes = response.data;
        // out of 4 quotes, randomly choose one
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        // return the ouput in json back to the client (frontend)
        res.json(randomQuote);
    } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).json({ error: 'Failed to fetch quotes' });
    }
});

// this is what is shown in the terminal
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
