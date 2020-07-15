const {
    login
} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const { path, method } = req
    // 登录
    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = req.body
        const result = login(username, password)
        return result.then(data => {
            if(data.username) {
                /* 修改cookie */
                req.session.username = data.username
                req.session.realname = data.realname
                return new SuccessModel("登陆成功")
            }
            return new ErrorModel("登陆失败")
        })
    }

}

module.exports = handleUserRouter
