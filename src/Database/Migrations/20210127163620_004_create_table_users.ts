import Knex_Database from "../Infra/Knex_Config";


export async function up(): Promise<void> {
 
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

export async function down():Promise<void>{
    return Knex_Database.schema.dropTableIfExists('tb_users');
};
