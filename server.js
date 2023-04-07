import express, { request } from 'express';
import bodyParser from 'body-parser';
import { randomUUID } from 'crypto'

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const proprietarios = [];
const pets = [];

// cadastrar proprietario
app.post('/proprietario', (request, response) => {
  const { nome, cpf, telefone } = request.body;
  
  const proprietario = { 
    nome,
    cpf,
    telefone,
    id: randomUUID()
  };

  const index = proprietarios.findIndex(item => item.cpf == proprietario.cpf||item.telefone == proprietario.telefone);

  if(index === -1) {
    proprietarios.push(proprietario);
    return response.status(201).send('Proprietário cadastrado com sucesso!');
  } else {
    return response.status(400).send('cpf ou telefone já existentes');
  }
})

// cadastrar pets
app.post('/pets', (request, response) => {
  const { nome, idade, peso, raça, proprietarioId } = request.body;
  
  const pet = {
    nome,
    proprietarioId,
    idade,
    peso,
    raça,
    id: randomUUID()
  };

  const index = pets.findIndex(item => item.id == pet.id)
  
  if(index === -1) {
    pets.push(pet);
    return response.status(201).send('Pet cadastrado com sucesso!');""
  } else {
    return response.status(400).send('id de pet já existente');
  }

})

// listar todos os proprietarios
app.get('/proprietarios', (req, res) => {
  return res.send(200, proprietarios);
})

//listar proprietario pelo id
app.get('/proprietarios/:id', (req, res) => {
  function buscarProprietarioPorId(id) {
    return proprietarios.filter(proprietario => proprietario.id == id)
  }
  res.json(buscarProprietarioPorId(req.params.id))
})

app.get('/proprietarios/:id/pets', (req, res) => {
  function petsPorId(proprietarioId) {
    return {pets: pets.filter(pet => pet.proprietarioId == proprietarioId)}
  }
  res.json(petsPorId(req.params.id))
})

// listar todos os pets
app.get('/pets', (req, res) => {
  return res.send(200, pets);
})

// listar pet pelo id
app.get('/pet/:id', (req, res) => {
  function buscarPetPorId(id) {
    return pets.filter(pet => pet.id == id)
  }
  res.json(buscarPetPorId(req.params.id))
})

app.put('proprietarios/:id', (req, res) => {
  const id = req.params.id
  const { telefone } = request.body;
})

app.listen(port, ()=> {
  console.log(`Rodando na http://localhost:${port}`) ;
})

