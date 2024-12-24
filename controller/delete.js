const mysql = require('mysql2');
const path = require('path');

// Database connection pool
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'sifatjoti106',
  database: 'address_book',
  port: 3306,
});

// Handler function for deleting an address
const deleteAddress = (req, res) => {
  const { id } = req.query; // Get the id from the query string
  
  if (!id) {
    return res.status(400).send('ID is required to delete the address.');
  }

  // Query to delete the address by ID
  const query = 'DELETE FROM addresses WHERE ID = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting address:', err.message);
      return res.status(500).send('Error deleting the address.');
    }

    // Redirect to the home page after deletion
    res.redirect('/');
  });
};

module.exports = {
  deleteAddress
};
