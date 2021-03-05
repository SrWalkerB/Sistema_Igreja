import Knex_Database from "../Database/Infra/Knex_Config";

interface ICreateAccountData{
    id_user: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    type: string,
    id_congregacao: string
}


class UserData {
    
    async create_user(data: ICreateAccountData) {

        return await Knex_Database("tb_users").insert(data);
    }

    async list_users(){

        return await Knex_Database("tb_users")
    }
    
    async seacher_Mail_DB(email: string){

        return await Knex_Database('tb_users')
        .where("email", email);
    }
}


export default new UserData;