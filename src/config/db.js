const env = process.env.NODE_ENV //环境变量

let MYSQL_CONF // MySQL
let REDIS_CONF // Redis

/* 线下开发 */
if(env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'admin',
        post: '3306',
        database: 'myblog'
    }

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
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

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}