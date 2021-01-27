
require("dotenv").config();

const express = require("express");
const adm_router = require("./routes/adm_router");
const login_router = require("./routes/login_router");

const app = express();


app.use(express.json());

app.use(adm_router);

app.use(login_router);



module.exports = app;