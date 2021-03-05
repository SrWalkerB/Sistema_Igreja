import { v4 as uuidv4 } from "uuid";
import congregacao_Data from "../Data/congregacao_Data";
import info_Congregacao_Data from "../Data/info_Congregacao_Data";


interface ICreate_Info_Congregacao{
    name: string
    cep: string,
    rua: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
}

class Congregacao_Service{

    async list_All_Congregacoes_Service(){
        
        const result = await congregacao_Data.list_congregacoes_all();

        if(result.length == 0) return { msg: "Nenhuma congregacao cadastrada"};

        return { msg: result };
    }

    async create_Congregacao_Service(congregacao: ICreate_Info_Congregacao){

        const seacher_Name = await congregacao_Data.seacher_congregacao_NAME(congregacao.name);

        if(seacher_Name.length != 0) return {err: "Congregacao já cadastrada"};

        const id = uuidv4();
        const id_caixa = uuidv4();
        const id_info_congregacao = uuidv4();
        const id_membro = uuidv4();

      await congregacao_Data.create_congregacao({
            congregacao: {
                name: congregacao.name,
                id: id,
                id_caixa: id_caixa,
                id_info_congregacao: id_info_congregacao,
                id_membros: id_membro
            },
            info_Congregacao: {
                id_congregacao: id,
                cep: congregacao.cep,
                rua: congregacao.rua,
                numero: congregacao.numero,
                bairro: congregacao.bairro,
                cidade: congregacao.cidade,
                estado: congregacao.estado,
                pais: "Brasil"
            }
        })  
    }

    async seacher_Congregacao_name_Service(name: string){

        return await congregacao_Data.seacher_congregacao_NAME(name);
    }

    async seacher_Congregacao_ID_Service(id: string){

        const data = {
            congregacao: await congregacao_Data.seacher_congregacao_ID(id),
            info_Congregacao: await info_Congregacao_Data.seacher_Info_Congregacao_ID(id)
        }

        return data;
    }

    async delete_Congregacao_Service(id_congregacao: string){

        const seacher_Congregacao = await congregacao_Data.seacher_congregacao_ID(id_congregacao);
        
        if(seacher_Congregacao.length == 0) return { err : "Congregação não encontrada" };

        await congregacao_Data.delete_Congregacao(id_congregacao);

        return { msg: "Congregacao deletada" };
    }
}

export default new Congregacao_Service;

