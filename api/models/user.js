const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
   name:String,
   surname:String,
   nick: String,
   profession: String,
   hobbies: String,
   description: String,
   img:String,
   email:String,
   password:String,
   bankAccount:String

});

module.exports = mongoose.model('User', UserSchema);