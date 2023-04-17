import { randomUUID } from 'crypto';
import { proprietarios } from '../db/index.js';

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
}

export default new proprietarioService()
