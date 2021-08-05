const {MongoDataSource} = require('apollo-datasource-mongodb');

class UsersDataSource extends MongoDataSource {
  getUser = async (user) => {
    return await this.findByFields(user);
  };

  addUser = async (user) => {
    return await this.create(user);
  };
}

module.exports = UsersDataSource;