
const bcrypt = require("bcrypt");

async function Cryptografar_Password(password){

    const salt_Round = parseInt(process.env.SALT);

    return await bcrypt.hash(password, salt_Round);
}


module.exports = { Cryptografar_Password }