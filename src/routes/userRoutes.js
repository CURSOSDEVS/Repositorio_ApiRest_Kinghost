import { Router } from "express";
import UserController from '../controllers/UserController';
import loginRequired  from "../middlewares/loginRequired";

const router = new Router();

//Nao deveriam existir
router.get('/', UserController.index);
router.get('/:id', UserController.show);

router.post('/', UserController.store);
router.put('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.delete);

export default router;

/**
 * podemos ter em cada controller até cinco métodos
 * - Linstando todos os usuário : index (no insomnia utiliza o método GET)
 * - Cria um novo usuário: store ou create (no insomnia utiliza o método POST)
 * - Apaga um usuário: delete (no insomnia utiliza o método DELETE)
 * - Mostra um usuário: show (no insomnia utiliza o método GET)
 * - Atualiza um usuário: update. (no insomnia utiliza o método PATCH OU PUT)
 *
 * Se o controller tiver mais métodos isso tá errado.
 */