
const jwt = require("jsonwebtoken");


function GerarTokens(id, email, cargo) {


    return jwt.sign({ id: id, email: email, cargo: cargo}, process.env.KEY, { expiresIn: "30m" })
}



function VerificarToken(token){

    const result = jwt.verify(token, process.env.KEY, (err, decoded) => {

        if(err){

            return 'Token Invalido';
        }

        return decoded;
    }); 


    return result;
}


module.exports = { 
    GerarTokens, 
    VerificarToken 
}