var mysql = require('mysql');

var Pool = mysql.createPool({
    connectionLimit: 25,
    user: "eventertim",
    password: "event123",
    database: "event_db",
    host: "localhost",
    port: 3306
});

module.exports = Pool;