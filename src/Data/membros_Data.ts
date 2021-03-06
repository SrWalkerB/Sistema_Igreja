import Knex_Database from "../Database/Infra/Knex_Config";


class Membros_Data{

    async list_membros_Congregacao(id_congregacao: string){
        return Knex_Database("tb_membros")
        .where("id_congregacao", id_congregacao);
    }

    async list_membros_ID(id_congregacao: string, id_membro: string){
        return Knex_Database("tb_membros")
        .where("id_congregacao", id_congregacao)
        .where("id_membros", id_membro);
    }

    async create_membros_Congregacao (id_congregacao, name, surname, age, cargo){
        return await Knex_Database("tb_membros").insert({
            id_congregacao: id_congregacao,
            name: name,
            surname: surname,
            age: age,
            cargo: cargo
        })
    }

    async update_Membro_Congregacao (id_congregacao, id_membro, name, surname, age, cargo){
        return Knex_Database("tb_membros")
        .where("id_congregacao", id_congregacao)
        .where("id_membros", id_membro)
        .update({
            name: name,
            surname: surname,
            age: age,
            cargo: cargo
        })
    }

    async delete_membro_congregacao (id_congregacao, id_membro){
        return await Knex_Database("tb_membros")
        .where("id_congregacao", id_congregacao)
        .where("id_membros", id_membro)
        .delete();
        
    }
}


export default new Membros_Data;