# Session
Session在服务端中存储会话信息

## 直接用JS对象存储Session有什么缺点
每次重启服务器，JS对象都会重新定义，之前存储的session都会消失；
session作为js变量，放在node.js的内存中（堆内存），进程内存有限，无法解决内存暴增的问题；
操作系统也会限制一个进程的最大可用内存；
此外，正式上线后，服务器是多进程的，进程之间不能实现内存共享。

## Redis
数据存放在内存（RAM）中，读写速度快，（比MySQL快）

### 为何Session适合存放在Redis中
Session中的数据需要频繁读写，因此对于读写速度要求高，
同时，session数据是即时生成的，无需担心断电易失性；
session本身数据量也不大，

### Redis模块的安装
$ npm i redis --save --registry=https://registry.npm.taobao.org  
(亲测有效且速度快)

