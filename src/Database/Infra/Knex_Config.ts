import knex from "knex";
import knexfile from "../../../knexfile";



const Knex_Database = knex(knexfile['development']);




export default Knex_Database;