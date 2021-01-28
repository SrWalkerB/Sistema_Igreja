
const jwt = require("jsonwebtoken");


function GerarTokens(id, email) {


    return jwt.sign({ id: id, email: email}, process.env.KEY, { expiresIn: "30m" })
}




function VerificarToken(token){

    const result = jwt.verify(token, process.env.KEY, (err, decoded) => {

        if(err){

            return 'Token Invalido';
        }

    }); 
    

    return result;
}


module.exports = { 
    GerarTokens, 
    VerificarToken 
}