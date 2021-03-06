
require("dotenv").config();

import express from "express";
import adm_router from "./routes/adm_router";
import caixa_Route from "./routes/caixa_router";
import login_router from "./routes/login_router";
import user_route from "./routes/user_router";

const app = express();


app.use(express.json());

app.use(adm_router);

app.use(login_router);

app.use(user_route);

app.use(caixa_Route);


export default app;