const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Store the latest location
let latestLocation = null;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to receive location updates from OwnTracks
app.post('/location', (req, res) => {
    const location = req.body;
    if (location.lat && location.lon) {
        latestLocation = {
            lat: location.lat,
            lon: location.lon,
            timestamp: new Date().toISOString()
        };
        console.log('Location updated:', latestLocation);
    }
    res.status(200).send('OK');
});

// Endpoint to get the latest location
app.get('/location', (req, res) => {
    res.json(latestLocation);
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 