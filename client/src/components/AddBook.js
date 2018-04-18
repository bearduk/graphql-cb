import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`



class AddBook extends Component {
    
    displayAuthors(){
        var data = this.props.data
        if (data.loading){ //if data loading is still true
            return (<option disabled>Loading authors...</option>);
        } else {
            return data.authors.map(author => {
                return ( <option key={author.id} value={author.id}> {author.name} </option>)
            })
        }
    }

    render() {
      console.log(this.props);
    return (
        <form id="add-book">

            <div className="field">
                <label>Book name:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Author:</label>
                <select>
                    {this.displayAuthors()}
                </select>
            </div>

            <button>+</button>

        </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
