const { VerificarToken } = require("../../utils/gerarTokens");



function Autorizacao(request, response, next){

    const token = request.header("Token");
    const result = VerificarToken(token);
    

    if(result.err){

        return response.status(401).send({ err: result.err });    
    }

    next();
    
}



module.exports = Autorizacao;