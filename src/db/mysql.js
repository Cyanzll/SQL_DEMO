const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')

const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 单例模式
function exec(sql) {
    return promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if(err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = {
    exec
}