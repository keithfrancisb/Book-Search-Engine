import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../graphql/queries/getBooks';
import { Container, Button, Card, CardColumns, Toast } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { useSaveBook } from './customHooks/useSaveBook';

export default function SearchResults({
  bookToSearch,
  myBooks
}) {
  const {data: bookSearchData} = useQuery(GET_BOOKS, {
    variables: { query: bookToSearch }
  });

  // create state to hold saved bookId values
  const [showToast, setShowToast] = useState(false);

  const [saveBook, { error: saveBookError}] = useSaveBook();
  
  // create and memoize bookIds. used for setting state of each button
  const myBookIds = useMemo(() => myBooks.map((book) => book.bookId), [myBooks]);

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = bookSearchData.books.find((book) => book.bookId === bookId);

    saveBook(bookToSave);
  };

  useEffect(() => {
    if (saveBookError) {
      setShowToast(true);
    }
  }, [saveBookError]);


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
                    disabled={myBookIds.some((savedBookId) => savedBookId === book.bookId)}
                    className='btn-block btn-info'
                    onClick={() => handleSaveBook(book.bookId)}>
                    {myBookIds.some((savedBookId) => savedBookId === book.bookId)
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