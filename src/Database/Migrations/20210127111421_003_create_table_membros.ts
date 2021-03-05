import Knex_Database from "../Infra/Knex_Config";


export async function up():Promise<void> {
    
    return Knex_Database.schema.createTableIfNotExists("tb_membros", table => {

        table.string("id_congregacao").notNullable();
        table.string("id_membros");

        table.string("name", 25).notNullable();
        table.string("surname", 50).notNullable();

        table.integer('age').notNullable();
        table.string("cargo", 20).notNullable();
    })
};

export async function down(): Promise<void>  {
    return Knex_Database.schema.dropTableIfExists("tb_membros")
};
