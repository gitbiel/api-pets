import PetService from '../services/pets.service.js';

class PetController {
  async create(request, response) {
    try {
      const { nome, idade, peso, raca, proprietarioId } = request.body;
      await PetService.create({ nome, idade, peso, raca, proprietarioId });
        
      return response.status(201).send('Pet cadastrado com sucesso!');
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async list(_request, response) {
    try {
      const result = await PetService.list();
      return response.json(result);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  listById(request, response) {
    const result = PetService.listById({
      petId: request.params.id
    });

    if(result?.isError) {
      return response.status(404).json({ message: result.message });
    }
  
    response.json(result.petEncontrado);
  }

  updateById(request, response) {
    const { nome, idade, peso, raca } = request.body;
    const result = PetService.update({
      nome, idade, peso, raca,
      petId: request.params.id
    })

    if(result?.isError) {
      return response.status(404).json({ message: result.message });
    }
    
    return response.json({ message: 'Pet atualizado com sucesso!'}); 
  }

  deleteById(request, response) {
    const result = PetService.delete({
      petId: request.params.id
    })

    if(result?.isError) {
      return response.status(404).json({ message: result.message });
    }
    
    return response.status(200).json({ message: 'Pet deletado com sucesso!'});
  }
}

export default new PetController();
