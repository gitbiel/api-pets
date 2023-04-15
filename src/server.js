import express from 'express';
import bodyParser from 'body-parser';
import { randomUUID } from 'crypto';

// rotas da aplicação
import { routes } from './routes/index.js';

const app = express();
app.use(bodyParser.json());
app.use('/', routes)
const port = process.env.PORT || 3000;

// cadastrar pets
app.post('/pets', (request, response) => {
  const { nome, idade, peso, raca, proprietarioId } = request.body;

  if(!nome || !idade || !peso || !raca || !proprietarioId){
    return response.status(404).json({
      message: 'Necessário cadastrar todos os dados: nome, idade, peso, raca, roprietarioId',
    });
  }

  // Para cadastrar um Pet
  // ele tem que ser uma posse
  // de um proprietario existente
  const donoEncontrado = proprietarios.find(({ id }) => id === proprietarioId);

  if(!donoEncontrado) {
    return response.status(404).json({
      message: 'O proprietario informado não existe',
    });
  }
  
  const novoPet = {
    id: randomUUID(),
    nome,
    proprietarioId,
    idade,
    peso,
    raca
  };

  pets.push(novoPet);
  return response.status(201).send('Pet cadastrado com sucesso!');
});



// Listar todos os pets de um proprietario pelo id
app.get('/proprietarios/:id/pets', (request, response) => {
  const { id } = request.params;
  const proprietarioEncontrado = proprietarios.find((proprietario) => proprietario.id === id);

  if(!proprietarioEncontrado) {
    return response.status(404).json({
      message: 'Proprietario não encontrado!'
    })
  }

  const petsDoProprietario = pets.filter(pet => pet.proprietarioId === id)

  if(petsDoProprietario.length === 0) {
    return response.status(404).json({
      message: 'Proprietário não possui pets!'
    })
  }

  return response.json({
    proprietario: proprietarioEncontrado.nome,
    pets: petsDoProprietario
  })
})


// listar pet pelo id
app.get('/pets/:id', (request, response) => {
  const { id } = request.params
  const petEncontrado = pets.find(pet => pet.id == id);

  if(!petEncontrado) {
    return response.status(404).json({
      message: 'Pet não encontrado!'
    })
  }

  response.json(petEncontrado)
})

app.put('/proprietarios/:id', (request, response) => {
  const indexProprietario = proprietarios.findIndex(({ id }) => id === request.params.id);

  if(indexProprietario === -1) {
    return response.status(404).json({
      message: 'Proprietario não encontrado!'
    })
  }

  const { nome, telefone } = request.body;

  if(!nome || !telefone ){
    return response.status(404).json({
      message: 'Necessário enviar os dados: nome e telefone',
    });
  }

  if(typeof telefone !== 'string') {
    return response.status(404).send('telefone precisa ser string')
  }

  if(telefone.length !== 11) {
    return response.status(404).send('telefone precisa ter 11 números')
  }

  proprietarios[indexProprietario].nome = nome;
  proprietarios[indexProprietario].telefone = telefone;

  return response.json({ message: 'Proprietario atualizado com sucesso!'})  
})

app.listen(port, ()=> {
  console.log(`Rodando na http://localhost:${port}`) ;
})

