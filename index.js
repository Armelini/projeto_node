const express = require("express");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");

const app = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(middlewares);

// Use the JSON Server router
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`sistema esta rodando na porta  ${PORT}`);
});

// Rotas para CRUD de Cliente
app.get("/api/clientes", (req, res) => {
  const clientes = router.db.get("clientes").value();
  res.json(clientes);
});

app.post("/api/clientes", (req, res) => {
  const novoCliente = req.body;
  router.db.get("clientes").push(novoCliente).write();
  res.json(novoCliente);
});

app.put("/api/clientes/:id", (req, res) => {
  const clienteId = parseInt(req.params.id);
  const updatedCliente = req.body;

  router.db
    .get("clientes")
    .find({ id: clienteId })
    .assign(updatedCliente)
    .write();

  res.json(updatedCliente);
});
