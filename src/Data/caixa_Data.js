const Knex_Database = require("../Database/Infra/Knex_Config")


module.exports = {

    list_caixa: async (id_congregacao) => {

        return Knex_Database("tb_caixa").where("id_congregacao", id_congregacao);
    }
}