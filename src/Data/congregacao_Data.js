const Knex_Database = require("../Database/Infra/Knex_Config")


module.exports = {


    list_congregacoes_all: async () => {

        return await Knex_Database("tb_congregacoes");
    },

    list_user_congregacao: async () => {

        return await Knex_Database("tb_users")
    },

    list_congregacao: async (name) => {

        return await Knex_Database("tb_congregacoes").where("name", name);
    },

    create_congregacao: async (name) => {

        const result_ID = await Knex_Database("tb_congregacoes").insert({

            name: name
        })

        const insert_dados_padrao = await Knex_Database("tb_congregacoes")
        .where("name", name)
        .update({

            id_caixa: result_ID,
            id_membros: result_ID,
            id_info_congregacao: result_ID
        })

        if( (result_ID || insert_dados_padrao) <= 0){

            return { err: "Ocorreu um erro, tente mais tarde" }
        }


        return result_ID;
    }
}