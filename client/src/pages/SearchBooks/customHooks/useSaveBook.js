import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../../../graphql/mutations/saveBook';

export const useSaveBook = () => {
  const [mutationFunction, {data, loading, error}] = useMutation(SAVE_BOOK, {
    onError: (error) => {
      console.log(`Error occurred while saving a book for a user: ${error} ${error.stack}`);
    }
  });

  const saveBook = (book) => {
    mutationFunction({
      variables: {
        bookToSave: {
          authors: book.authors,
          bookId: book.bookId,
          image: book.image,
          title: book.title,
          description: book.description
        }
      }
    });
  };

  return [saveBook, {data, loading, error}];
};