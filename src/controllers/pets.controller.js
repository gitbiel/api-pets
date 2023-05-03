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
    const indexPet = pets.findIndex(({ id }) => id === request.params.id);
    const { nome, idade, peso, raca } = request.body;

    if(indexPet === -1) {
      return response.status(404).json({
        message: 'Pet não encontrado!'
      });
    };


    if(!nome || !idade ||!peso || !raca) {
      return response.status(404).json({
        message: 'Necessário enviar os dados: nome, idade, peso e raca',
      });
    };

    if(typeof idade !== 'number') {
      return response.status(404).send('idade precisa ser número');
    };

    if(typeof peso !== 'number') {
      return response.status(404).send('raca precisa ser número');
    };

    pets[indexPet].nome = nome;
    pets[indexPet].idade = idade;
    pets[indexPet].peso = peso;
    pets[indexPet].raca = raca;
    
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
