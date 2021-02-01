const Knex_Database = require("../Database/Infra/Knex_Config")


module.exports = {

    list_caixa: async (id_congregacao) => {

        return Knex_Database("tb_caixa").where("id_congregacao", id_congregacao);
    },

    create_Lancamento_Caixa: async (id_congregacao, dizimo, oferta, doacoes) => {

        return Knex_Database("tb_caixa").insert({

            id_congregacao: id_congregacao,
            dizimos: dizimo,
            ofertas: oferta,
            doacoes: doacoes
        })
    },

    delete_Lançamento_Caixa: async (id_congregacao, id_lancamento) => {

        return Knex_Database("tb_caixa")
        .where("id_congregacao", id_congregacao)
        .where("id_lancamento", id_lancamento).delete();
    }
}