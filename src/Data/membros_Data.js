const Knex_Database = require("../Database/Infra/Knex_Config")




module.exports = {


    list_membros_Congregacao: async (id_congregacao) => {

        return Knex_Database("tb_membros").where("id_congregacao", id_congregacao);
    },

    list_membros_ID: async (id_congregacao, id_membro) => {


        return Knex_Database("tb_membros")
        .where("id_congregacao", id_congregacao)
        .where("id_membros", id_membro);
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
    },

    update_Membro_Congregacao: async (id_congregacao, id_membro, name, surname, age, cargo) => {

        return Knex_Database("tb_membros")
        .where("id_congregacao", id_congregacao)
        .where("id_membros", id_membro)
        .update({

            name: name,
            surname: surname,
            age: age,
            cargo: cargo
        })
    },

    delete_membro_congregacao: async (id_congregacao, id_membro) => {

        return await Knex_Database("tb_membros")
        .where("id_congregacao", id_congregacao)
        .where("id_membros", id_membro)
        .delete();
        
    }
}