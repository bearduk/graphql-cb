import React, { Component } from 'react';
// import {gql} from 'apollo-boost'; not needed here now as it imported queries
import {graphql, compose} from 'react-apollo';

import {getAuthorsQuery, addBookMutation} from '../queries/queries';


class AddBook extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        };
    }

    displayAuthors(){
        // var data = this.props.data
        var data = this.props.getAuthorsQuery;
        // console.log(this.props);
        if (data.loading){ //if data loading is still true
            return (<option disabled>Loading authors...</option>);
        } else {
            return data.authors.map(author => {
                return ( <option key={author.id} value={author.id}> {author.name} </option>)
            })
        }
    }

    submitForm(e){
        e.preventDefault();
        // console.log(this.state);
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            }
        })
    }

    render() {
    //   console.log(this.props);
    return (
        <form id="add-book" onSubmit={this.submitForm.bind(this)}>

            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={ (e) => this.setState({name: e.target.value})} />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={ (e) => this.setState({genre: e.target.value})} />
            </div>

            <div className="field">
                <label>Author:</label>
                <select onChange={ (e) => this.setState({authorId: e.target.value})}>
                    {this.displayAuthors()}
                </select>
            </div>

            <button>+</button>

        </form>
    );
  }
}

// export default graphql(getAuthorsQuery)(AddBook);
// now using compose which is imported above

// compose let's you add more than one mutation, query etc
export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);