const mysql = require("mysql");

const {mysqlHost, mysqlPort, mysqlUser, mysqlPassword, mysqlDatabase} =  process.env
const config = { 
    port:mysqlPort,
    host:mysqlHost,
    user:mysqlUser,
    password:mysqlPassword,
    database:mysqlDatabase,
    connectionLimit:10
}

const pool = mysql.createPool(config);

module.exports = pool;