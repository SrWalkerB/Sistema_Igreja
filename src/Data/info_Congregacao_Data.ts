import Knex_Database from "../Database/Infra/Knex_Config";


class Info_Congregacao_Data{

    seacher_Info_Congregacao_ID(id: string){
        return Knex_Database('tb_info_congregacoes')
        .where("id_congregacao", id);
    }
}


export default new Info_Congregacao_Data;