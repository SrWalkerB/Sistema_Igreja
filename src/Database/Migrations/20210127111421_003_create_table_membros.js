const Knex_Database = require("../Config/Knex_Config");


exports.up = function(knex) {
    
    return Knex_Database.schema.createTableIfNotExists("tb_membros", table => {

        table.increments("id_membros");

        table.string("name", 25).notNullable();
        table.string("surname", 50).notNullable();

        table.integer('age').notNullable();

        table.string("cargo", 20);
    })
};

exports.down = function(knex) {
  
    return Knex_Database.schema.dropTableIfExists("tb_membros")
};
