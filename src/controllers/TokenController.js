import User from '../models/User';
import jwt from 'jsonwebtoken';

class TokenController{
  async store(req,res){
    const {email = '', password = ''} = req.body;

    if(!email || !password){
      return res.status(401).json({
        errors:['Necessário informar email e senha']
      });
    }

    const existUser = await User.findOne({ where: {email}});
    if(!existUser){
      return res.status(401).json({
        errors: ['Usuário não encontrado.']
      });
    }else{
      const isValid = await existUser.passwordIsValid(password);

      if(isValid){

        const { id } = existUser;
        const token = jwt.sign({ id , email}, process.env.TOKEN_SECRET,{
          expiresIn: process.env.TOKEN_EXPIRATION,
        });

        return res.status(200).json({token});
        
      }else{
        return res.status(401).json('Usuário e ou senha invalidos');
      }

    }
  }
}

export default new TokenController