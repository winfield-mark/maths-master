// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// 1. Serve static files from the 'public' directory
app.use(express.static('public'));

// 2. Serve page snippets from the pages folder
app.use('/pages', express.static('pages'));

// 3. Serve videos and other assets from the assets folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// 4. Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});