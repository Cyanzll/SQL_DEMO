# MySQL 操作

## 建库
```sql
CREATE SCHEMA `myblog` ;
```

## 建表
### TABLE users

AUTO INCREMENT: 
常用于自动创建像id这样不重复的主键值，它的默认开始值是 1，起始值可以修改，默认递增值也是 1

|COLUMN|DATATYPE|PRIMARY KEY|NOT NULL|AUTO INCREMENT|
|---|---|---|---|---|
|id|int|Y|Y|Y|
|username|varchar(20)||Y||
|password|varchar(20)||Y||
|realname|varchar(20)||Y||

```sql
CREATE TABLE `myblog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `realname` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));
```


### TABLE blogs

VARCHAR: 比CHAR更灵活的数据类型，保存可变长度的字符串，在难以确定数据长度时，它比CHAR能节省更多的空间。
> MySQL 5.0 之后的版本，VARCHAR 中文字符与英文字符的长度相同

|COLUMN|DATATYPE|PRIMARY KEY|NOT NULL|AUTO INCREMENT|
|---|---|---|---|---|
|id|int|Y|Y|Y|
|title|varchar(50)||Y||
|content|longtext||Y||
|createtime|bigint(20)||Y||
|author|varchar(20)||Y||

```sql
CREATE TABLE `myblog`.`blogs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createtime` BIGINT(20) NOT NULL DEFAULT 0,
  `author` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));
```