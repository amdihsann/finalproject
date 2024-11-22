// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

const port = 5000;
app.listen(port, () => {
console.log('Aplikasi telah berjalan pada http://localhost:${port}/diskusi.html');
})

app.use(cors());
app.use(bodyParser.json());

let discussions = [];

// Endpoint to get all discussions
app.get('/discussions', (req, res) => {
    res.json(discussions);
});

// Endpoint to create a new discussion
app.post('/discussions', (req, res) => {
    const { username, title, message } = req.body;
    const newDiscussion = { username, title, message };
    discussions.push(newDiscussion);
    res.status(201).json(newDiscussion);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});