const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
    // id by itself is created in mongodb/mlab
})

//create the model using bookSchema as the blueprint for each item
module.exports = mongoose.model('Book', bookSchema);