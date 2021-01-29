const Knex_Database = require("../Infra/Knex_Config");


exports.up = function(knex) {
    
    return Knex_Database.schema.createTableIfNotExists("tb_caixa", table => {

        table.integer("id_congregacao").notNullable();

        table.decimal("dizimos");
        table.decimal("doacoes");
        table.decimal("ofertas");

        table.integer("id_contas_a_pagar");
        table.integer("id_contas_pagas");

        table.timestamp("data").defaultTo(Knex_Database.fn.now());
    })
};

exports.down = function(knex) {
  
    return Knex_Database.schema.dropTableIfExists("tb_caixa");
};
