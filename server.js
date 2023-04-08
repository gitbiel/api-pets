import express, { request } from 'express';
import bodyParser from 'body-parser';
import { randomUUID } from 'crypto'

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const proprietarios = [];
const pets = [];

// cadastrar proprietario
app.post('/proprietarios', (request, response) => {
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
})

// listar todos os proprietarios
app.get('/proprietarios', (req, res) => {
  return res.send(200, proprietarios);
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


//listar proprietario pelo id
app.get('/proprietarios/:id', (req, response) => {
  const { id } = req.params;
  const proprietarioEncontrado = proprietarios.find((proprietario) => proprietario.id === id);

  if(!proprietarioEncontrado) {
    return response.status(404).json({
      message: 'Usuário não encontrado!'
    })
  }

  response.json(proprietarioEncontrado);
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

