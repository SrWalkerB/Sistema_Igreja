const Knex_Database = require("../Infra/Knex_Config");


exports.up = function(knex) {
    
    return Knex_Database.schema.createTableIfNotExists("tb_membros", table => {

        table.integer("id_congregacao").notNullable();
        table.increments("id_membros");

        table.string("name", 25).notNullable();
        table.string("surname", 50).notNullable();

        table.integer('age').notNullable();

        table.string("cargo", 20).notNullable();
    })
};

exports.down = function(knex) {
  
    return Knex_Database.schema.dropTableIfExists("tb_membros")
};
