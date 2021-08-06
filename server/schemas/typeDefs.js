const { gql } = require('apollo-server-express');

const typeDefs = gql`
#Defining which fields are accessible from the Books model
type Book {
    _id: ID
    authors: [String]
    bookId: String
    image: String
    title: String
    description: String
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    books(query: String): [Book]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;