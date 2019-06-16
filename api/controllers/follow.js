
const moongosePaginate= require('mongoose-pagination');

const User= require('../models/user');
const Follow= require('../models/follow');

const saveFollow = (req, res)=>{
    const params = req.body;
    let follow = new Follow();
    follow.user = req.user.sub;
     
    follow.followed = params.followed;

    follow.save((err, followStored) => {
        if(err)return res.status(500).send({message:'Error al guardar el seguimiento'});
        if(!followStored) return res.status(404).send({message:'El seguimiento no se ha guardado'});

        return res.status(200).send({follow:followStored});
    });
        
    }


const deleteFollow = (req, res)=>{

    const userId = req.user.sub;
    const followId = req.params.id;

    Follow.find({'user':userId, 'followed':followId}).deleteOne(err =>{
        if(err) return res.status(500).send({message:'Error al dejar de seguir'});

        return res.status(200).send({message:'El follow se ha eliminado'})
    });
}


module.exports = {
    saveFollow,
    deleteFollow
}