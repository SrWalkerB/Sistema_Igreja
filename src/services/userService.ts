import user_Data from "../Data/user_Data";

interface ICreateAccount{
    name: string,
    surname: string,
    email: string,
    password: string,
    type: string,
    id_congregacao: string
}


class User_Service {

    async seacher_Mail_Service(email: string){

        const result = await user_Data.seacher_Mail_DB(email);

        if(result.length == 0) return "0"

        return result;
    }

    async create_User_Service(data: ICreateAccount){

       return await user_Data.create_user({
            id_congregacao: data.id_congregacao,
            name: data.name,
            surname: data.surname,
            email: data.email,
            password: data.password,
            type: data.type
        })
    }
}

export default new User_Service;