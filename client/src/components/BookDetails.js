import React, { Component } from 'react';
import {graphql} from 'react-apollo';

import {getBookQuery} from '../queries/queries';

class BookDetails extends Component {
  
    
    render() {
      console.log(this.props);
    return (
        <div id="book-details">
            <p>Output book details here.</p>
        </div>
    );
  }
}
// bind getBookQuery query to this component
export default graphql(getBookQuery)(BookDetails);
