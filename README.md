# Location Tracker

A simple location tracking application that displays real-time location updates on a map.

## Features
- Real-time location tracking
- OpenStreetMap integration
- Compatible with OwnTracks mobile app
- Web interface for viewing current location

## Setup
1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

## Environment Variables
- `PORT`: Server port (default: 3000)

## Mobile App Setup (OwnTracks)
1. Download OwnTracks from App Store/Play Store
2. Configure in Settings:
   - Mode: HTTP
   - URL: `https://your-deployed-url/location`
   - Method: POST 