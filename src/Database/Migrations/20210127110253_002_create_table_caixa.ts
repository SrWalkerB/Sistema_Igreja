import Knex_Database from "../Infra/Knex_Config";


export async function up(): Promise<void> {
    
    return Knex_Database.schema.createTableIfNotExists("tb_caixa", table => {

        table.string("id_congregacao").notNullable();
        table.string("id_lancamento").notNullable();

        table.decimal("dizimos");
        table.decimal("doacoes");
        table.decimal("ofertas");

        table.timestamp("data").defaultTo(Knex_Database.fn.now());
    })
};

export async function down(): Promise<void>  {
    return Knex_Database.schema.dropTableIfExists("tb_caixa");
};
