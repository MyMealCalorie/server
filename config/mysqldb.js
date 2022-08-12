'use strict';

const mysql = require('mysql');
const mysqlConnection = {
    init: () => {
        return mysql.createConnection({
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            port: process.env.port,
            database: process.env.database,
        });
    },
    open: (connection) => {
        connection.connect((err) => {
            if(err) {
                console.error("Fail to conntect MySQL: ", err)
            }
            if(!err) {
                console.log("MySQL Connected!!");
            }
        });
    },
    close: (connection) => {
        connection.connect((err) => {
            if(err) {
                console.error("Fail to terminate MySQL: ", err);
            }
            if(!err) {
                console.log("MySQL terminated...");
            }
        });
    }
}

module.exports = mysqlConnection;