import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken';

export const generarJWT = (id:string = '') => {
   return new Promise((resolve,reject)=>{
       const payload = { id };
    //    SECRET_OR_PRIVATE_KEY
       jwt.sign(payload,process.env.SECRET_OR_PRIVATE_KEY as string,{
         expiresIn: '10d'
       },(err,token)=>{
          if(err){
            console.log(err);
            reject('No se pudo generar el token');  
          }else{
            resolve(token);  
          } 
       })
   })
}

