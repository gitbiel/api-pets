import express, { request } from 'express';
import bodyParser from 'body-parser';
import { randomUUID } from 'crypto'

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const proprietarios = [
  {
		"id": "cf5af97e-24f5-499b-940e-29a792acba79",
		"nome": "biel",
		"cpf": "14340478509",
		"telefone": "11940800022"
	}
];

const pets = [
  {
		"id": "2a1fb52b-7b83-45a9-87bf-76a7ba005136",
		"nome": "spike",
		"proprietarioId": "cf5af97e-24f5-499b-940e-29a792acba79",
		"idade": 6,
		"peso": 20,
		"raca": "border collie"
	}
];

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


//listar proprietario pelo id
app.get('/proprietarios/:id', (req, response) => {
  const { id } = req.params;
  const proprietarioEncontrado = proprietarios.find((proprietario) => proprietario.id === id);

  if(!proprietarioEncontrado) {
    return response.status(404).json({
      message: 'Proprietario não encontrado!'
    })
  }

  response.json(proprietarioEncontrado);
})

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

// listar todos os pets
app.get('/pets', (_request, response) => {
  return response.send(200, pets);
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

