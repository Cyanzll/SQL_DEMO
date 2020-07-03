const { exec } = require('../db/mysql') 

const login = (username, password) => {
    /* 查询用户信息 */
    const sql = `
        SELECT username, password, realname FROM users 
        WHERE username='${username}' AND password=${password};
    `
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login
}