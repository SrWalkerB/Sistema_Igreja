
import { Router } from "express";
import autorizacao_middlware from "./middlewares/autorizacao_middlware";
const Administracao_Controllers = require("../Controllers/Administracao_Controllers");

const adm_router = Router();


adm_router.get("/congregacoes", autorizacao_middlware.Autorizacao, Administracao_Controllers.list_congregacoes);

adm_router.post("/congregacoes/create", autorizacao_middlware.Autorizacao, Administracao_Controllers.create_congregacoes);

adm_router.post("/congregacoes/create/user", autorizacao_middlware.Autorizacao, Administracao_Controllers.create_user);

adm_router.get("/congregacoes/users/", autorizacao_middlware.Autorizacao, Administracao_Controllers.list_user);

adm_router.delete("/congregacoes/del/:id_congregacao", autorizacao_middlware.Autorizacao, Administracao_Controllers.delete_Congregacao);


export default adm_router;