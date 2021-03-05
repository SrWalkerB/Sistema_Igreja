import Knex_Database from "../Infra/Knex_Config";

export async function up(): Promise<void>  {
    return Knex_Database.schema.createTableIfNotExists("tb_info_congregacoes", table => {

        table.string("id_congregacao").notNullable();
        table.integer("cep", 9).notNullable();
        table.string("rua").notNullable();
        table.string("numero", 20).notNullable();
        table.string("bairro", 30).notNullable();
        table.string("cidade", 20).notNullable();
        table.string("estado", 20).notNullable();
        table.string("pais", 20).notNullable();
    })
};

export async function down(): Promise<void>  {
    return Knex_Database.schema.dropTableIfExists("tb_info_congregacoes");
};
