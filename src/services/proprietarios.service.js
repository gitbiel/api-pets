import { randomUUID } from 'crypto';
import { proprietarios, pets } from '../db/index.js';

class proprietarioService {
  create({ nome, cpf, telefone }) {

    const novoProprietario = { 
      id: randomUUID(),
      nome,
      cpf,
      telefone
    };

    const proprietarioEncontrado = proprietarios.find((proprietario) => (
      proprietario.cpf == novoProprietario.cpf
      || proprietario.telefone == novoProprietario.telefone)
    );

    if(proprietarioEncontrado) {
      return {
        isError: true,
        message: 'Usuário já existe! cpf ou telefone já estão cadastrados',
      };
    }
   
    proprietarios.push(novoProprietario);
  }

  update({nome, telefone, proprietarioId}) {
    const indexProprietario = proprietarios.findIndex(({ id }) => id === proprietarioId);
    
    if(indexProprietario === -1) {
      return {
        isError: true,
        message: 'Proprietario não encontrado!'
      };
    };

    proprietarios[indexProprietario].nome = nome;
    proprietarios[indexProprietario].telefone = telefone;
  }

  delete({proprietarioId}) {
    const indexProprietario = proprietarios.findIndex(({ id }) => id === proprietarioId);

    if(indexProprietario === -1) {
      return {
        isError: true,
        message: 'Proprietário não encontrado'
      };
    };

    const petsDoProprietario = pets.filter(pet => pet.proprietarioId === proprietarioId);
    if(petsDoProprietario.length > 0) {
      return {
        isError: true,
        message: 'Proprietário possui pets, remova os pets antes de deletar proprietário!'
      };
    };

    proprietarios.splice(indexProprietario, 1);
  }
}

export default new proprietarioService()
