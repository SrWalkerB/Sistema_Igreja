import Knex_Database from "../Database/Infra/Knex_Config";


interface ICreateCongregacaoData{
    id: string,
    name: string,
    id_caixa: string,
    id_membros: string,
    id_info_congregacao: string,
}

interface ICreate_Info_Congregacao_Data{
    id_congregacao: string,
    cep: string,
    rua: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    pais: string
}

interface ICreate_Congregacao_DTO{
    congregacao: ICreateCongregacaoData,
    info_Congregacao: ICreate_Info_Congregacao_Data
}


class Congregacao_Data{

    async list_congregacoes_all(){

        return await Knex_Database("tb_congregacoes");
    }

    async seacher_congregacao_NAME(name: string){

        return await Knex_Database("tb_congregacoes")
        .where("name", name);
    }

    async seacher_congregacao_ID(id: string){

        return Knex_Database("tb_congregacoes")
        .where("id_congregacao", id)
    }

    async create_congregacao ({ congregacao, info_Congregacao }: ICreate_Congregacao_DTO){

        await Knex_Database("tb_congregacoes").insert({
            id_congregacao: congregacao.id,
            name: congregacao.name,
            id_caixa: congregacao.id_caixa,
            id_membros: congregacao.id_membros,
            id_info_congregacao: congregacao.id_info_congregacao
        }) 

        await Knex_Database("tb_info_congregacoes").insert({
            "id_congregacao": info_Congregacao.id_congregacao,
            "cep": info_Congregacao.cep,
            "rua": info_Congregacao.rua,
            "numero": info_Congregacao.numero,
            "bairro": info_Congregacao.bairro,
            "cidade": info_Congregacao.cidade,
            "estado": info_Congregacao.estado,
            "pais": info_Congregacao.pais
        });
    }

    async update_Info_Congregacao (id_congregacao, cep, rua, numero, bairro, cidade, estado, pais){

        return Knex_Database("tb_info_congregacoes")
        .where("id_congregacao", id_congregacao)
        .update({
            cep: cep,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            pais: pais
        })
    }

    async delete_Congregacao (id_congregacao: string){

        await Knex_Database('tb_congregacoes')
        .where("id_congregacao", id_congregacao)
        .delete();

        await Knex_Database("tb_caixa")
        .where("id_congregacao", id_congregacao)
        .delete();

        await Knex_Database("tb_info_congregacoes")
        .where("id_congregacao", id_congregacao)
        .delete();
        await Knex_Database("tb_membros")
        .where("id_congregacao", id_congregacao)
        .delete();

        await Knex_Database("tb_users")
        .where("id_congregacao", id_congregacao)
        .delete();
    }
}


export default new Congregacao_Data;
