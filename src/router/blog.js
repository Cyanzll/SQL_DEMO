const { 
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* 登陆验证函数 */
const loginCheck = (req) => {
    if(!req.session.username) { // 未登录
        return Promise.resolve(
            new ErrorModel("尚未登陆")
        )
    }
}

/* 路由 */
const handleBlogRouter = (req, res) => {
    const { path, method } = req
    const id = req.query.id

    // 获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author, keyword) // Promise
        return result.then(listData => {        // return Promise
            return new SuccessModel(listData)
        })
    }
    
    // 获取博文
    if (method === 'GET' && path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 新建一篇博文 （权限）
    if (method === 'POST' && path === '/api/blog/new') {
        const loginCheckResult = loginCheck(req) // Promise

        if (loginCheckResult) { 
        //未登录
            return loginCheckResult
        }

        // 已登录
        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新文章（权限）
    if (method === 'POST' && path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req) // Promise
        if (loginCheckResult) { 
        //未登录
            return loginCheckResult
        }
        const result = updateBlog(id, req.body)
        return result.then(success => {
            if(success) {
                return new SuccessModel("更新成功")
            } else {
                return new ErrorModel("更新失败")
            }
        })
    }

    // 删除文章（权限）
    if (method === 'POST' && path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req) // Promise
        if (loginCheckResult) { 
        //未登录
            return loginCheckResult
        }
        const author = req.session.username
        const result = delBlog(id, author)
        return result.then(success => {
            if(success) {
                return new SuccessModel("删除成功")
            } else {
                return new ErrorModel("删除失败")
            }
        })
    }

}

module.exports = handleBlogRouter