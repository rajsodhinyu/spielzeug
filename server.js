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
    console.log('Received location update:', JSON.stringify(req.body, null, 2));
    
    // OwnTracks sends data in a specific format
    const location = req.body;
    if (location._type === 'location' && location.lat && location.lon) {
        latestLocation = {
            lat: location.lat,
            lon: location.lon,
            timestamp: new Date().toISOString()
        };
        console.log('Location updated:', latestLocation);
        res.status(200).send('OK');
    } else if (location.lat && location.lon) {
        // Fallback for different format
        latestLocation = {
            lat: location.lat,
            lon: location.lon,
            timestamp: new Date().toISOString()
        };
        console.log('Location updated (fallback format):', latestLocation);
        res.status(200).send('OK');
    } else {
        console.log('Invalid location data received:', JSON.stringify(location));
        res.status(400).send('Invalid location data');
    }
});

// Endpoint to get the latest location
app.get('/location', (req, res) => {
    console.log('Location requested, current location:', latestLocation);
    res.json(latestLocation);
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add a test endpoint
app.get('/test', (req, res) => {
    res.send('Server is running!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 