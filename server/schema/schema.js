const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

// dummy data
var books = [
    {name: 'name of the wind', genre: "Fantasy", id: '1', authorId: "1"},
    {name: 'The Final Empire', genre: "Sci-Fi", id: '2', authorId: "2"},
    {name: 'The Long Earth', genre: "Fantasy", id: '3', authorId: "3"},
    {name: 'the jolly potter', genre: "Fantasy", id: '4', authorId: "2"},
    {name: 'wu li masters', genre: "Sci-Fi", id: '5', authorId: "3"},
    {name: 'art of motorcycle maintenance', genre: "Fantasy", id: '6', authorId: "3"}    
];

var authors = [
    {name: 'Patrick Rothfuss', age: 44, id: '1'},
    {name: 'George Lucas', age: 44, id: '2'},
    {name: 'Terry Pratchett', age: 44, id: '3'}

];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType, // AuthorType as stated below
            resolve(parent, args){
                console.log(parent);
                // now find as only looking for one
                return _.find(authors, {id: parent.authorId});    
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
                console.log(parent);
                // now filter as there will mutiple
                return _.filter(books, {authorId: parent.id});
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
                console.log(typeof(args.id)); // note that numbers are actually a string due to GraphQLID above.
                // code to get data from db / other source
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find( authors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})