const path = require('path');

// Handler function for the root route
const add = (req, res) => {
  res.sendFile(path.join(__dirname, '../view', 'add.html'));
};

module.exports = {
  add,
};