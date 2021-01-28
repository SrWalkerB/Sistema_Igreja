const Knex_Database = require("../Config/Knex_Config");


exports.up = function(knex) {
    
    return Knex_Database.schema.createTableIfNotExists("tb_membros", table => {

        table.integer("id_congregacao").notNullable();
        table.increments("id_membros");

        table.string("name", 25);
        table.string("surname", 50);

        table.integer('age');

        table.string("cargo", 20);
    })
};

exports.down = function(knex) {
  
    return Knex_Database.schema.dropTableIfExists("tb_membros")
};
