const express = require('express');
const graphqlHTTP = require('express-graphql');


const app = express();

const port = 4000;
app.listen(port, () => {
    console.log("express server started on port" + port );
});