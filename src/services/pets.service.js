import PetRepository from '../repositories/pet.repository.js'

class PetService {
  async create({ nome, idade, peso, raca, proprietarioId }){
    try {
      const donoEncontrado = await PetRepository.proprietarioId({ proprietarioId });
    
    if(!donoEncontrado) {
        throw new Error('ProprietarioId informado não existe!');
    }
    
    return await PetRepository.create({ nome, idade, peso, raca, proprietarioId })
    } catch (error) {
      throw error
    }
    
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
      const petExist = await PetRepository.listById({ petId })

      if(!petExist) {
        throw new Error("Pet não encontrado")
      }
      
      return { Pet: petExist}
    } catch (error) {
      throw error
    }
  }

  async update({ nome, idade, peso, raca, petId }) {
    try {
      const petExist =  await PetRepository.listById({ petId });

      if(!petExist) {
        throw new Error("Pet não encontrado")
      }

      return await PetRepository.update({ nome, idade, peso, raca, petId })
    } catch (error) {
      throw error
    }  
  }

  async delete({ petId }) {
    try {
      const petExist = await PetRepository.listById({ petId })

      if(!petExist) {
        throw new Error("Pet não encontrado")
      }

      return await PetRepository.delete({ petId })
    } catch (error) {
      throw error
    }
  }
}

export default new PetService()