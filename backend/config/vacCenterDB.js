const mysql = require('mysql2');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'swpractice',
    password: 'Taenewtype_99',
    database: 'vaccenter'
});

module.exports = connection;