// 第三层
const { 
    getList,
    newStu,
    updateStu,
    delStu
} = require('../controller/student')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* 路由 */
const handleStudentRouter = (req, res) => {

    const { path, method } = req
    // user表的id
    const id = req.query.id
    // student表的学号no
    const no = req.query.no

    // 查询学生信息
    if (method === 'GET' && path === '/api/student/list') {
        const number = req.query.author || ''   // 学号
        const name = req.query.keyword || ''    // 姓名
        const school = req.query.school || ''   // 学院
        const grade = req.query.grade || ''     // 年级
        const pro = req.query.pro || ''         // 专业
        const classno = req.query.classno || ''    // 班级
        const result = getList(number,name,school,grade,pro,classno) // Promise
        return result.then(listData => {        // return Promise
            return new SuccessModel(listData)
        })
    }

    // 新增一条学生信息
    if (method === 'POST' && path === '/api/student/new') {
        const result = newStu(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 修改学生信息
    if (method === 'POST' && path === '/api/student/update') {
        const result = updateStu(no, req.body)
        return result.then(success => {
            if(success) {
                return new SuccessModel("更新成功")
            } else {
                return new ErrorModel("更新失败")
            }
        })
    }

    // 删除学生信息
    if (method === 'POST' && path === '/api/student/del') {
        const result = delStu(no)
        return result.then(success => {
            if(success) {
                return new SuccessModel("删除成功")
            } else {
                return new ErrorModel("删除失败")
            }
        })
    }

}

module.exports = handleStudentRouter