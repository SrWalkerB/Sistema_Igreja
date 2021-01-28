const Knex_Database = require("../Database/Config/Knex_Config");
const { Cryptografar_Password } = require("../utils/crytografar_password");
const { Verificar_Email } = require("../utils/verificao_email_DB");


module.exports = {

    list_congregacoes: async (Request, Response) => {

        try {
            
            const congregacoes = await Knex_Database("tb_congregacoes")

            /* .join("tb_caixa")
            .join("tb_membros") */
            
            if(congregacoes <= 0){

                return Response.status(200).json({ msg: "Nenhuma Congregação cadastrada" })
            }

            return Response.status(200).json(congregacoes)

        } catch (error) {
            
            console.log(error);
            return Response.status(200).json({ msg: error });
        }
    },

    create_congregacoes: async (Request, Response) => {

        try {

            const { name } = Request.body;

            //Verificando se já existe cadastro
            
            const seacher = await Knex_Database("tb_congregacoes").where("name", name);

            if(seacher != ""){

                return Response.status(201).json({ msg: "Congregação já cadastrada" });
            }


            //Criando as tabelas e as ligações

            const create_congregacao = await Knex_Database("tb_congregacoes").insert({

                name: name
            })
            


            const insert_dados_padrao = await Knex_Database("tb_congregacoes")
            .where("name", name)
            .update({

                id_caixa: create_congregacao,
                id_membros: create_congregacao,
                id_info_congregacao: create_congregacao
            })

            

            //Verificando Se ocorreu um erro

            if( (create_congregacao || insert_dados_padrao) <= 0){

                return Response.status(201).json({ msg: "Ocorreu um erro, tente mais tarde" });
            }


            //Finalizando o cadastro

            return Response.status(201).json({ msg: "Create" });

        } catch (error) {
            
            console.log(error);
            return Response.status(200).json({ msg: error });
        }
    },

    create_user: async (Request, Response) => {

        try {
            
            const { name, surname, email, password, type, congregacao } = Request.body;


            //Verificando o email

            const verifica_mail = await Verificar_Email(email);

            if(verifica_mail == true){

                return Response.status(200).json({ msg: "Email já cadastrado" });
            }

            //Verificando Congregacao

            const verifica_congregacao = await Knex_Database("tb_congregacoes").where("name", congregacao);

            if(verifica_congregacao == ""){

                return Response.status(200).json({ msg: "Congregacao não encontrada" });
            }

            //Criando hash Senha

            const password_tratado = await Cryptografar_Password(password);

            //ADD DB

            const id_congregacao = verifica_congregacao[0].id_congregacao;

            const create_user_DB = await Knex_Database("tb_users").insert({

                name: name,
                surname: surname,
                email: email,
                password: password_tratado,
                type: type,
                id_congregacao: id_congregacao

            }) 


            if(create_user_DB <= 0){

                return Response.status(200).json({ msg: "Ocorreu um erro, tente mais tarde" });
            }
            

            return Response.status(500).json({ msg: "Usuário criado" });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ msg: error });
        }
    }
}