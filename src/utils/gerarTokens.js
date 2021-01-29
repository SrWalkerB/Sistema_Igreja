
const jwt = require("jsonwebtoken");


function GerarTokens(id, email, cargo, id_congregacao) {


    return jwt.sign({ id: id, email: email, cargo: cargo, id_congregacao: id_congregacao}, process.env.KEY, { expiresIn: "30m" })
}



function VerificarToken(token){

    const result = jwt.verify(token, process.env.KEY, (err, decoded) => {

        if(err){

            return { err : 'Token Invalido' };
        }

        return decoded;
    }); 


    return result;
}


module.exports = { 
    GerarTokens, 
    VerificarToken 
}