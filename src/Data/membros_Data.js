const Knex_Database = require("../Database/Infra/Knex_Config")




module.exports = {


    list_membros_Congregacao: async (id_congregacao) => {

        return Knex_Database("tb_membros").where("id_congregacao", id_congregacao);
    }
}