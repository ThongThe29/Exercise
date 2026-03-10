const express = require('express');
const path = require('path');

const app = express();
const PORT = 4002;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for SPA routing if needed
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Client Fashion server running on http://localhost:${PORT}`);
});
