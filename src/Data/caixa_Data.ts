import Knex_Database from "../Database/Infra/Knex_Config";

interface ICreateLancamento{
    id_lancamento: string,
    id_congregacao: string, 
    dizimos: number, 
    doacoes: number
    ofertas: number, 
}

class Caixa_Data{

    async list_caixa(id_congregacao: string){
        return Knex_Database("tb_caixa").
        where("id_congregacao", id_congregacao);
    }

    async seacher_Lancamento_Caxa(id_congregacao: string, id_lancamento: string){
        return Knex_Database("tb_caixa")
        .where("id_congregacao", id_congregacao)
        .where("id_lancamento", id_lancamento);
    }

    async create_Lancamento_Caixa(data: ICreateLancamento){
        return await Knex_Database("tb_caixa")
        .insert({
            id_congregacao: data.id_congregacao,
            id_lancamento: data.id_lancamento,
            dizimos: data.dizimos,
            doacoes: data.doacoes,
            ofertas: data.ofertas
        });
    }

    async delete_Lançamento_Caixa(id_congregacao: string, id_lancamento: string){
        return await Knex_Database("tb_caixa")
        .where("id_congregacao", id_congregacao)
        .where("id_lancamento", id_lancamento)
        .del();
    }
}

export default new Caixa_Data;