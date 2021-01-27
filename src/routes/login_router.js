
const express = require("express");
const Login_Controllers = require("../Controllers/Login_Controllers");

const login_router = express.Router();


login_router.post("/create/account", Login_Controllers.create_account);



module.exports = login_router;