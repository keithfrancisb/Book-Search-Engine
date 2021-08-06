import {gql} from '@apollo/client';

export const SAVE_BOOK = gql`
  mutation SaveBook($bookToSave: BookToSave!) {
    saveBook(book: $bookToSave) {
      username
      bookCount
    }
  }
`;