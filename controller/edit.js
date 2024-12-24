// const path = require('path');

// // Handler function for the root route
// const edit = (req, res) => {
//   res.sendFile(path.join(__dirname, '../view', 'edit.html'));
// };

// module.exports = {
//   edit,
// };


const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');

// Database connection pool
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'sifatjoti106',
  database: 'address_book',
  port: 3306,
});

// Handler function for the Edit route
const edit = (req, res) => {
  const id = req.query.id;

  // SQL query to fetch the address by ID
  const query = 'SELECT * FROM addresses WHERE ID = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send('Internal Server Error');
    }

    // If no address found for the provided ID
    if (results.length === 0) {
      return res.status(404).send('Address not found');
    }

    // Get the address data
    const address = results[0];

    // Read the edit.html file
    const filePath = path.join(__dirname, '../view', 'edit.html');
    fs.readFile(filePath, 'utf8', (readErr, html) => {
      if (readErr) {
        console.error('Error reading edit.html:', readErr.message);
        return res.status(500).send('Internal Server Error');
      }

      // Replace placeholders in the HTML with the address data
      const updatedHtml = html.replace('{{ID}}', address.ID)
        .replace('{{name}}', address.name)
        .replace('{{phone}}', address.phone)
        .replace('{{email}}', address.email)
        .replace('{{address}}', address.address);

      // Send the updated HTML back to the client
      res.send(updatedHtml);
    });
  });
};

module.exports = {
  edit,
};
