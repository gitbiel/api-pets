import { Router } from "express";

import ProprietarioController from '../controllers/proprietario.controller.js';

const routes = Router();

routes.get('/', ProprietarioController.list);
routes.post('/', ProprietarioController.create);
routes.get('/:id', ProprietarioController.listById);

export { routes as proprietarioRoutes };