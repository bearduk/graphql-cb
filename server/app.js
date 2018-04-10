const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross orgin requests
app.use(cors());

// connect to mlab database

mongoose.connect("mongodb://chris:chrisgraphql@ds129939.mlab.com:29939/graphql-cb");
mongoose.connection.once("open", () => {
    console.log("connected to database");
});

// mongo schema - for mongoose, not for graphql


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