var express = require('express');
var router = express.Router();
var sha1 = require("sha1");
var {sign} = require('../utils/sign');


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
    res.set('Content-Type','text/plain');
    res.send(echostr);
  }
  else res.send("Nothing Happen, But this it the right route");

});

router.get('/jsapi',async function(req,res){

  let url = decodeURIComponent(req.query.url);
  let conf = await sign(url);
  
  console.log('config',conf);
  res.send(conf);


})



module.exports = router;