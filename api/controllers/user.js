const bcrypt = require ('bcrypt-nodejs');

const User = require ('../models/user');

const jwt =  require ('../services/jwt');

const home = ('/', (req, res)=>{
   res.status(200).send({
       message:'Hello World en el servidor NodeJS'
   });

});


const pruebas = ('/pruebas', (req, res)=>{
   res.status(200).send({
       message:'pruebas en el servidor NodeJS'
   })
})

//Registro
const saveUser = (req, res) => {
   const params = req.body;
   const user = new User();

   if(params.name && params.surname &&
      params.nick && params.password){

       user.name = params.name;
       user.surname = params.surname;
       user.nick = params.nick;
       user.email = params.email;
       user.img = null;
//Control de usuarios duplicados
       User.find({ $or:[
           {email : user.email.toLowerCase()},
           {nick:user.nick.toLowerCase()}
       ]}).exec((err,users)=>{
           if(err) return res.status(500).send({message: 'Error en la petición de usuario'});
           if(users && users.length >= 1){
               return res.status(200).send({message: 'El usuario que intentas registrar ya existe'});
           }else{
               //Cifra contraseña y guarda datos
       bcrypt.hash(params.password, null, null,(err, hash) =>{
           user.password = hash;

           user.save((err, userStored)=>{
               if(err) return res.status(500).send({
                   message: "Error al guardar el usuario"})
              if (userStored){
                  res.status(200).send({user:userStored});
              }else{
                  res.status(404).send({message: "No se ha registrado el usuario"})
              }
           });
       });
           }
       });


   } else {
       res.status(200).send({
           message: "Envia los campos necesarios"
       });
   }

}


const loginUser = (req, res)=>{
   const params = req.body;

   const email = params.email;
   const password = params.password;

   User.findOne({email: email}, (err, user)=>{
    if(err) return res.status(500)({message: "Error en la petición"});
    if(user){
        bcrypt.compare(password, user.password, (err, check)=>{
            if(check){
               //devolver datos de usuario
               if(params.gettoken){
               //devolver token
               //genarar token
               return res.status(200).send({
                   token: jwt.createToken(user)

               });

               }else{
               user.password = undefined;
               return res.status(200).send({user})
           }
            }else{
                return res.status(400).send({message:"El usuario no se ha podido identificar "});
            }
        });
    }else{
        return res.status(404).send({message: "El usuairo no se ha podido identificar"});
    }
   });

}


module.exports = {
   home,
   pruebas,
   saveUser,
   loginUser
}