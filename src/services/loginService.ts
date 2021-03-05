import user_Data from "../Data/user_Data";
import crytografar_password from "../utils/crytografar_password";
import gerarTokens from "../utils/gerarTokens";
import userService from "./userService";

interface ILogin {
    email: string,
    password: string
}

interface ICreateAccount{
    name: string,
    surname: string,
    email: string,
    password: string
}

class Login_Service {

    async login_Service(data: ILogin){

        const seacher_mail = await userService.seacher_Mail_Service(data.email);

        if(seacher_mail == "0") return { err: "Accont not Found"};

        const [{
            id_user, 
            email, 
            password: password_hash,
            type,
            id_congregacao
        }] = seacher_mail;
         
        const verificar_Password = await crytografar_password.verificar_Password({
            password: data.password,
            hash: password_hash
        })

        if(!verificar_Password) return { err: "Account not Found" };
        
         const token = gerarTokens.gerarTokens({
            id: id_user,
            cargo: type,
            id_congregacao: id_congregacao,
            email: email
         })


        return { msg: token};
    }

    async create_Account_Service(data: ICreateAccount){

        const seacher = await userService.seacher_Mail_Service(data.email);

        if(seacher != "0") return { err: "Conta já cadastrada" };

        const password_tratado = await crytografar_password.cryptografar_Password({password: data.password});

        await userService.create_User_Service_ADM({
            id_congregacao: "0",
            surname: data.surname,
            name: data.name,
            email: data.email,
            password: password_tratado,
            type: "ADM"
        }) 
       
        return { msg: "Create Account" }; 
    }
}

export default new Login_Service;