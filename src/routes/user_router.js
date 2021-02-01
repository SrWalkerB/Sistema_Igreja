
const express = require("express");
const User_Controllers = require("../Controllers/User_Controllers");
const Autorizacao = require("./middlewares/autorizacao_middlware");

const user_route = express.Router();



user_route.get("/congregacao", Autorizacao, User_Controllers.list_congregacao);

user_route.get("/congregacao/membros/", Autorizacao, User_Controllers.list_membros_congregacao);

user_route.post("/congregacao/membros/", Autorizacao, User_Controllers.create_membro_congregacao);

user_route.put("/congregacao/membros/:id_membro", Autorizacao, User_Controllers.update_membro_congreacao);

user_route.delete("/congregacao/membros/:id", Autorizacao, User_Controllers.delete_membro_congregacao);



module.exports = user_route;