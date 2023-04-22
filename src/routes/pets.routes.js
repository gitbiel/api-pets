import { Router } from "express";
import petsController from "../controllers/pets.controller.js";

import PetController from '../controllers/pets.controller.js'

const routes = Router();

routes.post('/', PetController.create)
routes.get('/', PetController.list)
routes.get('/:id', PetController.listById)
routes.put('/:id', petsController.updateById)
routes.delete('/:id', PetController.deleteById)

export { routes as petRoutes };