import { v4 as uuidv4 } from "uuid";
import user_Data from "../Data/user_Data";
import crytografar_password from "../utils/crytografar_password";

interface ICreateAccount{
    id_congregacao: string
    name: string,
    surname: string,
    email: string,
    password: string,
    type: string,
}


class User_Service {

    async seacher_Mail_Service(email: string){

        const result = await user_Data.seacher_Mail_DB(email);

        if(result.length == 0) return "0"

        return result;
    }

    async create_User_Service_ADM(data: ICreateAccount){

        const id = uuidv4();

       return await user_Data.create_user({
            id_user: id,
            id_congregacao: data.id_congregacao,
            name: data.name,
            surname: data.surname,
            email: data.email,
            password: data.password,
            type: data.type
        })
    }

    async create_User_Service(data: ICreateAccount){

        const seacher_Mail = await this.seacher_Mail_Service(data.email);

        if(seacher_Mail != "0") return { err : "Email já cadastrado" };

        const id = uuidv4();
        const password_hash = await crytografar_password.cryptografar_Password({password: data.password});

        await user_Data.create_user({
            id_user: id,
            id_congregacao: data.id_congregacao,
            email: data.email,
            name: data.name,
            password: password_hash,
            surname: data.surname,
            type: data.type
        })
    }
}

export default new User_Service;