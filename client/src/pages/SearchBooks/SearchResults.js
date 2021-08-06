import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../graphql/queries/getBooks';
import { Container, Button, Card, CardColumns, Toast } from 'react-bootstrap';
import { saveBookIds, getSavedBookIds } from '../../utils/localStorage';
import Auth from '../../utils/auth';
import { useSaveBook } from './customHooks/useSaveBook';

export default function SearchResults({
  bookToSearch
}) {
  const {data: bookSearchData} = useQuery(GET_BOOKS, {
    variables: { query: bookToSearch }
  });

  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  const [showToast, setShowToast] = useState(false);

  const [saveBook, {data: saveBookData, error: saveBookError}] = useSaveBook();

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = bookSearchData.books.find((book) => book.bookId === bookId);

    saveBook(bookToSave);

    if (saveBookData) {
      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    }
  };

  useEffect(() => {
    if (saveBookError) {
      setShowToast(true);
    }
    
    // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
    // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    return () => saveBookIds(savedBookIds);
  }, [saveBookError, savedBookIds]);

  return (
    <Container>
      <h2>
        {bookSearchData?.books.length
          ? `Viewing ${bookSearchData.books.length} results:`
          : 'Search for a book to begin'}
      </h2>
      <CardColumns>
        {bookSearchData?.books.map((book) => {
          return (
            <Card key={book.bookId} border='dark'>
              {book.image ? (
                <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
              ) : null}
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <p className='small'>Authors: {book.authors}</p>
                <Card.Text>{book.description}</Card.Text>
                {Auth.loggedIn() && (
                  <Button
                    disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                    className='btn-block btn-info'
                    onClick={() => handleSaveBook(book.bookId)}>
                    {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                      ? 'This book has already been saved!'
                      : 'Save this Book!'}
                  </Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </CardColumns>
      <Toast onClose={() => setShowToast(false)} show={showToast}>
        <Toast.Header>
          <strong>Oh no!</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          Failed to save the book. Please try again later.
        </Toast.Body>
      </Toast>
    </Container>
  )
}