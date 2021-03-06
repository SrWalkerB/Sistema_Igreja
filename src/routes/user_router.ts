import autorizacao_middlware from "./middlewares/autorizacao_middlware";
import { Router } from "express";
import User_Controllers from "../Controllers/User_Controllers";


const user_route = Router();


user_route.get("/congregacao/my", autorizacao_middlware.Autorizacao, User_Controllers.list_congregacao);

user_route.get("/congregacao/membros/", autorizacao_middlware.Autorizacao, User_Controllers.list_membros_congregacao);
 
user_route.post("/congregacao/membros/", autorizacao_middlware.Autorizacao, User_Controllers.create_membro_congregacao);

user_route.put("/congregacao/membros/:id", autorizacao_middlware.Autorizacao, User_Controllers.update_membro_congregacao);

user_route.put("/congregacao/info/", autorizacao_middlware.Autorizacao, User_Controllers.update_Info_Congregacao);
/*

user_route.delete("/congregacao/membros/:id", autorizacao_middlware.Autorizacao, User_Controllers.delete_membro_congregacao);
 */


export default user_route;