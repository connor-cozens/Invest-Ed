module.exports = {
  //Express app port
  port: process.env.PORT,
  //Database access
  db_host: process.env.DB_HOST_NAME,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  //Databases
  db_accounts: process.env.DB_ACCOUNTS,
  db_girlsed_main: process.env.DB_GIRLSED_MAIN,
  db_girlsed_temp: process.env.DB_GIRLSED_TEMP
};
