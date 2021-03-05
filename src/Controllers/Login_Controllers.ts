import { Request, Response } from "express";
import loginService from "../services/loginService";
import userService from "../services/userService";
/* const { Cryptografar_Password, Verificar_Password } = require("../utils/crytografar_password");
const { GerarTokens } = require("../utils/gerarTokens"); */


export default {

    login_account: async (Request: Request, Response: Response) => {

        try {

            const { email, password } = Request.body;

            const result = await loginService.login_Service({
                email: email,
                password: password
            })

            if(result.err) return Response.status(404).json({ err: result.err });

            return Response.status(200).json({ msg: result.msg})
            
        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ msg: error })
        }
    },

    create_account: async (Request: Request, Response: Response) => {

        try {
            
            /* const { name, surname, email, password } = Request.body;


            const seacher = await Verificar_Email(email);

            if(seacher == true){

                return Response.status(200).json({ msg: "Conta já cadastrada" })
            } 


            const password_tratado = await Cryptografar_Password(password);

            const create_user = await user_Data.create_user(name, surname, email, password_tratado, "ADM", 0)


            if(create_user.err){

                return Response.status(500).json( create_user.err );
            }  */
 

            return Response.status(200).json({ msg: "Conta criada!" });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ msg: error });
        }
    }
}