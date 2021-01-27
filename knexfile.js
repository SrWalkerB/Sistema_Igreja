// Update with your config settings.
require("dotenv").config();


module.exports = {

  development: {
    client: process.env.CLIENT,
    connection: {
      database: process.env.DATABASE,
      user:     process.env.USERDATABASE,
      password: process.env.PASSWORD
    },

    migrations: {
      tableName: 'Migrations',
      directory: "./src/Database/migrations/"
    }
  }

};
