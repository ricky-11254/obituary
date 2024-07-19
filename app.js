const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const submitObituaryRouter = require('./submit_obituary');
const viewObituariesRouter = require('./view_obituaries');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Routes
app.use('/submit-obituary', submitObituaryRouter);
app.use('/view-obituaries', viewObituariesRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

