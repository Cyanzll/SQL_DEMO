const handleUserRouter = (req, res) => {
    const { path, method } = req

    // 登录
    if (method === 'POST' && path === '/api/user/login') {
        return {
            msg: "POST登录接口"
        }
    }

}

module.exports = handleUserRouter