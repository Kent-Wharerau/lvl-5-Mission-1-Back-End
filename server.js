require("dotenv").config();


// ========== LIBRARIES ========== //

// Import the required libraries
const express = require("express"); 
const axios = require("axios"); 
const cors = require("cors"); 
const multer = require("multer"); 


const app = express();
const port = 5000;



// ========== MIDDLEWARES ========== //

// Enable Cross-origin Resource Sharing - allows the front end to talk to the back end
app.use(cors());

// sets up multer to handle image uploads in memory - images are not saved to disc
const upload = multer(); // Uses default settings - stores the files in memory



// ========== ENDPOINTS ========== //

// Defines a POST endpoint to handle image predictions
app.post("/predict", upload.single("image"), async (req, res) => {
  try {
    // Checks if an image was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    // Gets the image data from the upload file
    const imageBuffer = req.file.buffer;

    // Gets Custom Vision API keys from the .env file
    const predictionKey = process.env.CUSTOM_VISION_PREDICTION_KEY;
    const endpoint = process.env.CUSTOM_VISION_ENDPOINT;

    // Sends the image to Azure Custom Vision API for prediction
    const response = await axios.post(endpoint, imageBuffer, {
      headers: {
        "Prediction-Key": predictionKey,
        "Content-Type": "application/octet-stream", // Sending raw image data
      },
    });

    // Logs and sends back the prediction results to the console
    console.log("Prediction result:", response.data); // Logs successful result
    res.json(response.data);
  } catch (error) {
    // If something goes wrong, log the error and send a 500 response 
    console.error("Prediction failed:", error.response?.data || error.message);
    res.status(500).json({ error: "Prediction failed" });
  }
});

// Adds a basic GET route so visiting localhost:5000 shows a message "Prediction API is running"
app.get("/", (req, res) => {
  res.send("Prediction API is running.");
});



// ========== PORT ========== //

// Start the server and listen on the chosen port (5000)
app.listen(port, () => {
  console.log(`✅ Prediction server running at http://localhost:${port}`);
});
