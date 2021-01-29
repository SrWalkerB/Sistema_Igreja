


function Verificando_Permissao(decode, Request, Response){

    if(decode.cargo == "user"){

        return {type : decode.cargo, err : "Você não tem permissão para acessar essa rota"};
    }
    
    return "";
}


module.exports = { Verificando_Permissao };