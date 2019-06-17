//librerías
const path = require ('path');
const fs = require ('fs');
const moment= require ('moment');
const mongoosePaginate= require ('mongoose-pagination');

//Modelos
const Publication = require ('../models/publication');
const User = require ('../models/user');
const Follow = require ('../models/follow');


const probando = (req, res)=>{
   res.status(200).send({message:'Hola desde controlador publication'})
}


const savePublication = (req, res)=>{

    const params = req.body;
    if(!params.text) return res.status(200).send({message:'Debes enviar un texto'});

    let publication = new Publication();
    publication.text = params.text;
    publication.file = 'null';
    publication.user = req.user.sub;
    publication.created_at = moment().unix();

    publication.save((err, publicationStored)=>{
        if(err) return res.status(500).send({message:'Error al guardar la publicación' });
        if(!publicationStored) return res.status(404).send({message:'La publicación no ha sido guardada'});

        return res.status(200).send({publication: publicationStored});
    })
}


const getPublications = (req, res)=>{
    let page = 1;

    if(req.params.page){
        page = req.params.page;
    }

    let itemsPerPage = 4;

    Follow.find({user: req.user.sub }).populate('followed').exec((err, follows)=>{
        if(err) return req.status(500).send({message:'Error devolver el seguimiento'});

        const follows_clean = []

        follows.forEach((follow)=>{
            follows_clean.push(follow.followed);

        });

        Publication.find({user:{ "$in" : follows_clean}}).sort('-created_at').populate('user').paginate(page, itemsPerPage, (err, publications, total)=>{
          
            if(err) return res.status(500).send({message:'Error al devolder publicaciones'});
            if(!publications) return res.status(404).send({message:'No hay publicaciones'});

            return res.status(200).send({
                total_items : total,
                pages:Math.ceil(total/itemsPerPage),
                page:page,
                publications
            })

         
        });
    });

}
   const getPublication = (req, res )=>{

    const publicationId = req.params.id;

    Publication.findById(publicationId, (err, publication) =>{
    if(err) return res.status(500).send({message:'Error al devolder publicaciones' });
    if(!publication) return res.status(404).send({message:'No existe la publicación' });

    return res.status(200).send({publication});


    });

   }

   //Error en los parametros
   const deletePublication = (req, res) =>{
       const publicationId = req.params.id;

       Publication.find({'user': req.user.sub,'_id':publicationId}).remove((err)=>{
           if(err) return res.status(500).send({message: 'Error al borrar publicación'});

           if(publicationId) return res.status(404).send({ message: 'No se ha borrado la publicación'});

           return res.status(200).send({message:'Publicación eliminada correctamente'});
       })
   }
    


  
   const uploadImage = (req,res)=>{
    const publicationId= req.params.id;
   
    if (req.files){
        const file_path = req.files.image.path;
        const file_split= file_path.split ('\\');
        const file_name = file_split[2];
        const ext_split = file_name.split("\.");
        const file_ext = ext_split [1];
       
       
        if (file_ext == "png" ||file_ext == "jpg" || file_ext == "jpeg" || file_ext == "gif" ){

        Publication.findOne({'user': req.user.sub,'_id':publicationId}).exec((err, publication)=>{
        if(publication){
            console.log(publication)
           //actualizar documento de la publicación
        Publication.findByIdAndUpdate(publicationId, {file:file_name}, {new:true}, (err, publicationUpdated)=>{
            if(err) return res.status(500).send({message:'Error en la petición'});
            if(!publicationUpdated) return res.status(404).send({message:'No se ha podido actualizar el usuario'});
             return res.status(200).send({publication:publicationUpdated});
               });
             } else{
                return removeFilesOfUploads(res, file_path, "No tienes permiso para actualizar esta publicación");
             }
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
    const path_file= './uploads/publications/'+image_file;
    fs.exists(path_file, (exists)=>{
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: "no existe la imagen..."})
        }
    });
};


module.exports={
    probando,
    savePublication,
    getPublications,
    getPublication,
    deletePublication,
    uploadImage,
    getImageFile
}