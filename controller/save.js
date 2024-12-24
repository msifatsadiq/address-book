const mysql = require('mysql2');

// Database connection pool
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'sifatjoti106',
  database: 'address_book',
  port: 3306,
});

const save = (req, res) => {
  const { id, name, phone, email, address } = req.body; // Extract form data

  // Simple validation (you can add more as needed)
  if (!name || !phone || !email || !address) {
    return res.status(400).send('All fields are required.');
  }

  // If ID is present, we are updating an existing record
  if (id) {
    // Query to update the existing record
    const query = 'UPDATE addresses SET name = ?, phone = ?, email = ?, address = ? WHERE ID = ?';
    
    db.query(query, [name, phone, email, address, id], (err, result) => {
      if (err) {
        console.error('Error updating address:', err.message);
        return res.status(500).send('Error updating the address.');
      }

      // Redirect to the home page after saving the updated data
      res.redirect('/');
    });
  } else {
    // Query to insert a new record if no ID is provided
    const query = 'INSERT INTO addresses (name, phone, email, address) VALUES (?, ?, ?, ?)';
    
    db.query(query, [name, phone, email, address], (err, result) => {
      if (err) {
        console.error('Error inserting address:', err.message);
        return res.status(500).send('Error saving the address.');
      }

      // Redirect to the home page after saving the new data
      res.redirect('/');
    });
  }
};

module.exports = {
  save,
};
