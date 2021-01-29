const Knex_Database = require("../Database/Infra/Knex_Config")




module.exports = {


    list_membros_Congregacao: async (id_congregacao) => {

        return Knex_Database("tb_membros").where("id_congregacao", id_congregacao);
    },

    create_membros_Congregacao: async (id_congregacao, name, surname, age, cargo) => {


        const create_membro = await Knex_Database("tb_membros").insert({

            id_congregacao: id_congregacao,
            name: name,
            surname: surname,
            age: age,
            cargo: cargo
        })


        if(create_membro <= 0){

            return { err : "Ocorreu um erro, tente mais tarde" };
        }


        return create_membro;
    }
}