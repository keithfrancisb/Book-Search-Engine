import {gql} from '@apollo/client';

export const UNSAVE_BOOK = gql`
  mutation UnsaveBook($bookId: String!) {
    unsaveBook(bookId: $bookId) {
      bookCount
    }
  }
`;