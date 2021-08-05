const GoogleBooksAPI = require('./GoogleBooksAPI');
const UserDataSource = require('./Users');

const User = require('../models/User');

module.exports = () => ({
  googleBooksAPI: new GoogleBooksAPI(),
  userDataSource: new UserDataSource(User)
});