const jwt = require('jwt-simple');

const moment = require('moment');

const secret = 'clave_secreta_betw_Art_red_social'

exports.createToken = (user)=>{
   const payload = {
       sub: user._id,
       name:user.name,
       surname:user.sername,
       role:user.role,
       img: user.img,
       iat:moment().unix(),
       exp:moment().add(30, 'days').unix
   };

   return jwt.encode(payload,secret);
}