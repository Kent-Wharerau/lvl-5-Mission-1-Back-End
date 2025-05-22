# Vehicle Image Prediction Backend

This is a simple backend server built with Node.js and Express. It allows a frontend to upload an image, sends the image to Azure Custom Vision for analysis, and returns the prediction results.

## Features

- Accepts image uploads
- Sends images to Azure Custom Vision API
- Returns prediction results
- Allows requests from a frontend (CORS enabled)

## Getting Started

### 1. Install dependencies

npm install

### 2. Create a `.env` file

Add your Azure Custom Vision credentials:

```env
CUSTOM_VISION_PREDICTION_KEY=your_prediction_key
CUSTOM_VISION_ENDPOINT=your_custom_vision_endpoint_url
```

### 3. Start the server

npm run dev

The server will run at: `http://localhost:5000`

## API Endpoints

### `GET /`

Returns a basic message to show the server is running.

### `POST /predict`

Accepts an image file in `multipart/form-data` format.

Form field name: `image`