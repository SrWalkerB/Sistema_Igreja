
require("dotenv").config();

const express = require("express");
const adm_router = require("./routes/adm_router");
const login_router = require("./routes/login_router");
const user_route = require("./routes/user_router");

const app = express();


app.use(express.json());

app.use(adm_router);

app.use(login_router);

app.use(user_route);


module.exports = app;