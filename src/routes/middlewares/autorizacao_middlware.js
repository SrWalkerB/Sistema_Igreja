const { VerificarToken } = require("../../utils/gerarTokens");



function Autorizacao(request, response, next){

    const token = request.header("Token");
    const result = VerificarToken(token);
    

    if(result == "Token Invalido"){

        return response.status(401).send({ msg: result });    
    }

    next();
    
}



module.exports = Autorizacao;