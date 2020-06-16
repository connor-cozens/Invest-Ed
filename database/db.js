const Sequelize = require("sequelize")
const db = {}
//Change database name "users" to the mysql database you're testing with
const sequelize = new Sequelize("accounts", "root", "password", {
    host: 'localhost',
    dialect: 'mysql',
    operatorAliases: false,

    pool: {
        max: 15,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established to accounts database successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the accounts database:', err);
  });

module.exports = db
