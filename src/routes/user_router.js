
const express = require("express");
const User_Controllers = require("../Controllers/User_Controllers");
const Autorizacao = require("./middlewares/autorizacao_middlware");

const user_route = express.Router();



user_route.get("/congregacao", Autorizacao, User_Controllers.list_congregacao);

user_route.get("/congregacao/membros/", Autorizacao, User_Controllers.list_membros_congregacao);



module.exports = user_route;