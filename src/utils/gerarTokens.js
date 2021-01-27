
const jwt = require("jsonwebtoken");


function GerarTokens(id, email) {

    return jwt.sign({ id: id, email: email}, process.env.KEY, { expiresIn: "30m" })
}



module.exports = { GerarTokens }