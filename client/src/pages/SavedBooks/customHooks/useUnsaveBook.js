import { useMutation } from '@apollo/client';
import { UNSAVE_BOOK } from '../../../graphql/mutations/unsaveBook';
import { GET_MY_BOOKS } from '../../../graphql/queries/getMySavedBooks';

export const useUnsaveBook = () => {
  const [mutationFunction, {data, loading, error}] = useMutation(UNSAVE_BOOK, {
    onError: (error) => {
      console.log(`Error occurred while saving a book for a user: ${error} ${error.stack}`);
    },
    refetchQueries: [
      GET_MY_BOOKS,
      'GetMyBooks'
    ]
  });

  const unsaveBook = (bookId) => {
    mutationFunction({
      variables: {
        bookId
      }
    });
  };

  return [unsaveBook, {data, loading, error}];
};