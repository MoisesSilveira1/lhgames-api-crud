# Testes das rotas da API (validacao via curl)

Antes de integrar com o Angular, a API foi validada localmente com os comandos abaixo (equivalentes as requisicoes da colecao Postman).

```bash
# Health check
curl -s http://localhost:3000/
# {"mensagem":"API LH Games no ar. Use /api/produtos para o CRUD."}

# GET - listar produtos (estado inicial)
curl -s http://localhost:3000/api/produtos
# [{"id":1,"nome":"Console GamerBox X", ...}, {"id":2,"nome":"Controle Sem Fio Neon", ...}, {"id":3,"nome":"Jogo: Corrida Cyberpunk", ...}]

# POST - criar produto
curl -s -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
    -d '{"nome":"Headset Pro Gamer","categoria":"Acessorio","preco":329.9,"quantidade":15}'
    # {"id":4,"nome":"Headset Pro Gamer","categoria":"Acessorio","preco":329.9,"quantidade":15}

    # PUT - atualizar produto (id 4)
    curl -s -X PUT http://localhost:3000/api/produtos/4 \
      -H "Content-Type: application/json" \
        -d '{"quantidade":10}'
        # {"id":4,"nome":"Headset Pro Gamer","categoria":"Acessorio","preco":329.9,"quantidade":10}

        # DELETE - remover produto (id 2)
        curl -s -X DELETE http://localhost:3000/api/produtos/2
        # {"mensagem":"Produto removido com sucesso.","produto":{"id":2,"nome":"Controle Sem Fio Neon", ...}}

        # GET - listar produtos (estado final)
        curl -s http://localhost:3000/api/produtos
        # [{"id":1,...}, {"id":3,...}, {"id":4,"quantidade":10}]  -> confirma criacao, atualizacao e remocao
        ```

        Todas as 4 operacoes do CRUD (Criacao, Consulta, Atualizacao, Destruicao) foram testadas com sucesso antes da integracao com o front-end Angular.
        
