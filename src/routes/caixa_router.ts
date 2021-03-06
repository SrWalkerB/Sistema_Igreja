import { Router } from "express"; 
import Caixa_Controllers from "../Controllers/Caixa_Controllers";
import autorizacao_middlware from "./middlewares/autorizacao_middlware";


const caixa_Route = Router();


caixa_Route.get("/congregacao/caixa", autorizacao_middlware.Autorizacao, Caixa_Controllers.list_Caixa);

caixa_Route.post("/congregacao/caixa", autorizacao_middlware.Autorizacao, Caixa_Controllers.lancamento_Caixa);

caixa_Route.delete("/congregacao/caixa/del/:id", autorizacao_middlware.Autorizacao, Caixa_Controllers.delete_Lancamento_Caixa);


export default caixa_Route;