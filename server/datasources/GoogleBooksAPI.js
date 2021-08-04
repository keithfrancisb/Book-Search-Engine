const {RESTDataSource} = require('apollo-datasource-rest');

class GoogleBooksAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'https://www.googleapis.com/';
  }

  async getBooks(query) {
    return this.get(`/books/v1/volumes?q=${encodeURIComponent(query)}`);
  }
}

module.exports = GoogleBooksAPI;