import { randomUUID } from 'crypto';

import { proprietarios } from '../db/index.js'
import { pets } from '../db/index.js'

class ProprietarioController {
  create(request, response) {
    const { nome, cpf, telefone } = request.body;

     if(typeof cpf !== 'string') {
      return response.status(404).send('cpf precisa ser string')
    }
  
    if(cpf.length !== 11) {
      return response.status(404).send('cpf precisa ter 11 números')
    }
  
    if(typeof telefone !== 'string') {
      return response.status(404).send('telefone precisa ser string')
    }
  
    if(telefone.length !== 9) {
      return response.status(404).send('telefone precisa ter 9 números')
    }
    
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
      return response.status(400).json({
        message: 'Usuário já existe!',
        detalhes: 'cpf ou telefone já estão cadastrados',
      });
    }
  
    proprietarios.push(novoProprietario);
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
    const indexProprietario = proprietarios.findIndex(({ id }) => id === request.params.id);

    if(indexProprietario === -1) {
      return response.status(404).json({
        message: 'Proprietario não encontrado!'
      });
    };

    const { nome, telefone } = request.body;

    if(!nome || !telefone ){
      return response.status(404).json({
        message: 'Necessário enviar os dados: nome e telefone',
      });
    };

    if(typeof telefone !== 'string') {
      return response.status(404).send('telefone precisa ser string');
    };

    if(telefone.length !== 9) {
      return response.status(404).send('telefone precisa ter 11 números');
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
