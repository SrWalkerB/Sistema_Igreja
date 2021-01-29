const Knex_Database = require("../Database/Infra/Knex_Config");



module.exports = {

    seacher_user: async (email) => {

        return await Knex_Database("tb_users").where("email", email);
    },

    create_user: async (name, surname, email, password_tratado, type, id_congregacao) => {

        const create_user_DB = await Knex_Database("tb_users").insert({

            name: name,
            surname: surname,
            email: email,
            password: password_tratado,
            type: type,
            id_congregacao: id_congregacao

        })

        if(create_user_DB <= 0){

            return { err: "Ocorreu um erro, tente mais tarde" };
        }

        return create_user_DB;

    },

    list_users: async () => {

        return await Knex_Database("tb_users")
    }
}

