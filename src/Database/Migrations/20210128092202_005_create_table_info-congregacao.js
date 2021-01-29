const Knex_Database = require("../Infra/Knex_Config");




exports.up = function(knex) {

    return Knex_Database.schema.createTableIfNotExists("tb_info-congregacoes", table => {

        table.integer("id_congregacao");

        table.integer("cep", 9);
        table.string("rua");
        table.string("numero", 20);
        table.string("bairro", 30);
        table.string("cidade", 20);
        table.string("estado", 20);
        table.string("pais", 20);
    })
};

exports.down = function(knex) {
  
    return Knex_Database.schema.dropTableIfExists("tb_info-congregacoes");
};
