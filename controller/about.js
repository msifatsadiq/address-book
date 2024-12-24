const path = require('path');

// Handler function for the root route
const about = (req, res) => {
  res.sendFile(path.join(__dirname, '../view', 'about.html'));
};

module.exports = {
  about,
};
