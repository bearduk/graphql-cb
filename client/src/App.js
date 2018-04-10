import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

// Components
import BookList from './components/BookList';

// apollo cleint setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (

  <ApolloProvider client={client}>

      <div id="main">
        <h1>graphql-cb reading list project</h1>
        <p>Using graph-ql, mLab and react.</p>
        <BookList />
      </div>
    
  </ApolloProvider>
  
  );
  }
}

export default App;
