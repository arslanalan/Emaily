const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

//Create "users" collection
//It'll not override. If this collection exist do nothing.
mongoose.model('users', userSchema);
