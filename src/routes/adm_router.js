
const express = require("express");
const Administracao_Controllers = require("../Controllers/Administracao_Controllers");
const Autorizacao = require("./middlewares/autorizacao_middlware");

const adm_router = express.Router();


adm_router.get("/congregacoes", Autorizacao, Administracao_Controllers.list_congregacoes);

adm_router.post("/congregacoes/create", Autorizacao, Administracao_Controllers.create_congregacoes);

adm_router.post("/congregacoes/create/user", Autorizacao, Administracao_Controllers.create_user);


module.exports = adm_router;