const Knex_Database = require("../Database/Config/Knex_Config");
const { Cryptografar_Password, Verificar_Password } = require("../utils/crytografar_password");
const { Verificar_Email } = require("../utils/verificao_email_DB");


module.exports = {

    login_account: async (Request, Response) => {

        try {

            const { email_user, password_user } = Request.body;

            const seacher = Verificar_Email(email_user);

            if(seacher == false){

                return Response.status(200).json({ msg: "Conta não encontrada" })
            }

            const password_db = await Knex_Database("tb_users").where("email", email_user)[0];
            
            const result = Verificar_Password(password_user, password_db);


            return Response.status(200).json({ msg: result })

            
        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ msg: error })
        }
    },

    create_account: async (Request, Response) => {

        try {
            
            const { name, surname, email, password, type, id_congregacao } = Request.body;


            const seacher = await Verificar_Email(email);

            if(seacher == true){

                return Response.status(200).json({ msg: "Conta já cadastrada" })
            } 


            const password_tratado = await Cryptografar_Password(password);

            const create_user = await Knex_Database("tb_users").insert({

                name: name,
                surname: surname,
                email: email,
                password: password_tratado,
                type: type,
                id_congregacao: id_congregacao

            }).then(resp => {

                return resp;
            })

            if(create_user <= 0){

                return Response.status(500).json({ msg: "Ocorreu um erro na criação da conta, tente mais tarde" });
            } 
 

            return Response.status(200).json({ msg: "Conta criada!" });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ msg: error });
        }
    }
}