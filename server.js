const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

const storage = multer.memoryStorage(); // Store files in memory (temporary)

const upload = multer({ storage });

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Your logic to process or serve the file goes here

    res.json({ message: 'Image uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
