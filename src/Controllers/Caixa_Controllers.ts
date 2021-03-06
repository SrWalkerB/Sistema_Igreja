import { Request, Response  } from "express";
import caixa_Service from "../services/caixa_Service";
const moment = require("moment");
const caixa_Data = require("../Data/caixa_Data");
const { VerificarToken } = require("../utils/gerarTokens");


class Caixa_Controllers {
 
    async list_Caixa (Request: Request, Response: Response){

        try {

            const token = Request.header("Token");
            const data = await caixa_Service.list_Caixa(token!);

            return Response.status(200).json({ data: data.msg });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }

    async lancamento_Caixa (Request: Request, Response: Response){

        try {
            
            const token = Request.header("Token");
            const { dizimos, doacoes, ofertas } = Request.body;

            const lancar_caixa = await caixa_Service.create_Lancamento_Caixa({
                dizimos: dizimos,
                doacoes: doacoes,
                ofertas: ofertas
            }, token!)

            return Response.status(201).json({ msg: lancar_caixa.msg});

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }

    async delete_Lancamento_Caixa (Request: Request, Response: Response){

        try {
            
            const token = Request.header("Token");
            const { id } = Request.params;
            const delete_lancamento = await caixa_Service.delete_Lancamento_Caixa(id, token!);

            if(delete_lancamento.err) return Response.status(404).json({ err: delete_lancamento.err });
 
            return Response.status(200).json({ msg: delete_lancamento.msg});
            
        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }
}

export default new Caixa_Controllers;