// ===== LH Games - API local (Backend) =====
// API REST simples em Node.js puro (sem dependencias externas) para simular
// o backend de uma loja de eletronicos/jogos (e-commerce). Suporta o fluxo
// CRUD completo de produtos: Criacao (POST), Consulta (GET), Atualizacao
// (PUT) e Destruicao (DELETE), conforme exigido na atividade de Interacao
// com APIs.

const http = require("http");
const { URL } = require("url");

const PORT = process.env.PORT || 3000;

let produtos = [
  { id: 1, nome: "Console GamerBox X", categoria: "Console", preco: 2499.9, quantidade: 12 },
    { id: 2, nome: "Controle Sem Fio Neon", categoria: "Acessorio", preco: 249.5, quantidade: 40 },
      { id: 3, nome: "Jogo: Corrida Cyberpunk", categoria: "Jogo", preco: 149.9, quantidade: 25 },
      ];
      let proximoId = 4;

      function encontrarProduto(id) {
        return produtos.find((p) => p.id === Number(id));
        }


        function enviarJson(res, statusCode, dados) {
        const corpo = JSON.stringify(dados);
        res.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        });
        res.end(corpo);
        }

        function lerCorpo(req) {
        return new Promise((resolve, reject) => {
        let dados = "";
        req.on("data", (chunk) => (dados += chunk));
        req.on("end", () => {
        if (!dados) return resolve({});
        try {
        resolve(JSON.parse(dados));
        } catch (erro) {
        reject(erro);
        }
        });
        req.on("error", reject);
        });
        }

        const server = http.createServer(async (req, res) => {
        if (req.method === "OPTIONS") {
        res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        });
        return res.end();
        }

        const url = new URL(req.url, "http://" + req.headers.host);
        const partes = url.pathname.split("/").filter(Boolean);

        try {
        if (req.method === "GET" && partes.length === 0) {
        return enviarJson(res, 200, { mensagem: "API LH Games no ar. Use /api/produtos para o CRUD." });
        }

        if (partes[0] !== "api" || partes[1] !== "produtos") {
        return enviarJson(res, 404, { erro: "Rota nao encontrada." });
        }

        const id = partes[2];

        if (req.method === "POST" && !id) {
        const corpo = await lerCorpo(req);
        const nome = corpo.nome;
        const categoria = corpo.categoria;
        const preco = corpo.preco;
        const quantidade = corpo.quantidade;

        if (!nome || preco === undefined) {
        return enviarJson(res, 400, { erro: "Campos obrigatorios ausentes: nome e preco sao obrigatorios." });
        }

        const novoProduto = {
        id: proximoId++,
        nome: nome,
        categoria: categoria || "Geral",
        preco: Number(preco),
        quantidade: quantidade !== undefined ? Number(quantidade) : 0,
        };
        produtos.push(novoProduto);
        return enviarJson(res, 201, novoProduto);
        }

        if (req.method === "GET" && !id) {
        return enviarJson(res, 200, produtos);
        }

        if (req.method === "GET" && id) {
        const produto = encontrarProduto(id);
        if (!produto) return enviarJson(res, 404, { erro: "Produto nao encontrado." });
        return enviarJson(res, 200, produto);
        }

        if (req.method === "PUT" && id) {
        const produto = encontrarProduto(id);
        if (!produto) return enviarJson(res, 404, { erro: "Produto nao encontrado." });

        const corpo = await lerCorpo(req);
        if (corpo.nome !== undefined) produto.nome = corpo.nome;
        if (corpo.categoria !== undefined) produto.categoria = corpo.categoria;
        if (corpo.preco !== undefined) produto.preco = Number(corpo.preco);
        if (corpo.quantidade !== undefined) produto.quantidade = Number(corpo.quantidade);

        return enviarJson(res, 200, produto);
        }

        if (req.method === "DELETE" && id) {
        const indice = produtos.findIndex((p) => p.id === Number(id));
        if (indice === -1) return enviarJson(res, 404, { erro: "Produto nao encontrado." });

        const removido = produtos.splice(indice, 1)[0];
        return enviarJson(res, 200, { mensagem: "Produto removido com sucesso.", produto: removido });
        }

        return enviarJson(res, 404, { erro: "Rota nao encontrada." });
        } catch (erro) {
        return enviarJson(res, 500, { erro: "Erro interno.", detalhe: String(erro) });
        }
        });

        server.listen(PORT, function () {
        console.log("API LH Games rodando em http://localhost:" + PORT);
        });
        
