import React, { useState } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const SearchBooks = ({myBooks}) => {
  // create state for string to use for search query
  const [bookToSearch, setBookToSearch] = useState('');

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Books!</h1>
          <SearchBar setBookToSearch={setBookToSearch} />
        </Container>
      </Jumbotron>

      <SearchResults bookToSearch={bookToSearch} myBooks={myBooks} />
    </>
  );
};

export default SearchBooks;
