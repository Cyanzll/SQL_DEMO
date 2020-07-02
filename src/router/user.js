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
        if (result) {
            return new SuccessModel("success")
        } else {
            return new ErrorModel("failed")
        }
    }

}

module.exports = handleUserRouter