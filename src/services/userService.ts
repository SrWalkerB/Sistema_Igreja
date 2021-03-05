import user_Data from "../Data/user_Data";


class User_Service {

    async seacher_Mail_Service(email: string){

        const result = await user_Data.seacher_Mail_DB(email);

        if(result.length == 0) return "0"

        return result;
    }
}

export default new User_Service;