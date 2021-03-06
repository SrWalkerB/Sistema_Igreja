import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import caixa_Data from "../Data/caixa_Data";
import gerarTokens from "../utils/gerarTokens";

interface ICreateLancamento{
    dizimos: number,
    doacoes: number,
    ofertas: number
}

class Caixa_Service {

    async list_Caixa(token: string){

        const { id_congregacao } = gerarTokens.verificarToken(token);

        const caixa = await caixa_Data.list_caixa(id_congregacao);
        let data = new Array;

        caixa.map((result: any) => {

            moment.locale("pt-br");

            const data_formtada = moment(result.data).format("LL")

            return data.push({
                id_lancamento: result.id_lancamento, 
                dizimos: result.dizimos,
                doacoes: result.doacoes,
                ofertas: result.ofertas,
                data: data_formtada
            })
        })
        
        if(caixa.length == 0) return { msg: "Nenhuma informação lançada!" }

        return { msg: data }
    }

    async create_Lancamento_Caixa(data: ICreateLancamento, token: string){

        const { id_congregacao } = gerarTokens.verificarToken(token);
        const id_lancamento = uuidv4();

        await caixa_Data.create_Lancamento_Caixa({
            id_congregacao: id_congregacao,
            id_lancamento: id_lancamento,
            dizimos: data.dizimos,
            doacoes: data.doacoes,
            ofertas: data.ofertas
        })

        return { msg: "Informações lançadas!" };
    }

    async delete_Lancamento_Caixa(id_lancamento: string, token: string){

        const { id_congregacao } = gerarTokens.verificarToken(token);
        const seacher_Lancamento = await caixa_Data.seacher_Lancamento_Caxa(id_congregacao, id_lancamento);

        if(seacher_Lancamento.length == 0) return { err: "Nenhum lançamento encontrado!" };

        await caixa_Data.delete_Lançamento_Caixa(id_congregacao, id_lancamento);

        return { msg: "Lançamento deletado!" };
    }
}

export default new Caixa_Service;