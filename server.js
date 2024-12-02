require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());


// Set up multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve the static HTML form
app.use(express.static('public'));

// POST endpoint to handle file uploads
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }

  // Send back file metadata
  const fileMetadata = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };
  
  res.json(fileMetadata);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
