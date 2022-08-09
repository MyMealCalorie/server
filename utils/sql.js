'use strict';

const mysqlConnObj = require('../config/mysqldb');
const db = mysqlConnObj.init();
mysqlConnObj.open(db);

const mySql = {
    // insertPost
    insertUser: async(...params) => {
        return new Promise((resolve, reject) => {
            const sql = `insert into user(email, password, name, created_at) values(?, ?, ?, now())`;
            const result = db.query(sql, params, (err, row) => {
                if(err) {
                    reject(err);
                }
                if(!err) {
                    const _id = row.insertUser;
                    resolve(_id);
                }
            })
            const queryLog = result.sql;
            console.log("query: ", queryLog);
        })
    },

    lookUp: async(table, values, lookUpValue, ...params) => {
        return new Promise((resolve, reject) => {
            const sql = `select ${params} from ${table} where ${lookUpValue} = ?`;
            let reponseData = {};
            const result = db.query(sql, [values], (err, rows) =>{
                if(err) {
                    reponseData.result = err;
                    reject(reponseData);
                }
                if(!err) {
                    reponseData = rows;
                    resolve(reponseData);
                }
            });
            const queryLog = result.sql;
            console.log("query: ", queryLog);
        });
    },

    lookUpAll: async(table, limit, limitValue) => {
        return new Promise((resolve, reject) => {
            const sql = `select * from ${table} ${limit} ${limitValue}`;
            let reponseData = {};
            const result = db.query(sql, (err, rows) => {
                if(err) {
                    reponseData.result = err;
                    reject(reponseData);
                }
                if(!err) {
                    reponseData = rows;
                    resolve(reponseData);
                }
            });
            const queryLog = result.sql;
            console.log("query: ", queryLog);
        });
    },
}

module.exports = { mySql };