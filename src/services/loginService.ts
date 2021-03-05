import user_Data from "../Data/user_Data";
import crytografar_password from "../utils/crytografar_password";
import userService from "./userService";

interface ILogin {
    
    email: string,
    password: string
}

class Login_Service {

   async login_Service(data: ILogin){

        //Verificando email
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

        
         //Criando Token de Acesso
        /*
         const token = GerarTokens(id_user, email_user, cargo, id_congregacao);


         //Enviando Resposta e Token

         Response.header("Token", token); */
        return { msg: "Login realizado com Sucesso" };
    }

}

export default new Login_Service;