const GoogleBooksAPI = require('./GoogleBooksAPI');

module.exports = () => ({
  googleBooksAPI: new GoogleBooksAPI(),
});