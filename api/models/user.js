const mongoose = require('mongoose');
//Mogoose crear esquema de datos y enviarlo a servidor
const Schema = mongoose.Schema;
//Schema datos sincronos que envia a base de datos
const UserSchema = Schema({
   name:String,
   surname:String,
   nick: String,
   profession: String,
   hobbies: String,
   description: String,
   image:String,
   email:String,
   password:String,
   bankAccount:String
});
//const User = mongoose.model("User", userSchema, "users" )
//1.
//2.Schema
//3.nombre del schema
module.exports = mongoose.model('User', UserSchema);

