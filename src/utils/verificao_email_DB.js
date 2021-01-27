const Knex_Database = require("../Database/Config/Knex_Config");


async function Verificar_Email(email){

    const result = await Knex_Database("tb_users").where("email", email);


    if(result != ""){

        return true;
    }
    
    return false
}


module.exports = { Verificar_Email }