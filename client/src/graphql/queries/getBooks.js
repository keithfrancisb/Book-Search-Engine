import {gql} from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks($query: String) {
    books(query: $query) {
      bookId
      authors
      image
      title
    }
  }
`;