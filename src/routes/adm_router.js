
const express = require("express");
const Administracao_Controllers = require("../Controllers/Administracao_Controllers");

const adm_router = express.Router();


adm_router.get("/congregacoes", Administracao_Controllers.list_congregacoes);


module.exports = adm_router;