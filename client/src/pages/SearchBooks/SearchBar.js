import React, { useState } from 'react';
import { Col, Form, Button } from 'react-bootstrap';

export default function SearchBar({
  setBookToSearch
}) {
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setBookToSearch(searchInput);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Row>
        <Col xs={12} md={8}>
          <Form.Control
            name='searchInput'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type='text'
            size='lg'
            placeholder='Search for a book'
          />
        </Col>
        <Col xs={12} md={4}>
          <Button type='submit' variant='success' size='lg'>
            Submit Search
          </Button>
        </Col>
      </Form.Row>
    </Form>
  )
}