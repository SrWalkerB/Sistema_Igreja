const express = require('express');
const Caixa_Controllers = require('../Controllers/Caixa_Controllers');
const Autorizacao = require('./middlewares/autorizacao_middlware');

const caixa_Route = express.Router();



caixa_Route.get("/congregacao/caixa", Autorizacao, Caixa_Controllers.list_Caixa);

caixa_Route.post("/congregacao/caixa", Autorizacao, Caixa_Controllers.lancamento_Caixa);

caixa_Route.delete("/congregacao/caixa/del/:id_lancamento", Autorizacao, Caixa_Controllers.delete_Lancamento_Caixa);




module.exports = caixa_Route;