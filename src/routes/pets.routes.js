import { Router } from "express";

import PetController from '../controllers/pets.controller.js'

const routes = Router();

routes.post('/', PetController.create)
routes.get('/', PetController.list)

export { routes as petRoutes };