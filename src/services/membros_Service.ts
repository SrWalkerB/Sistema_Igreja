import { v4 as uuidv4 } from "uuid";
import membros_Data from "../Data/membros_Data";
import gerarTokens from "../utils/gerarTokens";


interface ICreateMembro{
    name: string,
    surname: string,
    age: number,
    cargo: string
}

interface IUpdateMembro{
    id_user: string,
    name?: string,
    surname?: string,
    age?: number,
    cargo?: string
}


class Membros_Service {

    async list_Membros_Service(token: string) {

        const { id_congregacao } = gerarTokens.verificarToken(token);
        const seacher_Membros = await membros_Data.list_membros_Congregacao(id_congregacao);

        if(seacher_Membros.length == 0) return { msg: "Nenhum membro cadastrado" };

        return { msg: seacher_Membros };
    }

    async create_Membros_Service(data: ICreateMembro, token: string){

        const { id_congregacao } = gerarTokens.verificarToken(token);
        const id = uuidv4();

        await membros_Data.create_membros_Congregacao({
            id_congregacao: id_congregacao,
            id_membros: id,
            name: data.name,
            surname: data.surname,
            age: data.age,
            cargo: data.cargo
        })

        return { msg: "Membro cadastrado!" };
    }

    async update_Membro_Service(data: IUpdateMembro, token: string){

        const { id_congregacao } = gerarTokens.verificarToken(token);
        const seacher_Membro = await membros_Data.seacher_Membro_ID(id_congregacao, data.id_user);

        if(seacher_Membro.length == 0) return { err : "Membro not found" }

        await membros_Data.update_Membro_Congregacao({
            id_congregacao: id_congregacao,
            id_membro: data.id_user,
            name: data.name,
            surname: data.surname,
            age: data.age,
            cargo: data.cargo
        }) 
    }
}

export default new Membros_Service;