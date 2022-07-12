var express = require('express');
var router = express.Router();
const sha1 = require("sha1");
/* GET home page. */
router.get('/', function(req, res, next) {

  console.log("Wechat Check");
  console.log(req.query);
  var {signature,timestamp,nonce,echostr} = req.query;

  var token = "Austin";
  var arrSort = [token,timestamp,nonce];
  arrSort.sort();

  var str = arrSort.join("");
  var shaStr = sha1(str);

  

  console.log(shaStr);

  if(signature === shaStr){
    res.send(req.query.echostr);
  }
  else res.send("no");

});

module.exports = router;
