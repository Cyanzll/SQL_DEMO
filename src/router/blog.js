// 第三层
const { 
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* 路由 */
const handleBlogRouter = (req, res) => {
    const { path, method } = req
    const id = req.query.id

    // 获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const data = getList(author, keyword)
        return new SuccessModel(data)
    }
    
    // 获取博文
    if (method === 'GET' && path === '/api/blog/detail') {
        const data = getDetail(id)
        return new SuccessModel(data)
    }

    // 新建一篇博文
    if (method === 'POST' && path === '/api/blog/new') {
        const blogData = newBlog(req.body)
        return new SuccessModel(blogData)
    }

    // 更新文章
    if (method === 'POST' && path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if (result) {
            return new SuccessModel("success")
        } else {
            return new ErrorModel("failed")
        }
    }

    // 删除文章
    if (method === 'POST' && path === '/api/blog/del') {
        const result = delBlog(id)
        if (result) {
            return new SuccessModel("success")
        } else {
            return new ErrorModel("failed")
        }
    }

}

module.exports = handleBlogRouter