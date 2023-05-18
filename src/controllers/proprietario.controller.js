import ProprietarioService from '../services/proprietarios.service.js'

class ProprietarioController {
  async create(request, response) {
    try {
      const { nome, cpf, telefone } = request.body;
      await ProprietarioService.create({ nome, cpf, telefone });

      return response.status(201).send('Proprietário cadastrado com sucesso');
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async list(_request, response) {
    try {
      const result = await ProprietarioService.list();
      return response.json(result);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }
  async listById(request, response) {
    try {
      const result = await ProprietarioService.listById({ 
        proprietarioId: request.params.id
      });

      return response.json(result);
    } catch (error) {
    return response.status(404).json({ message: result.message });
    }
  }

  listPetsProprietario(request, response) {
    const result = ProprietarioService.listPetsProprietario({ 
      proprietarioId: request.params.id
    });

    if(result?.isError) {
      return response.status(404).json({ message: result.message });
    };
  
    return response.json(result);
  }

  updateById(request, response) {
    const { nome, telefone } = request.body;
    const result = ProprietarioService.update({
      nome, telefone,
      proprietarioId: request.params.id
    })

    if(result?.isError) {
      return response.status(404).json({ message: result.message });
    }

    return response.send(200, 'Proprietário cadastrado com sucesso!');
  }

  deleteById(request, response) {
    const result = ProprietarioService.delete({
      proprietarioId: request.params.id
    })

    if(result?.isError) {
      return response.status(400).json({ message: result.message });
    }

    return response.json({ message: 'Pet deletado com sucesso!'});
  }
}

export default new ProprietarioController();
