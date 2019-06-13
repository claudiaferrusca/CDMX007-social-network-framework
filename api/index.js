const mongoose = require('mongoose');
const app = require('./app');
const port = 3800;

//conexión database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost[:27017]/Betwart_DataBase',{ useNewUrlParser: true } )
.then(()=>{
   console.log("La conexión se realizó con exito")
   //crear servidor
   app.listen(port,()=>{
       console.log("Servidor corriendo http://localhost:3800")
   })
})
.catch(err =>console.log(err));