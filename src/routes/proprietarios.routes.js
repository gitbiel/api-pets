import { Router } from "express";

import ProprietarioController from '../controllers/proprietario.controller.js';

const routes = Router();

routes.post('/', ProprietarioController.create);
routes.get('/', ProprietarioController.list);
routes.get('/:id', ProprietarioController.listById);
routes.get('/:id/pets', ProprietarioController.listPetsProprietario);
routes.put('/:id', ProprietarioController.updateById)
routes.delete('/:id', ProprietarioController.deleteById);


export { routes as proprietarioRoutes };

