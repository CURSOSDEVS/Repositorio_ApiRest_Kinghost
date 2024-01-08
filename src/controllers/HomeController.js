import Aluno from '../models/Aluno';

class HomeController{
  async index(req,res){
    const novoAluno = await Aluno.create({
      nome:'Debora',
      sobrenome:'Alves',
      email:'debora@gmail.com',
      idade: 68,
      peso: 174,
      altura: 1.87
    });
    res.json(novoAluno);
  }
}

export default new HomeController;
