import { proprietarios, pets } from '../db/index.js';
import petService from '../services/pets.service.js';

class PetController {
  create(request, response) {
    const { nome, idade, peso, raca, proprietarioId } = request.body;
    const result = petService.create({ nome, idade, peso, raca, proprietarioId });

    if(result?.isError) {
      return response.status(400).json({ message: result.message });
    }

    return response.status(201).send('Pet cadastrado com sucesso!');
  }

  list(_request, response) {
    return response.send(200, pets);
  }

  listById(request, response) {
    const { id } = request.params
    const petEncontrado = pets.find(pet => pet.id == id);
  
    if(!petEncontrado) {
      return response.status(404).json({
        message: 'Pet não encontrado!'
      });
    };
  
    response.json(petEncontrado);
  }

  updateById(request, response) {
    const { nome, idade, peso, raca } = request.body;
    
    const result = petService.update({
      nome, idade, peso, raca,
      petId: request.params.id
    })

    if(result?.isError) {
      return response.status(400).json({ message: result.message });
    }
    
    return response.json({ message: 'Pet atualizado com sucesso!'}); 
  }

  deleteById(request, response) {
    const indexPet = pets.findIndex(({ id }) => id === request.params.id);

  if(indexPet === -1) {
    return response.status(404).json({
      message: 'Pet não encontrado'
    });
  };

  pets.splice(indexPet, 1);
  return response.json({ message: 'Pet deletado com sucesso!'});
  }
}

export default new PetController();
