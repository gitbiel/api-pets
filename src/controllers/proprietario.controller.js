import { randomUUID } from 'crypto';

import { proprietarios } from '../db/index.js'

class ProprietarioController {
  create(request, response) {
    const { nome, cpf, telefone } = request.body;

    if(!nome || !telefone || !cpf){
      return response.status(404).json({
        message: 'Necessário cadastrar todos os dados: nome, telefone e cpf',
      });
    }
  
    if(typeof cpf !== 'string') {
      return response.status(404).send('cpf precisa ser string')
    }
  
    if(cpf.length !== 11) {
      return response.status(404).send('cpf precisa ter 11 números')
    }
  
    if(typeof telefone !== 'string') {
      return response.status(404).send('telefone precisa ser string')
    }
  
    if(telefone.length !== 11) {
      return response.status(404).send('telefone precisa ter 11 números')
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
}

export default new ProprietarioController();
