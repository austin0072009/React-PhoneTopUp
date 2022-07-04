var express = require('express');
var router = express.Router();
var mongoose = require("../lib/mongoose");
var appModel = require("../lib/appModel");
const app = require('../app');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 返回用户的所有信息
router.get('/info/:user_Name',function(req,res){
  console.log(req.params);
  appModel.find({user_Name:req.params.user_Name},function(err,result){
    if (err) console.log(err);
 res.send(result);
  })});

  // 只返回用户的充值记录
  router.get('/record/:user_Name',function(req,res){
    console.log(req.params);
    appModel.find({user_Name:req.params.user_Name},function(err,result){
      if (err) console.log(err);
      var sendBack = result[0].topup_History;
      console.log(sendBack);
      res.send(sendBack);
    })});


// /users/add 新增用户，老用户充值记录添加都用这个请求

router.post("/add", function (req, res) {
  //插入数据
  console.log(req.body);

  appModel.exists({ user_Name: req.body.user_Name }, function (err, result) {

    if (err) console.log(err);
    console.log(result);
    if (!result) {

      appModel.insertMany([{
        user_Name: req.body.user_Name,
        avatar: req.body.avatar,
        level: req.body.level,
        topup_History: [{
          topup_Date: req.body.topup_Date,
          topup_Amount_Kyat: req.body.topup_Amount_Kyat,
          topup_Amount_Rmb: req.body.topup_Amount_Rmb,

        }]

      }]).then((data) => {
        console.log('插入成功');
        res.send("success");
      }).catch((err) => {
        console.log('插入失败');
        res.send("fail");
        console.log(err);
      });
      console.log("新用户添加");
    }
    else {
      appModel.updateOne({ user_Name: req.body.user_Name }, {
        $push: {

          topup_History: {
            topup_Date: req.body.topup_Date,
            topup_Amount_Kyat: req.body.topup_Amount_Kyat,
            topup_Amount_Rmb: req.body.topup_Amount_Rmb,

          }

        }
      }).then((data) => {
        console.log('插入成功');
        res.send("success");
      }).catch((err) => {
        console.log('插入失败');
        res.send("fail");
        console.log(err);
      });
      console.log("老用户充值");
    }


  });





})


module.exports = router;
