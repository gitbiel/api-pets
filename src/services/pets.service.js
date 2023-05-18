import { randomUUID } from 'crypto';
import { proprietarios } from '../db/index.js';
import { pets  } from '../db/index.js';

class PetService {
  async create({ nome, proprietarioId, idade, peso, raca }){
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

  listById({petId}) {
    const petEncontrado = pets.find(pet => pet.id == petId);
  
    if(!petEncontrado) {
      return {
        isError: true,
        message: 'Pet não encontrado!'
      };
    };

    return {
      petEncontrado
    }
  }

  update({nome, idade, peso, raca, petId}) {
    const indexPet = pets.findIndex(({ id }) => id === petId);
    
    if(indexPet === -1) {
      return {
        isError: true,
        message: 'Pet não encontrado!'
      };
    };

    pets[indexPet].nome = nome;
    pets[indexPet].idade = idade;
    pets[indexPet].peso = peso;
    pets[indexPet].raca = raca;
  }

  delete({petId}) {
    const indexPet = pets.findIndex(({ id }) => id === petId);

    if(indexPet === -1) {
      return {
        isError: true,
        message: 'Pet não encontrado'
      };
    };
      
    pets.splice(indexPet, 1);
  }
}

export default new PetService()