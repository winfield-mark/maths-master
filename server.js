const express = require('express');
const path = require('path');
const fs = require('fs'); // Added to read/write the user file
const app = express();
const PORT = 3000;

// Middleware to read JSON data sent from the browser
app.use(express.json());

// Serve static files
app.use(express.static('public'));
app.use('/pages', express.static('pages'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Path to your "database" file
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

// Helper: Ensure the data directory and users.json exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([])); 
}

// --- API ROUTES ---

// 1. Login Route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    
    // Find user with matching credentials
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(401).json({ success: false, message: "Invalid username or password" });
    }
});

// 2. Register Route
app.post('/api/register', (req, res) => {
    const { username, password, email } = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const newUser = {
        username, password, email,
        lessonsDone: [],
        tokens: 0,
        gameState: { level: 1, lastPlayed: new Date().toISOString().split('T')[0], pads: [], characters: [] }
    };

    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    res.json({ success: true, user: newUser });
});

// 3. Save User Progress Route
app.post('/api/save-progress', (req, res) => {
    const updatedUser = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    
    // Find the index of the user we are updating
    const index = users.findIndex(u => u.username === updatedUser.username);
    
    if (index !== -1) {
        // Update the user data in our array
        users[index] = updatedUser;
        
        // Write the whole array back to the file
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: "User not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});