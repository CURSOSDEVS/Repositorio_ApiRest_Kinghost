import User from '../models/User';

class UserController{
  //método que cadastra um usuário na base de dados
  async store(req,res){
    try {
      const novoUser = await User.create(req.body);
      return res.json(novoUser);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err)=> err.message)
      });
    }
  }

  //método que retorna todos os registros na base de ados
  async index(req,res){
    try {
      //console.log('UserID: ', req.userId);
      //console.log('UserEmail: ', req.userEmail);
      const users = await User.findAll({attributes:['id' ,'nome','email']});
      return res.status(200).json(users);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err)=> err.message)
      });
    }
  }

  //método que irá exibir somente um usuário do banco de dados
  async show(req,res){
    try {
      const user = await User.findByPk(req.params.id);
      if(!user){
        return res.status(404).json(null);
      }else{
        const{ id, nome, email} = user;
        return res.status(200).json({id, nome, email});
      }

    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err)=> err.message)
      });
    }
  }

  async update(req,res){
    try {

      if(!req.userId){
        return res.status(400).json({
          errors: ['Id não enviado.']
        })
      }

      const user = await User.findByPk(req.userId);
      if(!user){
        return res.status(404).json({errors: ['Usuário não existe.']});
      }

      const userUpdate = await user.update(req.body);
      return res.status(200).json(user);

    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err)=> err.message)
      });
    }

  }

  async delete(req,res){
    try {
      if(!req.userId){
        return res.status(400).json({
          errors: ['Id não fornecida!!']
      })
      }

      const userDelete = await User.findByPk(req.userId);
      if(!userDelete){
        return res.status(404).json({
          errors: ['Usuário não localizado!']
        });
      } 

      if(await userDelete.destroy()){
        return res.status(200).json(userDelete);
      }

    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err)=> err.message)
      })
    }

  }

}

export default new UserController;
