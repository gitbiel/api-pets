import { proprietarios, pets } from '../db/index.js'
import proprietarioService from '../services/proprietarios.service.js'

class ProprietarioController {
  create(request, response) {
    const { nome, cpf, telefone } = request.body;
    const result = proprietarioService.create({ nome, cpf, telefone });

    if(result?.isError) {
      return response.status(400).json({ message: result.message });
    }
  
    return response.status(201).send('Proprietário cadastrado com sucesso!');
  }

  list(_request, response) {
    return response.send(200, proprietarios); 
  }

  listById(request, response) {
    const { id } = request.params;
    const proprietarioEncontrado = proprietarios.find((proprietario) => proprietario.id === id);
  
    if(!proprietarioEncontrado) {
      return response.status(404).json({
        message: 'Proprietario não encontrado!'
      })
    }
  
    return response.json(proprietarioEncontrado);
  }

  listPetsProprietario(request, response) {
    const { id } = request.params;
    const proprietarioEncontrado = proprietarios.find((proprietario) => proprietario.id === id);
  
    if(!proprietarioEncontrado) {
      return response.status(404).json({
        message: 'Proprietario não encontrado!'
      });
    };
  
    const petsDoProprietario = pets.filter(pet => pet.proprietarioId === id);
    if(petsDoProprietario.length === 0) {
      return response.status(404).json({
        message: 'Proprietário não possui pets!'
      });
    };
  
    return response.json({
      proprietario: proprietarioEncontrado.nome,
      pets: petsDoProprietario
    });
  }

  updateById(request, response) {
    const { nome, telefone } = request.body;

    const indexProprietario = proprietarios.findIndex(({ id }) => id === request.params.id);

    if(indexProprietario === -1) {
      return response.status(404).json({
        message: 'Proprietario não encontrado!'
      });
    };

    proprietarios[indexProprietario].nome = nome;
    proprietarios[indexProprietario].telefone = telefone;

    return response.json({ message: 'Proprietario atualizado com sucesso!'});  
  }

  deleteById(request, response) {
    const indexProprietario = proprietarios.findIndex(({ id }) => id === request.params.id);

    if(indexProprietario === -1) {
      return response.status(404).json({
        message: 'Proprietário não encontrado'
      });
    };

    const { id } = request.params;
    const petsDoProprietario = pets.filter(pet => pet.proprietarioId === id);
    if(petsDoProprietario.length > 0) {
      return response.status(400).json({
        message: 'Proprietário possui pets, remova os pets antes de deletar proprietário!'
      });
    };

    proprietarios.splice(indexProprietario, 1);
    return response.json({
      message: 'Proprietário deletado com sucesso!'
    });
  }
}

export default new ProprietarioController();