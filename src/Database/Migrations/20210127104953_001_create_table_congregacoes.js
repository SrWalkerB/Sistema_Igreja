const Knex_Database = require("../Infra/Knex_Config");


exports.up = function(knex) {
    
    return Knex_Database.schema.createTableIfNotExists("tb_congregacoes", table => {

        table.increments("id_congregacao").notNullable();

        table.string("name")

        table.integer("id_caixa");
        table.integer("id_membros");
        table.integer("id_info_congregacao");
    })
};

exports.down = function(knex) {
  return Knex_Database.schema.dropTableIfExists("tb_congregacoes");
};
