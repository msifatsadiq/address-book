const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { index } = require('./controller/index'); // Import the controller
const { add } = require('./controller/add'); // Import the controller
const { edit } = require('./controller/edit'); // Import the controller
const { about } = require('./controller/about'); // Import the controller
const { save } = require('./controller/save'); // Import the controller
const { deleteAddress } = require('./controller/delete');

const app = express();
const PORT = 3000;


// Middleware for parsing URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes and use controller functions
app.get('/', index); // Use the index function
app.get('/add', add);
app.get('/edit', edit);
app.get('/about',about);
// Define a route to handle the POST request for saving
app.post('/save',save);

// Define a route to handle the DELETE request
app.get('/delete',deleteAddress);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
