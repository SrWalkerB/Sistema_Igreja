const user_Data = require("../Data/user_Data");
const Knex_Database = require("../Database/Infra/Knex_Config");
const { Cryptografar_Password, Verificar_Password } = require("../utils/crytografar_password");
const { GerarTokens } = require("../utils/gerarTokens");
const { Verificar_Email } = require("../utils/verificao_email_DB");


module.exports = {

    login_account: async (Request, Response) => {

        try {

            const { email_user, password_user } = Request.body;

            //Verificando email
            const seacher = Verificar_Email(email_user);


            if(seacher == false){

                return Response.status(200).json({ msg: "Conta não encontrada" })
            }

            //Pegando os dados da conta no DB 
            const get_dados = await user_Data.seacher_user(email_user);
            const password_db = get_dados[0].password;


            //Verificando a senha

            const result = await Verificar_Password(password_user, password_db);


            if(result == false){

                return Response.status(200).json({ msg: "Conta não encontrada" })
            }

            //Retornando o resultado

            const id_user = get_dados[0].id_user;
            const cargo = get_dados[0].type;
            
            
            //Criando Token de Acesso

            const token = GerarTokens(id_user, email_user, cargo);


            //Enviando Resposta e Token

            Response.header("Token", token);
            return Response.status(200).json({ msg: "Login realizado com Sucesso" })

            
        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ msg: error })
        }
    },

    create_account: async (Request, Response) => {

        try {
            
            const { name, surname, email, password } = Request.body;


            const seacher = await Verificar_Email(email);

            if(seacher == true){

                return Response.status(200).json({ msg: "Conta já cadastrada" })
            } 


            const password_tratado = await Cryptografar_Password(password);

            const create_user = await user_Data.create_user(name, surname, email, password_tratado, "ADM", 0)


            if(create_user.err){

                return Response.status(500).json( create_user.err );
            } 
 

            return Response.status(200).json({ msg: "Conta criada!" });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ msg: error });
        }
    }
}