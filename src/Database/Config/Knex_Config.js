const knexfile = require("../../../knexfile");

const Knex_Database = require("knex")(knexfile['development']);



module.exports = Knex_Database;