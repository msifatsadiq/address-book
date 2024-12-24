// const path = require('path');

// const db = mysql.createPool({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'sifatjoti106',
//   database: 'address_book',
//   port: 3306,
// });

// // Handler function for the root route
// const index = (req, res) => {
//   res.sendFile(path.join(__dirname, '../view', 'index.html'));
// };

// module.exports = {
//   index,
// };


const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

// Database connection pool
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'sifatjoti106',
  database: 'address_book',
  port: 3306,
});

// Handler for serving the Vue index.html with dynamic data
const index = (req, res) => {
  const query = 'SELECT * FROM addresses';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send('Internal Server Error');
    }

    const filePath = path.join(__dirname, '../view/index.html');
    
    // Read the index.html file
    fs.readFile(filePath, 'utf8', (readErr, html) => {
      if (readErr) {
        console.error('Error reading index.html:', readErr.message);
        return res.status(500).send('Internal Server Error');
      }

      // Replace placeholders in the HTML with dynamic data
      const dataTable = results
        .map(
          (row) => `
            <tr>
              <td>${row.ID}</td>
              <td>${row.name}</td>
              <td>${row.phone}</td>
              <td>${row.email}</td>
              <td>${row.address}</td>
              <td>
                  <!-- Edit link  -->
                  <a href="/edit?id=${row.ID}">
                      <button type="button" title="Edit this address" class="btn btn-outline-dark">
                          <i class="bi bi-pen" style="color:yellowgreen"> </i>
                      </button>
                  </a>

                  <!-- Delete link -->
                  <a href="/delete?id=${row.ID}">
                      <button type="button" title="Delete this address" class="btn btn-outline-dark">
                          <i class="bi bi-trash" style="color: red"> </i>
                      </button>
                  </a>
              </td>
            </tr>`
        )
        .join('');
      
      const updatedHtml = html.replace('{{dataTable}}', dataTable);
      
      res.send(updatedHtml);
    });
  });
};

module.exports = {
  index,
};