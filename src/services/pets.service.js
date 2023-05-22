import PetRepository from '../repositories/pet.repository.js'

class PetService {
  async create({ nome, idade, peso, raca, proprietarioId }){
    
    const donoEncontrado = await PetRepository.proprietarioId({ proprietarioId });
    
    if(!donoEncontrado) {
        throw new Error('ProprietarioId informado não existe!');
    }
    
    return await PetRepository.create({ nome, idade, peso, raca, proprietarioId })
  }

  async list() {
    try {
      return await PetRepository.list();
    } catch (error) {
      throw error
    }
  }

  async listById({ petId }) {
    try {
      const result = await PetRepository.listById({ petId })

      if(!result) {
        throw new Error("Pet não encontrado")
      }
      
      return { proprietario: result}
    } catch (error) {
      throw error
    }
  }

  async update({ nome, idade, peso, raca, petId }) {
    try {
      await PetRepository.listById({ petId });
      return await PetRepository.update({ nome, idade, peso, raca, petId })
    } catch (error) {
      throw error
    }  
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