import express from 'express';
import bodyParser from 'body-parser';
import { randomUUID } from 'crypto';

const server = express()
const port = process.env.PORT || 3001;

server.use(bodyParser.json())

const proprietarios = []
const pets = []

function validarDadosDoProprietario(body, response) {
  const { nome, telefone, cpf } = body;

  if(!nome || !telefone || !cpf){
    return response.status(404).json({
      message: 'Necessário enviar todos os dados: nome, telefone e cpf',
    });
  }

  if(typeof cpf !== 'string') {
    return {
      status: 404,
      message: 'cpf precisa ser string'
    }
    // return response.status(404).send('cpf precisa ser string')
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
}

server.post('/proprietarios', (request , response) => {
  validarDadosDoProprietario(request.body, response);
  
  const { nome, telefone, cpf } = request.body;

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

server.get('/proprietarios' , (request , response) =>{
  return response.status(200).send(proprietarios)
})

server.get('/proprietarios/:id', (req, response) => {
  const { id } = req.params;
  const proprietarioEncontrado = proprietarios.find((proprietario) => proprietario.id === id);

  if(!proprietarioEncontrado) {
    return response.status(404).json({
      message: 'Usuário não encontrado!'
    })
  }

  response.json(proprietarioEncontrado);
})

server.post('/pets', (request , response) => {
  const {nome , idade , peso , raca , proprietarioId} = request.body

  const pet = {
    id: randomUUID(),
    nome, 
    idade,
    peso,
    raca,
    proprietarioId,
  }
  const index = pets.findIndex(item => item.id == pet.id)

   
  if(!nome || !idade || !peso || !raca || !proprietarioId ){
    return response.status(404).send('por favor Cadastrar todos os dados!!')
  } 
  if(index === -1){
    pets.push(pet)
    return response.status(201).send('Cadastrado com sucesso!')
  }else{
    return response.status(400).send('usuario já Cadastrado')
  }
})

server.get('/pets' , (request , response) =>{
   response.status(200).send(pets)
})
// 

function buscarPetPorId(proprietarioId){
  const proprietario =  proprietarios.find(proprietario => proprietario.id == proprietarioId)
  return {proprietarioId: proprietario.nome , pets: pets.filter(pet => pet.proprietarioId == proprietarioId)}
}
server.get('/pets/proprietarioId', (request , response) => {
  response.json(buscarPetPorId(request.params.proprietarioId))
})

// listar o proprietario do pet

function buscarDonoPets(id){
  return pets.filter( pets => pets.id == id)
}

server.get('/pets/:id', (request , response) => {
  response.json(buscarDonoPets(request.params.id))
})

function pegarIndexProprietario(id){
  return proprietarios.findIndex(item => item.id == id)
}
   
//   atualizar informações proprietario, menos o id dele

server.put('/proprietarios/:id', (request , response) => {

  validarDadosDoProprietario(request.body, response)
  const p = pegarIndexProprietario(request.params.id)
  proprietarios[index].nome = request.body.nome
  proprietarios[index].telefone = request.body.telefone
  proprietarios[index].cpf = request.body.cpf
  response.status(201).send("atualização do Proprietario foi feita com sucesso!");
})

function pegarIndexPets(id){
  return pets.findIndex(item => item.id == id)
}
// atualizar informações pet, menos o id dele
server.put('/pet/:id', (request , response) => {
    const index = pegarIndexPets(request.params.id)
    pets[index].nome = request.body.nome
    pets[index].idade = request.body.idade
    pets[index].peso = request.body.peso
    pets[index].raca = request.body.raca
    response.status(201).send("atualização do Pet foi feita com sucesso!")
})
  
// Parte de deletar Proprietario e Pet
server.delete('/proprietario/:id', (request , response) => {
  const index = pegarIndexProprietario(request.params.id)
  proprietarios.splice(index , 1)
  response.send('Proprietario deletado com sucesso!')
})

server.delete('/pets/:id', (request , response) => {
  const index = pegarIndexPets(request.params.id)
  pets.splice(index , 1)
  response.send('Pet deletado com sucesso!')
})

server.listen(port , () => console.log(`http://localhost:${port}`))