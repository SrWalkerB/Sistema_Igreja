import bcrypt from "bcrypt";

interface ICryptografiaData {
    password: string,
    hash?: string
}

class Cryptografia{

    cryptografar_Password(data: ICryptografiaData){
        
        return bcrypt.hash(data.password, 12);
    }
    
    verificar_Password(data: ICryptografiaData){
    
        return bcrypt.compare(data.password, data.hash!);
    }

}

export default new Cryptografia;
