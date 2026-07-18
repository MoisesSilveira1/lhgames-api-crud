# LH Games - Interação com APIs (CRUD)

Atividade: **Desenvolvimento e Integração de uma API Local para o Fluxo do CRUD de E-commerce** — SENAI, UCr Interação com APIs.

Situação-problema: interface Angular (Front-End) consumindo uma API local (Back-End) de uma loja de eletrônicos/jogos (LH Games), implementando o CRUD completo de produtos.

> Observação: a atividade original pedia para fazer o fork do repositório-base fornecido pelo professor na aula ao vivo. Esse link não estava disponível em nenhum material escrito do AVA (só apareceria na gravação da aula), então este projeto foi construído do zero, cumprindo os mesmos requisitos funcionais descritos no enunciado (CRUD completo, Angular + API local, Bootstrap, tratamento de erros).

## Estrutura do repositório

```
backend/          API local (Node.js puro, sem dependencias externas)
frontend/         Aplicacao Angular (CRUD de produtos)
postman/          Colecao Postman + testes via curl
```

## Como rodar o backend (API local)

```
cd backend
node server.js
```

A API sobe em http://localhost:3000

| Metodo | Rota | Acao |
|--------|------|------|
| GET | /api/produtos | Lista todos os produtos |
| GET | /api/produtos/:id | Consulta um produto |
| POST | /api/produtos | Cria um novo produto |
| PUT | /api/produtos/:id | Atualiza um produto existente |
| DELETE | /api/produtos/:id | Remove um produto |

O backend foi escrito em Node.js puro (modulo http) em vez de Express porque o ambiente onde foi desenvolvido nao tinha acesso a internet para npm install. O comportamento das rotas e equivalente ao que seria feito com Express + CORS.

## Como rodar o frontend (Angular)

```
cd frontend
npm install
ng serve
```

Acesse http://localhost:4200. A tela lista os produtos vindos da API, e permite:
- Criacao (POST): formulario de cadastro de produto.
- Consulta (GET): tabela com os produtos retornados pela API.
- Atualizacao (PUT): botao Editar em cada linha, com salvar/cancelar.
- Destruicao (DELETE): botao Excluir em cada linha (com confirmacao).

## Testes da API (Postman)

A colecao postman/LH-Games-API.postman_collection.json contem as 4 requisicoes (GET, POST, PUT, DELETE) usadas para validar a API antes da integracao com o Angular. Pode ser importada diretamente no Postman (File > Import). Os testes tambem foram validados via curl - ver postman/testes-curl.md.
