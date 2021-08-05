import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../graphql/queries/getBooks';
import { saveBook } from '../../utils/API';
import { Container, Button, Card, CardColumns } from 'react-bootstrap';
import { saveBookIds, getSavedBookIds } from '../../utils/localStorage';
import Auth from '../../utils/auth';

export default function SearchResults({
  bookToSearch
}) {
  const {data} = useQuery(GET_BOOKS, {
    variables: { query: bookToSearch }
  });

  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = data.books.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveBook(bookToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  return (
    <Container>
      <h2>
        {data?.books.length
          ? `Viewing ${data.books.length} results:`
          : 'Search for a book to begin'}
      </h2>
      <CardColumns>
        {data?.books.map((book) => {
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
    </Container>
  )
}