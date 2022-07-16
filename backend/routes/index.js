/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: austin0072009 <2001beijing@163.com>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/16 17:29:51 by austin00720       #+#    #+#             */
/*   Updated: 2022/07/16 20:23:01 by austin00720      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var express = require('express');
var router = express.Router();
var sha1 = require("sha1");
var {sign,getTicket} = require('../utils/sign');
var axios = require("axios");

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

//服务器创建自定义菜单
router.get('/createMenu',async function(req,res){

  var post_data =  {
    "button":[
    {	
         "type":"view",
         "name":"话费充值",
         "url":"http://jiaguo.tcjy33.cn/"
     },
     {
        "type":"click",
        "name":"关于我们",
        "key":"about"
     }
    ]
};


var {access_token} = await getTicket(); 


var url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`;
axios.post(url,post_data)
.then(res=>{
    console.log('res=>',res);            
})

})




module.exports = router;