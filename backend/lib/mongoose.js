 //先引入mongoose模块
var mongoose = require("mongoose");
 //连接数据库服务器

// var url = process.env.DB_HOST;
// console.log(url);
var dbConnection = process.env.DB_CONNECTION;
var dbHost = process.env.DB_HOST;
const url = `${dbConnection}://${dbHost}:`
 mongoose.connect(url, function (error) {
     if (error) {
         console.log("数据库连接失败") // DB connection fail
     } else {
         console.log("数据库连接成功") // DB connection success
     }
 })
 //导出
 module.exports = mongoose;
 