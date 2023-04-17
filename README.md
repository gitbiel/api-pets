# Isso Omit a instalação de devDependencies
npm install --omit=dev


PascalCase
camelCase

Separação de responsabilidades

OK POST    /proprietarios           = "Criar um proprietario"
OK GET     /proprietarios           = "Listar um proprietario"
OK GET     /proprietarios/:id       = "listar os dados do proprietario pelo id"
OK GET     /proprietarios/:id/pets  = "listar todos os pets de um proprietario pelo id"
OK PUT     /proprietarios/:id       = "atualizar os dados do proprietario pelo id"
DELETE  /proprietarios/:id       = "remover um proprietario pelo id"  



OK POST    /pets           = "Criar um pet"
OK GET     /pets           = "listar todos os pets"
OK GET     /pets/:id       = "listar todos os dados de um pet pelo id"
PUT     /pets/:id       = "atualizar os dados de um pet pelo id"
DELTE   /pets/:id       = "remover um pet pelo id"


Gabriel 
{
  [!] POST /proprietarios 
  [!] Validou os dados?
  [!] URL não correspondeu a informada
  [x] Cadastrou?
}
{
  [x] GET  /proprietarios   OK
}
{
  [x] GET  /proprietarios/:id  OK
  [!] Não validou se o usuário existe, mandou um 200 com array vazio
}
{
  [] GET  /proprietarios/:id/pets
}
{
  [x] PUT /proprietarios/:id
}
{
  [x] PUT     /pets/:id 
}
{
  [x] POST    /pets
  "raça" não colocamos atributos com acentos
}

Caio
{
  [!] POST /proprietarios 
  [!] Validou os dados?
  [!] URL não correspondeu a informada
  [x] Cadastrou?
  [!] Não colocou return
}
{
  [x] GET  /proprietarios   OK
}
{
  [!] GET  /proprietarios/:id
  [!] Não fez, sem vergonha
}
{
  [] GET  /proprietarios/:id/pets
}
{
  [] PUT /proprietarios/:id
  [!] status deveria ser 200
}
{
  [] PUT     /proprietarios/:id
  [!] Não fez, sem vergonha
}



