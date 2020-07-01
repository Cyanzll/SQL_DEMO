# process.env
process对象是一个全局变量，env是它的一个属性
env也是一个对象

# process.env.NODE_ENV
NODE_ENV是人为添加到env上的一个属性，用于确定当前所处的开发阶段，
比如：
- 开发阶段
NODE_ENV = dev
- 生产阶段
NODE_ENV = production

# windows下改变环境变量
## Windows下以下命令无法执行
NODE_ENV = production

## 借助cross-env改变环境变量
### 安装 cross-env
```bash
$ cnpm install --save-dev cross-env
```
### 使用 cross-env
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "cross-env NODE_ENV=production node ./app.js"
}
```