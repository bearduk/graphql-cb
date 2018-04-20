import React, { Component } from 'react';
// import {gql} from 'apollo-boost'; not needed here now as it imported queries
import {graphql} from 'react-apollo';

import {getBooksQuery} from '../queries/queries';

// components
import BookDetails from './BookDetails';

class BookList extends Component {
  
    displayBooks(){
        var data = this.props.data;
        if (data.loading ){ // if loading is still set to true
            return ( <div>Loading books...</div>);
        } else {
            return data.books.map(book => {
                return (
                    <li key={book.id}>{ book.name }</li>
                )
            })
        }
    }
    
    render() {
      console.log(this.props);
    return (
        <div>
            <ul id="Book-list">
                {this.displayBooks()}
            </ul>
            <BookDetails />
        </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
