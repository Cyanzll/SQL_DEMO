const { exec } = require('../db/mysql') 

// 查询
const getList = (number,name,school,grade,pro,classno) => {
    let sql = 'SELECT * FROM student WHERE 1=1 ' // 1=1 起占位作用
    if (number) {
        sql += `AND Sno='${number}' `
    }
    if (name) {
        sql += `AND Sname='${name}' `
    }
    if (school) {
        sql += `AND Sscho='${school}'`
    }
    if (grade) {
        sql += `AND Sgrade='${grade}' `
    }
    if (pro) {
        sql += `AND Spro='${pro}' `
    }
    if (classno) {
        sql += `AND Sclass='${classno}' `
    }
    sql += 'ORDER BY Sgrade DESC;' // 倒序

    return exec(sql) // return Promise
}

// 增
const newStu = (stuData = {}) => {
    // 班级号名称为 classno
    const { number, name, grade, school, pro, classno } = stuData
    const sql = `
        insert into student (Sno,Sname,Sgrade,Sscho,Spro,Sclass) 
        values (${number},"${name}",${grade},"${school}","${pro}","${classno}");
    `
    return exec(sql).then(insertData => {
        // 插入成功
        console.log(insertData)
        return { number }
    })
}

// 改
const updateStu = (no, stuData = {}) => {
    /* 只允许修改学院、专业和班级信息 */
    const { school, pro, classno } = stuData
    let sql = `
        UPDATE student SET Sno='${no}'
    `
    if(school) {
        sql += `,Sscho='${school}'`
    }
    if(pro) {
        sql += `,Spro='${pro}'`
    }
    if(classno) {
        sql += `,Sclass='${classno}'`
    }
    sql += ` WHERE Sno=${no};`

    return exec(sql).then(updateData => {
        if(updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

// 删
const delStu = (no) => {
    const sql = `DELETE FROM student WHERE Sno='${no}';`
    return exec(sql).then(deleteData => {
        if(deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    newStu,
    updateStu,
    delStu
}