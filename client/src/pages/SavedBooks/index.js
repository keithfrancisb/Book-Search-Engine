import React, { useEffect, useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button, Toast } from 'react-bootstrap';

import { useUnsaveBook } from './customHooks/useUnsaveBook';

const SavedBooks = ({myBooks}) => {
  const [unsaveBook, {error}] = useUnsaveBook(); 
  const [showToast, setShowToast] = useState(false);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = (bookId) => {
    unsaveBook(bookId);
  };

  useEffect(() => {
    if (error) {
      setShowToast(true);
    }
  })

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {myBooks.length
            ? `Viewing ${myBooks.length} saved ${myBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {myBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
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
          Failed to remove the book. Please try again later.
        </Toast.Body>
      </Toast>
      </Container>
    </>
  );
};

export default SavedBooks;
