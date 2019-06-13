const bcrypt = require ('bcrypt-nodejs');
const mongoosePaginate =  require ('mongoose-pagination');
const fs = require ("fs"); 
const path = require ("path")
const User = require ('../models/user');
const jwt =  require ('../services/jwt');
//Métodos de prueba
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
//Login
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
                //generar token
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
         return res.status(404).send({message: "El usuario no se ha podido identificar"});
     }
    });
}
//Conseguir datos de un usuario
const getUser = (req, res)=>{
    const userId = req.params.id;
    User.findById(userId, (err, user)=>{
        if(err)return res.status(500).send({message:'Error en la petición'});
        if(!user) return releaseEvents.status(404).send({message:'El usuario no existe'});
        return res.status(200).send({user});
    })
}
//Devolver un listado de usuarios paginados
const getUsers = (req, res)=>{
  const identity_user_id = req.user.sub;  
  if(req.params.page){
      page=req.params.page;
  }
  const itemsPerPage = 5;
  User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total)=>{
      if(err)return res.status(500).send({message:'Eror en la petición'});
      if(!users)return res.status(404).send({message:'No hay usuarios disponibles'});
      return res.status(200).send({
          users,
          total,
          pages: Math.ceil(total/itemsPerPage)
      })
  })
}
//Edición de datos de usuario
const updateUser = (req, res)=>{
const userId = req.params.id;
const update = req.body;
//Borrar la propiedad password
delete update.password;
if(userId != req.user.sub){
    return res.status(500).send({message:'No tienes permiso para actualizar los datos de usuario'});    
}
User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated)=>{
if(err) return res.status(404).send({message:'Error en la petición'});
if(!userUpdated) return res.status(404).send({message:'No se ha podido actualizar el usuario'});
return res.status(200).send({user:userUpdated});
})
}
// subir archivos de imagen/avatar de usuario
const uploadImage = (req,res)=>{
    const userId= req.params.id;
   
    if (req.files){
        const file_path = req.files.image.path;
        console.log(file_path);
        const file_split= file_path.split ('\\');
        console.log(file_split);
        const file_name = file_split[2];
        console.log(file_name);
        const ext_split = file_name.split("\.");
        const file_ext = ext_split [1];
        console.log(ext_split);
        console.log(file_ext);
        if (userId != req.user.sub){
            removeFilesOfUploadsv(res, file_path, "'No puedes actualizar la img y datos de usuario");
            
        }
        if (file_ext == "png" ||file_ext == "jpg" || file_ext == "jpeg" || file_ext == "gif" ){
        //actualizar documento de usuario logueado
        User.findByIdAndUpdate(userId, {img:file_name}, {new:true}, (err, userUpdated)=>{
            if(err) return res.status(500).send({message:'Error en la petición'});
if(!userUpdated) return res.status(404).send({message:'No se ha podido actualizar el usuario'});
return res.status(200).send({user:userUpdated});
        });
        }else{
            removeFilesOfUploads(res, file_path, "Extensión no valida");
        }        
    }else{
        return res.status(200).send({message: "no se han subido archivos o imagenes"});
    }
}
const removeFilesOfUploads =(res, file_path, message) =>{
    fs.unlink (file_path, (err)=>{
        return res.status(200).send({message: message})
    })
};

const getImageFile = (req, res) =>{
    const image_file = req.params.imageFile;
    const path_file= './uploads/users/'+image_file;
    fs.exists(path_file, (exists)=>{
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: "no existe la imagen..."})
        }
    });
};


module.exports = { 
    home,
    pruebas,
    saveUser,
    loginUser,
    getUser,
    getUsers,
    updateUser,
    uploadImage,
    getImageFile
}