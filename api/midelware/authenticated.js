const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_betw_Art_red_social';

exports.ensureAuth = (req, res, next)=>{
if(!req.headers.authorization){
   return res.status(403).send({message:'La peticion no tienela cabecera de autenticación'});
}

const token = req.headers.authorization.replace(/['"]+/g,'');
try{
  const payload = jwt.decode(token, secret);
   if(payload.exp <= moment().unix()){
       return res.status(401).send({
           message: 'El token ha expirado'
       });
   }
}catch (ex){
 return res.status(404).send({
     message:'El token no es válido'
 });
}
//adjuntar el payload a req
req.user = jwt.decode(token, secret);
next();

}