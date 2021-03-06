import user_Data from "../Data/user_Data";
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
        
       const user = await userService.create_User_Service({
            id_congregacao: id_congregacao,
            name: data.name,
            email: data.email,
            password: data.password,
            surname: data.surname,
            type: data.type
        }); 

        if(user?.err) return { err: user.err };

        return { msg: "User Create" }
    }

    async list_User_Service(){
        
        const userList = await user_Data.list_users();

        if(userList.length == 0) return { msg: "Nenhum usuário cadastrado" };

        return { msg: userList };
    }
}

export default new Adminstracao_Service;