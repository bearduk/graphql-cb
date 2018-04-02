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
                return Author.findById(parent.authorId);
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
                return Book.find( {authorId: parent.id});                
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
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                // return _.find( authors, {id: args.id});
                return Author.findById(args.id);
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args){ // parent and args not used here as we want all books
                // return books; // return the lot
            return Book.find({}); // empty query returns everything as they all match
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args){ // parent and args not used here as we want all authors
                // return books; // return the lot
            return Author.find({}); // empty query returns everything as they all match                
            }
        }
    }
});

// create an object that will mutate data
// give it a name, fields to action and supply the resolve with the schema we set up in the models (and imported at the top of this file).

const Mutation = new GraphQLObjectType ({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: { 
                name: {type: GraphQLString},
                age: { type: GraphQLInt}
            },
            resolve( parent , args ){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                // we could just use author.save, but returning it means that we get instant return to the client of the data
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve( parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})