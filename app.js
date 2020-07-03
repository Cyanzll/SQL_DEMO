const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const { resolve } = require('path')

/* 解析 POST Data */
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        /* 非 POST 返回空 */
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        /* POST, 非 json */
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                /* 解析成对象 */
                JSON.parse(postData)
            )
        })
    })
}

const serverHandler = (req, res) => {
    /*
    * 原则：把解析数据设置为 req 的属性
    */
    const { url } = req
    /* 设置返回数据格式为 JSON */
    res.setHeader('Content-type', 'application/json')
    req.path = url.split('?')[0]

    // 解析 URL
    req.query = querystring.parse(url.split('?')[1])

    // 首先处理 Post Data
    getPostData(req).then(postData => {

        req.body = postData

        // 处理 Blog 路由
        const blogResult = handleBlogRouter(req, res)
        if(blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        // 处理 User 路由
        const userResult = handleUserRouter(req, res) 
        if (userResult) {
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        // 未命中任何路由
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Found\n")
        res.end()
    })
}

module.exports = serverHandler

// 环境变量 process.env.NODE_DEV