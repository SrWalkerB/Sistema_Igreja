import Knex_Database from "../Database/Infra/Knex_Config";


interface ICreateMembros{
    id_congregacao: string,
    id_membros: string,
    name: string,
    surname: string,
    age: number,
    cargo: string
}

interface IUpdateMebro{
    id_congregacao: string,
    id_membro: string,
    name?: string,
    surname?: string,
    age?: number,
    cargo?: string
}


class Membros_Data{

    async list_membros_Congregacao(id_congregacao: string){
        return Knex_Database("tb_membros")
        .where("id_congregacao", id_congregacao);
    }

    async seacher_Membro_ID(id_congregacao: string, id_membro: string){
        return await Knex_Database("tb_membros")
        .where("id_congregacao", id_congregacao)
        .where("id_membros", id_membro);
    }

    async create_membros_Congregacao (data: ICreateMembros){
        return await Knex_Database("tb_membros").insert(data);
    }

    async update_Membro_Congregacao (data: IUpdateMebro){
        return Knex_Database("tb_membros")
        .where("id_congregacao", data.id_congregacao)
        .where("id_membros", data.id_membro)
        .update({
            name: data.name,
            surname: data.surname,
            age: data.age,
            cargo: data.cargo
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