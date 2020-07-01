const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandler = (req, res) => {
    /* 返回数据格式为 JSON */
    const {url} = req
    res.setHeader('Content-type', 'application/json')
    req.path = url.split('?')[0]
    
    // 处理 Blog 路由
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
        res.end(
            JSON.stringify(blogData)
        )
        return
    }

    // 处理 User 路由
    const userData = handleUserRouter(req, res) 
    if (userData) {
        res.end(
            JSON.stringify(userData)
        )
        return
    }

    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()

}

module.exports = serverHandler

// 环境变量 process.env.NODE_DEV