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
    },
}

module.exports = resolvers;