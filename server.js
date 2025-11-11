const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const detectPort = require('detect-port');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ticketingDB';

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRoutes);

// Ensure uploads directory exists
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB.');

    // Use detect-port only in development, use PORT directly in production
    if (process.env.NODE_ENV === 'production') {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
      });
    } else {
      detectPort(PORT)
        .then((freePort) => {
          if (freePort !== Number(PORT)) {
            console.log(`Port ${PORT} is in use. Switching to ${freePort}.`);
          }
          app.listen(freePort, () => {
            console.log(`Server is running on port ${freePort}.`);
          });
        })
        .catch((err) => {
          console.error('Failed to find a free port:', err.message);
          process.exit(1);
        });
    }
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  });

