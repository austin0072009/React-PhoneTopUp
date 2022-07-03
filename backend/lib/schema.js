 //引入mongoose.js文件
 var mongoose = require("./mongoose.js")
 //定义schema
 var schema = mongoose.Schema
 const users=new schema({
     //这里是数据库自己创建的属性名：他的属性类型   如：
     user_Name : {type : String , require : true},
     
     level : {type : String},
     updated : {type:Date, default:Date.now},
     topup_History : {
        topup_Date :{type: Date},
        topup_Amount:{type: String},
     },
     avatar: String,

 })
 //导出
 module.exports = users;
