// 第四层

const getList = (author, keyword) => {
    // 示例
    return [
        {
            id: 1,
            title: "标题A",
            content: '内容A',
            createTime: 1593621788514,
            author: 'zhangsan'
        },
        {
            id: 2,
            title: "标题B",
            content: '内容B',
            createTime: 1593621824178,
            author: 'lisi'
        }
    ]
}

const getDetail = (id) => {
    return {
        id: 1,
        title: "标题A",
        content: '内容A',
        createTime: 1593621788514,
        author: 'zhangsan'
    }
}

const newBlog = (blogData = {}) => {
    console.log("blogdata: ", blogData)
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    console.log("update: ", blogData)
    return true
}

const delBlog = (id) => {
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}