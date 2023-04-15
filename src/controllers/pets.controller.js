import { randomUUID } from 'crypto';

import { proprietarios, pets } from '../db/index.js';

class PetController {
  create(request, response) {

    const { nome, idade, peso, raca, proprietarioId } = request.body;
  
    if(!nome || !idade || !peso || !raca || !proprietarioId){
      return response.status(404).json({
        message: 'Necessário cadastrar todos os dados: nome, idade, peso, raca, roprietarioId',
      });
    }
  
    // Para cadastrar um Pet
    // ele tem que ser uma posse
    // de um proprietario existente
    const donoEncontrado = proprietarios.find(({ id }) => id === proprietarioId);
  
    if(!donoEncontrado) {
      return response.status(404).json({
        message: 'O proprietario informado não existe',
      });
    }
    
    const novoPet = {
      id: randomUUID(),
      nome,
      proprietarioId,
      idade,
      peso,
      raca
    };
  
    pets.push(novoPet);
    return response.status(201).send('Pet cadastrado com sucesso!');

  }

  list(_request, response) {
    return response.send(200, pets);
  }
}

export default new PetController();
