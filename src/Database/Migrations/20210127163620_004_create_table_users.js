const Knex_Database = require("../Config/Knex_Config");



exports.up = function(knex) {
 
    return Knex_Database.schema.createTableIfNotExists("tb_users", table => {

        table.increments('id_user').notNullable();

        table.string('name', 25).notNullable();
        table.string('surname', 50).notNullable();
        table.string('email').notNullable();
        table.string("password").notNullable();
        table.string("type", 20).notNullable();
        
        table.integer("id_congregacao");
    })
};

exports.down = function(knex) {
  
    return Knex_Database.schema.createTableIfNotExists('tb_users');
};
