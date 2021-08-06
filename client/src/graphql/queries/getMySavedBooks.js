import {gql} from '@apollo/client';

export const GET_MY_BOOKS = gql`
  query GetMyBooks {
    me {
      savedBooks {
        bookId
        authors
        image
        title
        description
      }
    }
  }
`;