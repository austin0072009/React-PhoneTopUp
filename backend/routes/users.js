var express = require('express');
var router = express.Router();
var mongoose = require("../lib/mongoose");
var appModel = require("../lib/appModel");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/create",function (req,res){


  


})


router.post("/add", function (req, res) {
  //插入数据
  console.log(req.body);
  appModel.insertMany([{
   user_Name:req.body.user_Name,
   avatar:req.body.avatar,
   level:req.body.level,
   topup_History:{
    topup_Date:req.body.topup_Date,
    topup_amount:req.body.topup_Amount,
   }

  }]).then((data) => {
    console.log('插入成功');
    res.send("success");
  }).catch((err) => {
    console.log('插入失败');
    res.send("fail");
    console.log(err);
  });


  console.log("数据库测试");

  
})


module.exports = router;
