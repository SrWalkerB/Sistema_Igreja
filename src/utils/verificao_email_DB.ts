const Knex_Database = require("../Database/Infra/Knex_Config");


export default {

    verifica_Email: async (email: string) => {

        const result = await Knex_Database("tb_users").where("email", email);

        if(result != "") true;

        return false;
    }
}
