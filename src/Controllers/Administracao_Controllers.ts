import { Request, Response } from "express";
import administracao_Service from "../services/administracao_Service";
import congregacaoService from "../services/congregacaoService";
const caixa_Data = require("../Data/caixa_Data");
const congregacao_Data = require("../Data/congregacao_Data");
const membros_Data = require("../Data/membros_Data");
const user_Data = require("../Data/user_Data");
const { Cryptografar_Password } = require("../utils/crytografar_password");
const { VerificarToken } = require("../utils/gerarTokens");
const { Verificando_Permissao } = require("../utils/verificando_Permisao");
const { Verificar_Email } = require("../utils/verificao_email_DB");


export default {

    list_congregacoes: async (Request: Request, Response: Response) => {

        try {

            const result = await congregacaoService.list_All_Congregacoes_Service();
            
            return Response.status(200).json(result.msg);

        } catch (error) {
            
            console.log(error);
            return Response.status(200).json({ msg: error });
        }
    },

    create_congregacoes: async (Request: Request, Response: Response) => {

        try {

            const { 
                    name,
                    cep,
                    rua,
                    numero,
                    bairro,
                    cidade,
                    estado,
            } = Request.body;
            
            const create = await congregacaoService.create_Congregacao_Service({
                name: name,
                rua: rua,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                cep: cep,
                numero: numero,
            })

            if(create?.err) return Response.status(400).json({ err: create.err });

            return Response.status(201).json({ msg: "Congregacao Criada" });
        
        } catch (error) {
            
            console.log(error);
            return Response.status(200).json({ msg: error });
        }
    },

    create_user: async (Request: Request, Response: Response) => {

        try {

            const { name, surname, email, password, type, congregacao } = Request.body;

            const result = await administracao_Service.create_User_Service({
                name_congregacao: congregacao,
                name: name,
                surname: surname,
                email: email,
                password: password,
                type: type
            })

            if(result.err) return Response.status(404).json({ err : result.err })
                        
            return Response.status(200).json(result.msg);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ msg: error });
        }
    },

    list_user: async (Request: Request, Response: Response) => {

        try {
            
            const result = await administracao_Service.list_User_Service();

            return Response.status(200).json(result.msg);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ msg: error });
        }
    },

    delete_Congregacao: async (Request: Request, Response: Response) => {

        try {
            
            const token = Request.header("Token");
            const verifica_Token = VerificarToken(token);



            const { id_congregacao } = Request.params;

            const verifica_ID_Congregacao = await congregacao_Data.list_congregacao_ID(id_congregacao);



            if(verifica_ID_Congregacao <= 0){

                return Response.status(200).json({ msg: "Congregacao Não encontrada" });
                
            }

            const del = await congregacao_Data.delete_Congregacao(id_congregacao);


            return Response.status(200).json({ msg: "Deletado!" });


        } catch (error) {
            

            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }
}