/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: austin0072009 <2001beijing@163.com>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/16 17:29:51 by austin00720       #+#    #+#             */
/*   Updated: 2022/07/29 21:38:24 by austin00720      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var express = require('express');
var router = express.Router();
var sha1 = require("sha1");
var { sign, getTicket } = require('../utils/sign');
var axios = require("axios");
var {
  appid,
  secret
} = require('../config/index');
var crypto = require('crypto');
var fs = require('fs');
var orderModel = require("../lib/orderModel");



var getOrderNumber = () => {
  //自定义订单编号生成规则   由YYYYMMDD(年月日) + 时间戳的格式组成
  let currDate = new Date();
  let year = currDate.getFullYear();
  let month = currDate.getMonth() + 1 < 10 ? "0" + (currDate.getMonth() + 1) : currDate.getMonth() + 1;
  let day = currDate.getDate() < 10 ? "0" + currDate.getDate() : currDate.getDate();

  //获取年月日
  let date = year + month + day; //20190524

  //获取当时时间戳
  let timestamp = Date.parse(currDate); //155866554500

  //生成订单
  let orderId = date + timestamp; //20190524155866554500

  return orderId;
}

/* GET home page. */
router.get('/', function (req, res, next) {

  console.log("Wechat Check");
  console.log(req.query);
  var { signature, timestamp, nonce, echostr } = req.query;

  var token = "Austin";
  var arrSort = [token, timestamp, nonce];
  arrSort.sort();

  var str = arrSort.join("");
  var shaStr = sha1(str);



  console.log(shaStr);

  if (signature === shaStr) {
    res.set('Content-Type', 'text/plain');
    res.send(echostr);
  }
  else res.send("Nothing Happen, But this it the right route");

});



router.get('/jsapi', async function (req, res) {

  let url = decodeURIComponent(req.query.url);
  let conf = await sign(url);

  console.log('config', conf);
  res.send(conf);


})

//服务器创建自定义菜单
router.get('/createMenu', async function (req, res) {

  var post_data = {
    "button": [
      {
        "type": "view",
        "name": "话费充值",
        "url": "http://jiaguo.tcjy33.cn/"
      },
      {
        "type": "click",
        "name": "关于我们",
        "key": "about"
      }
    ]
  };


  var { access_token } = await getTicket();


  var url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`;
  axios.post(url, post_data)
    .then(res => {
      console.log('res=>', res);
    })

})


//服务器用code换取accesstoken
router.post('/exchangeCode', async function (req, res) {

  console.log(req.body);
  var code = req.body.code;


  console.log("code", code);
  axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`)
    .then(data => {
      //console.log(data.data);

      var { openid } = data.data;
      console.log("openid", openid);
      res.status(200).send(openid);
    })

})

var config = {};

router.post('/getPaySign', async function (req, res) {

  // var { nonceStr, timestamp } = req.body;

  var { appid, timestamp, nonceStr, prepay_id } = req.body;
  console.log("PaySing Req:",req.body);

  const message = `${appid}\n${timestamp}\n${nonceStr}\nprepay_id=${prepay_id}\n`;
  // const message = `POST\n/v3/pay/transactions/jsapi\n${timestamp}\n${nonceStr}\n{"mchid":"1628040916","out_trade_no":"${orderNumber}","appid":"${appid}","description":"亚洲未来科技-话费充值-缅甸话费充值","notify_url":"http://web.tcjy33.cn/notify","amount":{"total":${amount},"currency":"CNY"},"payer":{"openid":"${openid}"}}\n`;

  const signature = crypto.createSign('RSA-SHA256').update(message, 'utf-8').sign(fs.readFileSync('./pem/apiclient_key.pem').toString(), 'base64');

  console.log(signature);

  res.status(204).send(signature);

})


//下单接口
router.post('/getPrepayId', async function (req, res) {

  var { appid, amount, openid, nonceStr, timestamp } = req.body;

  var orderNumber = getOrderNumber().toString();
  console.log(req.body);
  var payment_data =
  {
    "mchid": "1628040916",
    "out_trade_no": orderNumber,
    "appid": appid,
    "description": "亚洲未来科技-话费充值-缅甸话费充值",
    "notify_url": "http://web.tcjy33.cn/notify",
    "amount": {
      "total": amount,
      "currency": "CNY"
    },
    "payer": {
      "openid": openid
    }
  }
  const message = `POST\n/v3/pay/transactions/jsapi\n${timestamp}\n${nonceStr}\n{"mchid":"1628040916","out_trade_no":"${orderNumber}","appid":"${appid}","description":"亚洲未来科技-话费充值-缅甸话费充值","notify_url":"http://web.tcjy33.cn/notify","amount":{"total":${amount},"currency":"CNY"},"payer":{"openid":"${openid}"}}\n`;
  console.log("message:", message);
  const signature = crypto.createSign('RSA-SHA256').update(message, 'utf-8').sign(fs.readFileSync('./pem/apiclient_key.pem').toString(), 'base64');
  const serial_no = process.env.SERIAL_NO;

  var config = {
    headers: {
      Authorization: `WECHATPAY2-SHA256-RSA2048 mchid="1628040916",nonce_str="${nonceStr}",signature="${signature}",timestamp="${timestamp}",serial_no="${serial_no}"`
    }
  }


  console.log("paymentdata", req.body);


  await axios.post("https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi", payment_data, config).then(function (response) {
    console.log("jsApi:",response.data);
    var { prepay_id } = response.data;

    //还要进行二次签名

    





    var array_return = {prepay_id,signature};
    res.status(200).send(array_return);


  })
    .catch(function (error) {
      console.log("JsApi:", error);
    });


})

module.exports = router;