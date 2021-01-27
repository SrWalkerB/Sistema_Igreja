
const bcrypt = require("bcrypt");



async function Cryptografar_Password(password){

    const salt_Round = parseInt(process.env.SALT);

    return await bcrypt.hash(password, salt_Round);
}


async function Verificar_Password(password, hash){

    return bcrypt.compare(password, hash);
}


module.exports = { 

    Cryptografar_Password, 
    Verificar_Password 
}