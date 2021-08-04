const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    books(query: String): [Books]
}

#Defining which fields are accessible from the Books model
type Books {
    _id: ID
    authors: [String]
    bookId: String
    image: String
    title: String
}
`;

module.exports = typeDefs;