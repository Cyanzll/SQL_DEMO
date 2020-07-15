const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const handleStudentRouter = require('./src/router/student')
const querystring = require('querystring')
const { resolve } = require('path')

/* Session */
const SESSION_DATA = {}

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

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 3600 *1000)) // 一天
    return d.toGMTString()
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

    // 解析 Cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) { return }
        const arr = item.split('=')
        const key = arr[0]
        const val = arr[1]
        req.cookie[key] = val
    })
    console.log("cookie: ", req.cookie)

    // 接收请求，解析 Session
    let needSetCookie = false
    let userId = req.cookie.userid
    if (userId) {
        if (!SESSION_DATA[userId]) { // 如果有 userId 但无对应 session
            SESSION_DATA[userId] = {}
        }
        req.session = SESSION_DATA[userId]
    } else {               
        needSetCookie = true          // 如果没有此 userId
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
        req.session = SESSION_DATA[userId]
    }

    console.log("session", req.session)

    // 首先处理 Post Data
    getPostData(req).then(postData => {

        req.body = postData

        // 处理 Blog 路由
        const blogResult = handleBlogRouter(req, res)
        if(blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly=false; expires=${getCookieExpires()}`)
                } 
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        // 处理 Student 路由
        const studentResult = handleStudentRouter(req, res)
        if(studentResult) {
            studentResult.then(studentData => {
                res.end(
                    JSON.stringify(studentData)
                )
            })
            return
        }

        // 处理 User 路由
        const userResult = handleUserRouter(req, res) 
        if (userResult) {
            userResult.then(userData => {
                // 登陆成功
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly=false; expires=${getCookieExpires()}`)
                }
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