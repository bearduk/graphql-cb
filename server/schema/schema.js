// this file data comes from mlab mongoose.
// see the static branch and the old static file (in this folder) for the local version

const graphql = require('graphql');
const _ = require('lodash');

// here are the Schema files that get the mongoose data
const Book = require('../models/book');
const Author = require('../models/author');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

// dummy local data now in schema.static.js and static git branch has it still working

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType, // AuthorType as stated below
            resolve(parent, args){
                // now find as only looking for one
                // return _.find(authors, {id: parent.authorId});    
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: GraphQLList(BookType), // NOTE LIST!
            resolve(parent, args){
                // console.log(parent);
                // now filter as there will mutiple
                // return _.filter(books, {authorId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'rootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}}, // id allows number or string
            resolve(parent, args) {
                // console.log(typeof(args.id)); // note that numbers are actually a string due to GraphQLID above.
                // code to get data from db / other source
                // return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                // return _.find( authors, {id: args.id});
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args){ // parent and args not used here as we want all books
                // return books; // return the lot
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args){ // parent and args not used here as we want all authors
                // return books; // return the lot
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})