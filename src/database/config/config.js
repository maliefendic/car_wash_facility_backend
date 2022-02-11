require("dotenv").config();
module.exports ={
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT
  },
  heroku: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    port : process.env.DATABASE_PORT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  herokul: {
    username: process.env.DATABASE_USERNAMEH,
    password: process.env.DATABASE_PASSWORDH,
    database: process.env.DATABASE_NAMEH,
    host: process.env.DATABASE_HOSTH,
    dialect: process.env.DATABASE_DIALECTH,
    port : process.env.DATABASE_PORTh,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
