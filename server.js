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

// Log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Endpoint to receive location updates from OwnTracks
app.post('/location', (req, res) => {
    console.log('Received location update:', JSON.stringify(req.body, null, 2));
    
    // Handle OwnTracks payload format
    const location = req.body;
    if (location._type === 'location' && location.lat && location.lon) {
        latestLocation = {
            lat: location.lat,
            lon: location.lon,
            timestamp: new Date(location.tst * 1000).toISOString(), // Convert Unix timestamp to ISO
            accuracy: location.acc,
            battery: location.batt,
            altitude: location.alt
        };
        console.log('Location updated:', latestLocation);
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
    console.log('Serving main page');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add a test endpoint
app.get('/test', (req, res) => {
    console.log('Test endpoint hit');
    res.send('Server is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 