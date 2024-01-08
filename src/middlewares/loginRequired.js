import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async(req,res, next)=>{
  const { authorization }= req.headers;

  if(!authorization){
    return res.status(401).json({
      errors: ['Login required']
    });
  }
   const [, token] = authorization.split(' ');

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    const { id, email} = payload;

    const userBd = await User.findONe({
      where:{
        id,
        email
      }
    })

    console.log("user.email:",userBd.email);
    console.log("email:",email);

    if(!userBd){
      return res.status(401).json({
        errors: ['Usuário inválido!']
      })
    }

    req.userId = id;
    req.userEmail = email;

    return next();

  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido']
    });
  }

}