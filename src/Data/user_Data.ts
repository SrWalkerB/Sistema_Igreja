import Knex_Database from "../Database/Infra/Knex_Config";

class UserData {
    
    async create_user(name, surname, email, password_tratado, type, id_congregacao) {

        const create_user_DB = await Knex_Database("tb_users").insert({

            name: name,
            surname: surname,
            email: email,
            password: password_tratado,
            type: type,
            id_congregacao: id_congregacao

        })

        if(create_user_DB <= 0){

            return { err: "Ocorreu um erro, tente mais tarde" };
        }

        return create_user_DB;

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