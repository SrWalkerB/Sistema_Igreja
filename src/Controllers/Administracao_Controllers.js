const congregacao_Data = require("../Data/congregacao_Data");
const user_Data = require("../Data/user_Data");
const Knex_Database = require("../Database/Infra/Knex_Config");
const { Cryptografar_Password } = require("../utils/crytografar_password");
const { VerificarToken } = require("../utils/gerarTokens");
const { Verificando_Permissao } = require("../utils/verificando_Permisao");
const { Verificar_Email } = require("../utils/verificao_email_DB");



module.exports = {

    list_congregacoes: async (Request, Response) => {

        try {

            //Verificando permissoes

            const token = Request.header("Token");
            const decode = VerificarToken(token);
            const verificando_Permissao = Verificando_Permissao(decode);
            

            if(verificando_Permissao.err){

                return Response.status(200).json(verificando_Permissao);
            }


            //Retornando dados
            const congregacoes = await congregacao_Data.list_congregacoes_all();
            
            
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

            //Pegando os dados

            const { name } = Request.body;
        

            //Verificando se já existe cadastro
            
            const seacher = await congregacao_Data.list_congregacao(name);


            if(seacher != ""){

                return Response.status(201).json({ msg: "Congregação já cadastrada" });
            }


            //Criando as tabelas e as ligações

            const create_congregacao = await congregacao_Data.create_congregacao(name);
            
            
            if(create_congregacao.err){

                return Response.status(500).json(create_congregacao.err);
            }


            //Finalizando o cadastro

            return Response.status(201).json({ msg: "Congregacao Criada" });

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

            const verifica_congregacao = await congregacao_Data.list_congregacao(congregacao);


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

    list_user: async (Request, Response) => {

        try {
            
            const result = await congregacao_Data.list_user_congregacao();
        

            return Response.status(200).json(result);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ msg: error });
        }
    }
}