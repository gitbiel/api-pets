import { randomUUID } from 'crypto';
import { proprietarios } from '../db/index.js';
import { pets  } from '../db/index.js';

class petService {
  create({ nome, proprietarioId, idade, peso, raca }){

    const novoPet = {
      id: randomUUID(),
      nome,
      proprietarioId,
      idade,
      peso,
      raca
    };

    const donoEncontrado = proprietarios.find(({ id }) => id === proprietarioId);
    
    if(!donoEncontrado) {
      return {
        isError: true,
        message: 'O proprietario informado não existe',
      };
    }
  
    pets.push(novoPet);
  }
}


export default new petService()