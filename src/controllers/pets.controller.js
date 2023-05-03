import { proprietarios, pets } from '../db/index.js';
import petService from '../services/pets.service.js';

class PetController {
  create(request, response) {
    const { nome, idade, peso, raca, proprietarioId } = request.body;
    const result = petService.create({ nome, idade, peso, raca, proprietarioId });

    if(result?.isError) {
      return response.status(400).json({ message: result.message });
    }

    return response.status(201).send('Pet cadastrado com sucesso!');
  }

  list(_request, response) {
    return response.send(200, pets);
  }

  listById(request, response) {
    const result = petService.listById({
      petId: request.params.id
    });

    if(result?.isError) {
      return response.status(404).json({ message: result.message });
    }
  
    response.json(result.petEncontrado);
  }

  updateById(request, response) {
    const { nome, idade, peso, raca } = request.body;
    const result = petService.update({
      nome, idade, peso, raca,
      petId: request.params.id
    })

    if(result?.isError) {
      return response.status(404).json({ message: result.message });
    }
    
    return response.json({ message: 'Pet atualizado com sucesso!'}); 
  }

  deleteById(request, response) {
    const result = petService.delete({
      petId: request.params.id
    })

    if(result?.isError) {
      return response.status(404).json({ message: result.message });
    }
    
    return response.status(200).json({ message: 'Pet deletado com sucesso!'});
  }
}

export default new PetController();
