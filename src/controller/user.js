const login = (username, password) => {
    /* 假验证 */
    if (username === "admin" && password === "123") {
        return true
    } else {
        return false
    }
}

module.exports = {
    login
}