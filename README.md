# API GAMES
![GitHub repo size](https://img.shields.io/github/repo-size/gguilhermelopes/nodejs-restapi-games?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/gguilhermelopes/nodejs-restapi-games?style=for-the-badge)
> API utilizada para armazenamento de informações de games em banco de dados relacional MySQL.

## Endpoints
### GET /games
Endpoint responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parâmetros
Nenhum.
#### Respostas
###### 200 
Status: OK. A listagem de todos os games é fornecida.<br>
Exemplo de resposta: 
```
[
    {
        "id": 4,
        "title": "Hollow Knight",
        "year": 2018,
        "price": 150,
        "createdAt": "2023-03-15T17:51:37.000Z",
        "updatedAt": "2023-03-20T14:44:04.000Z"
    },
    {
        "id": 8,
        "title": "Hogwarts Legacy",
        "year": 2023,
        "price": 300,
        "createdAt": "2023-03-15T19:59:51.000Z",
        "updatedAt": "2023-03-15T19:59:51.000Z"
    },
    {
        "id": 9,
        "title": "Gran Turismo 2",
        "year": 1999,
        "price": 25,
        "createdAt": "2023-03-16T01:46:31.000Z",
        "updatedAt": "2023-03-20T15:06:02.000Z"
    },
    {
        "id": 12,
        "title": "Megaman X5",
        "year": 2001,
        "price": 30,
        "createdAt": "2023-03-16T17:25:49.000Z",
        "updatedAt": "2023-03-16T17:25:49.000Z"
    },
    {
        "id": 13,
        "title": "Red Dead Redemption 2 ",
        "year": 2018,
        "price": 150,
        "createdAt": "2023-03-20T14:39:56.000Z",
        "updatedAt": "2023-03-20T14:39:56.000Z"
    },
    {
        "id": 14,
        "title": "Celeste",
        "year": 2019,
        "price": 70,
        "createdAt": "2023-03-20T14:41:49.000Z",
        "updatedAt": "2023-03-20T14:41:49.000Z"
    }
]
```
###### 401 
Status: Unauthorized. Falha na autenticação (JWT Token inválido)<br>
Exemplo de resposta:
```
{
    "error": "Token inválido!"
}
```
### POST /auth
Endpoint responsável por retornar o token de autenticação para acesso à API (login).
#### Parâmetros
##### email
>Email cadastrado do usuário
##### password
>Senha cadastrada para aquele usuário
```
{
    
    "email": "email@email.com",
    "password": "******"
}
```
#### Respostas
###### 200 
Status: OK. O token é fornecido.<br>
Exemplo de resposta: 
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJidWtlbkBnbWFpbC5jb20iLCJpYXQiOjE2NzkzMjg5MTIsImV4cCI6MTY3OTUwMTcxMn0.C7oLn7hc46X6CoUTU5Le5HWwOVcG1N9ShFjW4CaPNcc"
}
```
###### 401 
Status: Unauthorized. Falha na autenticação (Senha ou Email inválidos)<br>
Exemplo de resposta:
```
{
    "error": "Senha inválida!"
}
```
Ou:
```
{
    "error": "Email não encontrado!"
}
```

### GET /game/:id
Endpoint responsável por retornar um único game.
#### Parâmetros
##### id
>ID do game

```
/game/2
```
#### Respostas
###### 200 
Status: OK. O game é fornecido.<br>
Exemplo de resposta: 
```
{
    "id": 4,
    "title": "Hollow Knight",
    "year": 2018,
    "price": 150,
    "createdAt": "2023-03-15T17:51:37.000Z",
    "updatedAt": "2023-03-20T14:44:04.000Z"
}
```
###### 400
Status: Bad Request. O ID (Number) está em formato inválido.

###### 404
Status: Not Found. O ID especificado não existe no banco de dados.

###### 401 
Status: Unauthorized. Falha na autenticação (JWT Token Inválido)<br>
Exemplo de resposta:
```
{
    "error": "Token inválido!"
}
```

### POST /game
Endpoint responsável por cadastrar um game no banco de dados.
#### Parâmetros
##### title
>Título do game
##### year
>Ano do game
#### price
>Preço do game
```
{
    
    "title": "Red Dead Redemption 2",
    "year": 2019,
    "price": 200
}
```
#### Respostas
###### 200 
Status: OK. O game é criado.<br>

###### 401 
Status: Unauthorized. Falha na autenticação (JWT Token inválido)<br>
Exemplo de resposta:
```
{
    "error": "Token inválido!"
}
```
###### 400
Status: Bad Request. Verifique os parâmetros e seus tipos.

### DELETE /game/:id
Endpoint responsável por retornar um único game.
#### Parâmetros
##### id
>ID do game

```
/game/2
```
#### Respostas
###### 200 
Status: OK. O game é deletado.

###### 400
Status: Bad Request. O ID (Number) está em formato inválido.

###### 404
Status: Not Found. O ID especificado não existe no banco de dados.

###### 401 
Status: Unauthorized. Falha na autenticação (JWT Token Inválido)<br>
Exemplo de resposta:
```
{
    "error": "Token inválido!"
}
```
### PUT /game/:id
Endpoint responsável por editar um game.
#### Parâmetros
##### id
>ID do game
##### title
>Título do game
##### year
>Ano do game
#### price
>Preço do game

```
/game/2
```
```
{
    
    "title": "Red Dead Redemption 2",
    "year": 2019,
    "price": 200
}
```
#### Respostas
###### 200 
Status: OK. O game é editado.<br>

###### 400
Status: Bad Request. O ID (Number) está em formato inválido.

###### 404
Status: Not Found. O ID especificado não existe no banco de dados.

###### 401 
Status: Unauthorized. Falha na autenticação (JWT Token Inválido)<br>
Exemplo de resposta:
```
{
    "error": "Token inválido!"
}
```
### POST /user
Endpoint responsável por cadastrar um usuário no banco de dados.
#### Parâmetros
##### name
>Nome do usuário
##### email
>Email do usuário
#### password
>Senha do usuário
```
{
    "name": "fubos"
    "email": "fubos@gmail.com",
    "password": "fubos"
}
```
#### Respostas
###### 200 
Status: OK. O usuário é criado.<br>

###### 400
Status: Bad Request. Verifique os parâmetros e seus tipos, assim como se o email já foi cadastrado.



