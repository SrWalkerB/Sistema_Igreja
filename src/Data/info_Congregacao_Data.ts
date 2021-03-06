import Knex_Database from "../Database/Infra/Knex_Config";


interface IUpdate_Info_Congregacao{
    id_congregacao: string,
    cep: number,
    rua: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    pais: string
}


class Info_Congregacao_Data{

    seacher_Info_Congregacao_ID(id: string){
        return Knex_Database('tb_info_congregacoes')
        .where("id_congregacao", id);
    }

    async update_Info_Congregacao (data: IUpdate_Info_Congregacao){
        return Knex_Database("tb_info_congregacoes")
        .where("id_congregacao", data.id_congregacao)
        .update({
            cep: data.cep,
            rua: data.rua,
            numero: data.numero,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
            pais: data.pais
        })
    }
}


export default new Info_Congregacao_Data;