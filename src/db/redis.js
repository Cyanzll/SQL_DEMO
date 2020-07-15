const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建Client
const redisClient = redis.createClient(REDIS.CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.log(err)
})

// 工具函数
function set(key, val) {
    // 对象字符串化
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                console.log(err)
                reject(err)
                return
            }
            // key 无对应值
            if (val == null) {
                resolve(null)
                return
            }
            // parse失败兜底
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (ex) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    get,
    set
}