import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`


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
        </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);