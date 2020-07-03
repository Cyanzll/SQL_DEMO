const env = process.env.NODE_ENV //环境变量

let MYSQL_CONF

/* 线下开发 */
if(env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'admin',
        post: '3306',
        database: 'myblog'
    }
}

/* 线上环境 */
if(env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'admin',
        post: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}