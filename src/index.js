const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

app.get('/', (req, res) => {
    res.send('Hello World!');
});

let users = [];

app.post('/users', (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    const user = {
        id: (users.length + 1).toString(),
        name: req.body.name,
        email: req.body.email
    }
    users.push(user);
    res.status(201).json(user);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
})

app.get('/users', (req, res) => {
    res.json(users);
})

app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(userIndex,1);
    res.sendStatus(204);

})

app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    user.email = req.body.email;
    user.name = req.body.name;
    res.status(200).json(user);
})

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing