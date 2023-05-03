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
}

export default new proprietarioService()
