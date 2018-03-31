const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number
    // id by itself is created in mongodb/mlab
})

//create the model using authorSchema as the blueprint for each item
module.exports = mongoose.model('Author', authorSchema);