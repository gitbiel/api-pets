import ProprietarioRepository from '../repositories/proprietario.repository.js'

class ProprietarioService {
  async create({ nome, cpf, telefone }) {
    try {
      const proprietarioJaCadastrado = await ProprietarioRepository.listByProprietario({ cpf })

    if(proprietarioJaCadastrado) {
      throw new Error('Proprietário já existe, cpf já cadastrado!');
    }

    return await ProprietarioRepository.create({ nome, cpf, telefone })
    } catch (error) {
      throw error
    }
    
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
      const ownerExist = await ProprietarioRepository.listById({ proprietarioId });

      if(!ownerExist) {
        throw new Error('Proprietario não encontrado')
      } 

      return { Proprietario:  ownerExist}
    } catch (error) {
      throw error
    }
  }

  async listPetsProprietario({ proprietarioId }) {
    try {
      const ownerExist = await ProprietarioRepository.listById({ proprietarioId });

      if(!ownerExist) {
        throw new Error('Proprietario não encontrado')
      } 

      return await ProprietarioRepository.listPetsProprietario({ proprietarioId })

    } catch (error) {
      throw error
    }
  }

  async update({ nome, telefone, proprietarioId }) {
    try {
      const ownerExist = await ProprietarioRepository.listById({ proprietarioId });

      if(!ownerExist) {
        throw new Error('Proprietario não encontrado')
      } 

      return await ProprietarioRepository.update({ nome, telefone, proprietarioId })
    } catch (error) {
      throw error
    }  
  }

  async delete({ proprietarioId }) {
    try {
      const ownerExist = await ProprietarioRepository.listById({ proprietarioId })
      
      if(!ownerExist) {
        throw new Error('Proprietario não encontrado')
      } 

      const areTherePets = await ProprietarioRepository.listPetsProprietario({ proprietarioId })
      
      if (areTherePets.length > 0) {
        throw new Error("Proprietário possui pets, delete-os primeiro")
      }

      return await ProprietarioRepository.delete({ proprietarioId })
    } catch (error) {
      throw error
    }
  }
}

export default new ProprietarioService()
