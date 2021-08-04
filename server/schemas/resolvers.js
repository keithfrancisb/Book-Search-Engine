const { Books } = require('../models');
const fetch = require('node-fetch');

const resolvers = {
    Query: {
        books: async (parent, args, context) => {
            
            /**
             * _id -> id
             * authors -> volumeInfo.authors
             * image -> volumeInfo.imageLinks
             * title -> volumeInfo.title
             */
            const data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(args.query)}`);
            const jsonData = await data.json();

            console.log(jsonData);

            const books = jsonData.items.map((book) => {
                return {
                    _id: books.id,
                    authors: book.volumeInfo.authors,
                    bookId: book.volumeInfo.industryIdentifiers[0].identifier,
                    image: book.volumeInfo.imageLinks,
                    title: book.volumeInfo.title,
                };
            });

            return Promise.resolve(books);
        },
    },
}

/**
 * 
 */



module.exports = resolvers;