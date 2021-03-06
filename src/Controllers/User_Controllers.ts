import { Request, Response } from "express";
import congregacaoService from "../services/congregacaoService";
import membros_Service from "../services/membros_Service";
import userService from "../services/userService";


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
    },

    list_membros_congregacao: async (Request: Request, Response: Response) => {

        try {
            
            const token = Request.header("Token");

            const seacher_membros = await membros_Service.list_Membros_Service(token!);

            return Response.status(200).json(seacher_membros.msg);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    },

    create_membro_congregacao: async (Request: Request, Response: Response) => {
        try {

            const token = Request.header("Token");
            const { name, surname, age, cargo } = Request.body;

            const create_membro = await membros_Service.create_Membros_Service({
                name: name,
                surname: surname,
                age: age,
                cargo: cargo
            }, token!)

            return Response.status(201).json({ msg: create_membro.msg });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    },

    update_membro_congregacao: async (Request:Request, Response: Response) => {

        try {

            const token = Request.header("Token");

            const { id } = Request.params;
            const { name, surname, age, cargo } = Request.body;

            const result = await membros_Service.update_Membro_Service({
                id_user: id,
                name: name,
                surname: surname,
                age: age,
                cargo: cargo
            }, token!);
            
            if(result?.err) return Response.status(404).json({ err: result.err })

            return Response.status(200).json({ msg: "Membro Atualizado!" });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json(error);
        }

    },

    update_Info_Congregacao: async (Request: Request, Response: Response) => {

        try {
            
            const token = Request.header("Token");
            const { cep, rua, numero, bairro, cidade, estado, pais } = Request.body;

            const update = await congregacaoService.update_Info_Congregacao_Service({
                rua: rua,
                bairro: bairro,
                cep: cep,
                cidade: cidade,
                estado: estado,
                numero: numero,
                pais: pais
            }, token!);

            return Response.status(200).json({ msg: update.msg });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    },
    /*

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