const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'sifatjoti106',
  database: 'address_book',
  port: 3306,
});

// Define a route to serve the HTML page
app.get('/', (req, res) => {
  const query = 'SELECT * FROM addresses';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send('Internal Server Error');
    }

    // Render the HTML page
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Address Book</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-rbsA2VBKQF16CJnzr+e6/Q4pr62d9e17QAM/nGs/r26FI/XT/l1Y51iFHBsvypIH"
          crossorigin="anonymous"
        >
        <style>
          body {
            background: linear-gradient(to bottom right, #74ebd5, #9face6);
            font-family: 'Arial', sans-serif;
          }
          .container {
            background: #ffffff;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
            border-radius: 15px;
            padding: 30px;
            margin-top: 50px;
          }
          .table thead {
            background: #6c757d;
            color: #ffffff;
          }
          .table tbody tr:hover {
            background: rgba(108, 117, 125, 0.1);
          }
          h1 {
            font-size: 2.5rem;
            color: #495057;
            text-shadow: 2px 2px #ffffff;
            margin-bottom: 30px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="text-center">Address Book</h1>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              ${results
                .map(
                  (row) => `
                <tr>
                  <td>${row.ID}</td>
                  <td>${row.name}</td>
                  <td>${row.phone}</td>
                  <td>${row.email}</td>
                  <td>${row.address}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `;

    res.send(html);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
