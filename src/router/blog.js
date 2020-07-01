const handleBlogRouter = (req, res) => {
    const { path, method } = req

    // 获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        return {
            msg: 'GET博客列表接口'
        }
    }
    // 获取博文
    if (method === 'GET' && path === '/api/blog/detail') {
        return {
            msg: 'GET博文内容接口'
        }
    }
    // 新建一篇博文
    if (method === 'POST' && path === '/api/blog/new') {
        return {
            msg: 'POST新建一篇文章'
        }
    }

    // 更新文章
    if (method === 'POST' && path === '/api/blog/update') {
        return {
            msg: 'POST更新一篇文章'
        }
    }
}

module.exports = handleBlogRouter