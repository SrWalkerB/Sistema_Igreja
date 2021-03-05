import { Request, Response } from "express";
import userService from "../services/userService";
const congregacao_Data = require("../Data/congregacao_Data");
const membros_Data = require("../Data/membros_Data");
const { VerificarToken } = require("../utils/gerarTokens");


export default{

    list_congregacao: async (Request: Request, Response: Response) => {

        try {

            const token = Request.header('token');
            const seacher_congregacao = await userService.myCongregacao(token!);

            return Response.status(200).json(seacher_congregacao);
            
        } catch (error) {
            
            console.log(error);
            return Response.status(200).json({ err: error })
        }
    }/* ,

    list_membros_congregacao: async (Request: Request, Response: Response) => {

        try {
            
            const token = Request.header("Token");
            const verficar_token = VerificarToken(token);



            const seacher_membros = await membros_Data.list_membros_Congregacao(verficar_token.id_congregacao);

            if(seacher_membros == ""){
             
                return Response.status(200).json({ msg: "Nenhum membro cadastrado" });
            }


            return Response.status(200).json(seacher_membros);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    },

    create_membro_congregacao: async (Request: Request, Response: Response) => {


        try {

            //Verificando Token 

            const token = Request.header("Token");
            const verficar_token = VerificarToken(token);


            if(verficar_token.err){

                return Response.status(401).json({ err: verficar_token.err })

            }
            
            //Pegando os dados
            const { name, surname, age, cargo } = Request.body;


            //Criando membro no DB

            const create_membro = await membros_Data.create_membros_Congregacao(verficar_token.id_congregacao, name, surname, age, cargo);
            

            //Verificando erros

            if(create_membro.err){

                return Response.status(500).json(create_membro.err);
            }


            // Retornando Status

            return Response.status(500).json({ msg: "Membro cadastrado!" });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    },

    update_membro_congregacao: async (Request:Request, Response: Response) => {

        try {

            const token = Request.header("Token");
            const verifica_Token = VerificarToken(token);
            const user_ID_Congregacao = verifica_Token.id_congregacao;


            if(verifica_Token.err){

                return Response.status(401).json({ err: "Token Inválido" })
            } 
            

            const { id_membro } = Request.params;
            const { name, surname, age, cargo } = Request.body;


            const seacher_membro = await membros_Data.list_membros_ID(user_ID_Congregacao, id_membro)


            if(seacher_membro == ""){
                
                return Response.status(200).json({ err: "Membro não encontrada" });
            }

            
            const membro_ID = seacher_membro[0].id_membros;
            const update = await membros_Data.update_Membro_Congregacao(user_ID_Congregacao, membro_ID, name, surname, age, cargo);


            if(update <= 0){

                return Response.status(200).json({ err: "Ocorreu um erro, tente mais tarde" });
            } 

            
            return Response.status(200).json({ msg: "Membro Atualizado!" });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json(error);
        }

    },

    update_Info_Congregacao: async (Request: Request, Response: Response) => {

        try {
            
            //Verificando Token

            const token = Request.header("Token");
            const verifica_Token = VerificarToken(token);


            //Pegando as informações

            const id_congregacao = verifica_Token.id_congregacao;

            const { cep, rua, numero, bairro, cidade, estado, pais } = Request.body;


            //Update

            const update = await congregacao_Data.update_Info_Congregacao(id_congregacao, cep, rua, numero, bairro, cidade, estado, pais);

            if(update < -1) {

                return Response.status(500).json({ err: "Ocorreu um erro, tente mas tarde" })
            }

            return Response.status(200).json({ msg: "Alterado!" })

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    },

    delete_membro_congregacao: async (Request: Request, Response: Response) => {

        try {
            
            //Verificando Token 

            const token = Request.header("Token");
            const verficar_token = VerificarToken(token);


            if(verficar_token.err){

                return Response.status(401).json({ err: verficar_token.err })

            }

            //Pegando ID

            const { id } = Request.params;

            //Deletando no DB

            const delete_membro = await membros_Data.delete_membro_congregacao(verficar_token.id_congregacao, id);


            //Fazendo uma verificao

            if(delete_membro <= 0){

                return Response.status(401).json({ err : "ID membro não encontrado" });
            }

            //Retornando Status

            return Response.status(401).json({ msg : "Membro deletado!" })

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err : error });
        }
    } */
}