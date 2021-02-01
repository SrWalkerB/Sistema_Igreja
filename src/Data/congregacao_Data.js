const Knex_Database = require("../Database/Infra/Knex_Config")


module.exports = {


    list_congregacoes_all: async () => {

        return await Knex_Database("tb_congregacoes");
    },

    list_congregacao_NAME: async (name) => {

        return await Knex_Database("tb_congregacoes").where("name", name);
    },

    list_congregacao_ID: async (id) => {

        return Knex_Database("tb_congregacoes").where("id_congregacao", id);
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

        const insert_address_padrao = await Knex_Database("tb_info_congregacoes").insert({
    
            id_congregacao: result_ID,
            cep: 00000,
            rua: "",
            numero: "",
            bairro: "",
            cidade: "",
            estado: "",
            pais: "Brasil"
        })

        if( (result_ID || insert_dados_padrao || insert_address_padrao) < -1){

            return { err: "Ocorreu um erro, tente mais tarde" }
        }


        return result_ID;
    },

    delete_Congregacao: async (id_congregacao) => {

        const del_congregacao = await Knex_Database('tb_congregacoes').where("id_congregacao", id_congregacao).delete();
        const del_caixa = await Knex_Database("tb_caixa").where("id_congregacao", id_congregacao).delete();
        const del_info_Congregacao = await Knex_Database("tb_info_congregacoes").where("id_congregacao", id_congregacao).delete();
        const del_membros = await Knex_Database("tb_membros").where("id_congregacao", id_congregacao).delete();
        const del_users = await Knex_Database("tb_users").where("id_congregacao", id_congregacao).delete();


        if( (del_congregacao, del_caixa, del_info_Congregacao, del_membros, del_users) <= 0 ){

            return { err: "Ocorreu um erro, Tente mais tarde" }
        }

        return { msg: "Congregacao Deletada!" }
    }
}