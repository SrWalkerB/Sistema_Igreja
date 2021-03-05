import Knex_Database from "../Infra/Knex_Config";

export async function up(): Promise<void>{
    
    return Knex_Database.schema.createTableIfNotExists("tb_congregacoes", table => {

        table.string("id_congregacao").notNullable();
        table.string("name").notNullable();
        table.string("id_caixa").notNullable();
        table.string("id_membros").notNullable();
        table.string("id_info_congregacao").notNullable();
    })
};

export async function down(): Promise<void> {
  return Knex_Database.schema.dropTableIfExists("tb_congregacoes");
};
