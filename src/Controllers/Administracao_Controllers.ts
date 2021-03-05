import { Request, Response } from "express";
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

            //Verificando Permissoes

            const token = Request.header("Token");
            const decode = VerificarToken(token);
            const verificando_Permissao = Verificando_Permissao(decode);


            if(verificando_Permissao.err) {

                return Response.status(401).json({ err : verificando_Permissao.err});
            }
            

            const { name, surname, email, password, type, congregacao } = Request.body;


            //Verificando o email

            const verifica_mail = await Verificar_Email(email);


            if(verifica_mail == true){

                return Response.status(200).json({ msg: "Email já cadastrado" });
            }

            //Verificando Congregacao

            const verifica_congregacao = await congregacao_Data.list_congregacao_NAME(congregacao);


            if(verifica_congregacao == ""){

                return Response.status(200).json({ msg: "Congregacao não encontrada" });
            }

            //Criando hash Senha

            const password_tratado = await Cryptografar_Password(password);


            //ADD DB

            const id_congregacao = verifica_congregacao[0].id_congregacao;

            const create_user_DB = await user_Data.create_user(name, surname, email, password_tratado, type, id_congregacao);


            if(create_user_DB.err ){

                return Response.status(200).json( create_user_DB.err );
            }
            

            return Response.status(500).json({ msg: "Usuário criado" });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ msg: error });
        }
    },

    list_user: async (Request: Request, Response: Response) => {

        try {
            
            const token = Request.header("Token");
            const decode = VerificarToken(token);
            const verificando_Permissao = Verificando_Permissao(decode);


            if(verificando_Permissao.err) {


                return Response.status(401).json({ err : verificando_Permissao.err});
            }


            //Retornando dos dados

            const result = await user_Data.list_users();
        

            return Response.status(200).json(result);

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