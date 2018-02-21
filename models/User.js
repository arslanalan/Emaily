const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

//Create "users" collection
//It'll not override. If this collection exist do nothing.
mongoose.model('users', userSchema);
