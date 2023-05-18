import ProprietarioRepository from '../repositories/proprietario.repository.js'

class ProprietarioService {
  async create({ nome, cpf, telefone }) {
    const proprietarioEncontrado = await ProprietarioRepository.listByProprietario({ cpf })

    if(proprietarioEncontrado) {
      throw new Error('Proprietário já existe, cpf já cadastrado!');
    }

    return await ProprietarioRepository.create({ nome, cpf, telefone })
  }

  async list() {
    try {
      return await ProprietarioRepository.list();
    } catch (error) {
      throw error
    }
  }

  async listById({ proprietarioId }) {
    try {
      const result = await ProprietarioRepository.listById({
         id: proprietarioId 
      });

      return { proprietario: result}
    } catch (error) {
      throw error
    }
  }

  listPetsProprietario({proprietarioId}) {
    const proprietarioEncontrado = proprietarios.find((proprietario) => proprietario.id === proprietarioId);
  
    if(!proprietarioEncontrado) {
      return {
        isError: true,
        message: 'Proprietario não encontrado!'
      };
    };
  
    const petsDoProprietario = pets.filter(pet => pet.proprietarioId === proprietarioId);
    if(petsDoProprietario.length === 0) {
      return {
        isError: true,
        message: 'Proprietário não possui pets!'
      };
    };

    return {
      proprietario: proprietarioEncontrado.nome,
      pets: petsDoProprietario
    };
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

export default new ProprietarioService()
