import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// Components
import BookList from './components/BookList';

class App extends Component {
  render() {
    return (
      <div id="main">

      <h1>graphql-cb reading list project</h1>
      <p>Using graph-ql, mLab and react.</p>

      <BookList />

      </div>
    );
  }
}

export default App;
