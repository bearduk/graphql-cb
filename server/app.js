const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true // gives the gui at
    // http://localhost:4000/graphql
    // example look up
    // {
	// book(id: "1"){
    //     name
    //     genre
    //     id
    //   }
    // }
}));

const port = 4000;
app.listen(port, () => {
    console.log("express server started on port" + port );
});