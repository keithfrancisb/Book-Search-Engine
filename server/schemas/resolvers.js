const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
        books: async (_, {query}, {dataSources: {googleBooksAPI}}) => {
            const {items: books} = await googleBooksAPI.getBooks(query);

            return books.map((book) => {
                return {
                    _id: book.id,
                    authors: book.volumeInfo.authors,
                    bookId: book.volumeInfo.industryIdentifiers[0].identifier,
                    image: book.volumeInfo.imageLinks.thumbnail,
                    title: book.volumeInfo.title,
                };
            });
        },
        me: async (_, args, {userDataSource, user}) => {
            if (user) {
                const userData = await userDataSource.getUser(user);

                return userData;
            }

            throw new AuthenticationError('User not logged in');
        }
    },
}

module.exports = resolvers;