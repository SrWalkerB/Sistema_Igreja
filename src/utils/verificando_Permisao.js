


function Verificando_Permissao(decode, Request, Response){

    if(decode.cargo == "user"){

        return {err : "Você não tem permissão para acessar essa rota"};
    }
    
    return { msg : "" };
}


module.exports = { Verificando_Permissao };