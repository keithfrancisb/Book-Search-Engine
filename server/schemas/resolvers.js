const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

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
                    description: book.volumeInfo.description
                };
            });
        },
        me: async (_, args, context) => {
            if (context.user) {
                const user = await User.findOne(context.user);
    
                return user;
            } else {
                throw new AuthenticationError('User is not logged in!');
            }
        }
    },
    Mutation: {
        addUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {user, token};
        },
        loginUser: async (_, {email, password}) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError(`Invalid email/password.`);
            }

            const hasCorrectPassword = await user.isCorrectPassword(password);

            if (!hasCorrectPassword) {
                throw new AuthenticationError('Invalid email/password.');
            }

            const token = signToken(user);
            return {token, user};
        }
    }
}

module.exports = resolvers;