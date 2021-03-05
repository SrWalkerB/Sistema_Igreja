import { Router } from "express";
import Administracao_Controllers from "../Controllers/Administracao_Controllers";
import autorizacao_admin_middlware from "./middlewares/autorizacao_admin_middlware";

const adm_router = Router();


adm_router.get("/congregacoes", autorizacao_admin_middlware.Autorizacao_ADMIN, Administracao_Controllers.list_congregacoes);

adm_router.post("/congregacoes", autorizacao_admin_middlware.Autorizacao_ADMIN, Administracao_Controllers.create_congregacoes);

/*
adm_router.post("/congregacoes/create/user", autorizacao_middlware.Autorizacao, Administracao_Controllers.create_user);

adm_router.get("/congregacoes/users/", autorizacao_middlware.Autorizacao, Administracao_Controllers.list_user);

adm_router.delete("/congregacoes/del/:id_congregacao", autorizacao_middlware.Autorizacao, Administracao_Controllers.delete_Congregacao); */


export default adm_router;