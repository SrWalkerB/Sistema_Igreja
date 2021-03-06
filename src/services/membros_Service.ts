import membros_Data from "../Data/membros_Data";
import gerarTokens from "../utils/gerarTokens";

class Membros_Service {

    async list_Membros_Service (token: string) {

        const { id } = gerarTokens.verificarToken(token);

        const seacher_Membros = await membros_Data.list_membros_Congregacao(id);

        if(seacher_Membros.length == 0) return { msg: "Nenhum membro cadastrado" };

        return seacher_Membros;
    }
}

export default new Membros_Service;