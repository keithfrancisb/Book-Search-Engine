import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { GET_MY_BOOKS } from './graphql/queries/getMySavedBooks';
import { useQuery } from '@apollo/client';

function App() {
  const {data} = useQuery(GET_MY_BOOKS);

  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' render={() => <SearchBooks myBooks={data?.me.savedBooks || []} />} />
          <Route exact path='/saved' render={() => <SavedBooks myBooks={data?.me.savedBooks || []} />} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
