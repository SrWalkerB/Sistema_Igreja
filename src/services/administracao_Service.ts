import congregacaoService from "./congregacaoService";
import userService from "./userService";

interface ICreateUser{
    name_congregacao: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    type: string
}


class Adminstracao_Service{

    async create_User_Service(data: ICreateUser){

        const seacher_Congregacao = await congregacaoService.seacher_Congregacao_name_Service(data.name_congregacao);

        if(seacher_Congregacao.length == 0) return { err: "Congregação não encontrada" };

        const [{ id_congregacao }] = seacher_Congregacao;
        
       await userService.create_User_Service({
            id_congregacao: id_congregacao,
            name: data.name,
            email: data.email,
            password: data.password,
            surname: data.surname,
            type: data.type
        }); 

        return { msg: "User Create" }
    }
}

export default new Adminstracao_Service;