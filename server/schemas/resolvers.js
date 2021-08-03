const { Books } = require('../models');


const resolvers = {
    Query: {
        books: async () => {
            return await [{
                _id: 'ID',
                authors: 'String',
                bookId: 'String',
                image: 'String',
                title: 'String',
            }]
        }
    }
}

module.exports = resolvers;