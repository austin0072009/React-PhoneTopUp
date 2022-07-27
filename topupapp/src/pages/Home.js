/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Home.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: austin0072009 <2001beijing@163.com, aus    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/15 00:00:54 by austin00720       #+#    #+#             */
/*   Updated: 2022/07/15 00:00:54 by austin00720      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import "./Home.css"
import {
    Form,
    Input,
    Button,
    Dialog,
    TextArea,
    DatePicker,
    Selector,
    Slider,
    Stepper,
    Switch,
    Card
} from 'antd-mobile'
import { options } from "./options";
import { Image } from "antd-mobile";
import bannerImg from "../img/favicon.png";
import { useEffect, useState } from "react";
import wx from 'weixin-js-sdk';
import axios from 'axios';
import { appid, secret } from "../config/index"


export default function Home() {


    const [phone, setPhone] = useState();
    const [amount, setAmount] = useState();
    //const [openid, setOpenId] = useState();

    useEffect(() => {
        console.log("author", window.austin);

        async function initWechat() {
            let url = encodeURIComponent(window.location.href.split("#")[0]);
            await axios.get(`http://web.tcjy33.cn/jsapi?url=${url}`).then((result) => {

                let {
                    appId,
                    timestamp,
                    nonceStr,
                    signature
                } = result.data;
                console.log(result.data);
                wx.config({
                    debug: true, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
                    appId, // 必填，公众号的唯一标识
                    timestamp, // 必填，生成签名的时间戳
                    nonceStr, // 必填，生成签名的随机串
                    signature, // 必填，签名
                    jsApiList: [
                        'scanQRCode',
                        'chooseWXPay'

                    ] // 必填，需要使用的 JS 接口列表
                });
            });
        }




        initWechat();
        // setOpenId(exchangeCode());
        // console.log("getOpenId",openid);


    }, []);


    async function exchangeCode() {

        //Step1 code换取openid

        var backendUrl = "http://web.tcjy33.cn/exchangeCode"
        console.log("code", window.code);


        var result = await axios.post(backendUrl, {
            appid: appid,
            secret: secret,
            code: window.code
        }).then(function (response) {
            console.log(response);
            return response.data;
        })
            .catch(function (error) {
                console.log(error);
            });

        console.log("result is ", result);
        return result;

    };

    var submit = async () => {

        // var appid = wx3346791050221047;
        var mchid = 1628040916;
        var time = new Date().getTime();
        var openid = await exchangeCode();
        console.log(phone, amount[0], time);
        console.log("openid", openid);
        console.log("submit test");
        //console.log(createNonceStr(),createTimeStamp());



        //由于orc跨域问题 这一步必须要在后端处理，这里要post请求到后端
        //var url2 = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${window.code}&grant_type=authorization_code`


        // await axios.get(url2,(result)=>{
        //     console.log(result);
        //     var {openid} = result;
        //     console.log(openid);
        // })

        //总共要对后端进行三次请求分别 1.用code换取用户的openid
        //2.jsapi调起支付 得到一个prepay_id
        //3.将此前所有参数进行签名 得到paysign




        //Step 2 调起支付 获得prepay_id
        //这一步也是在后端完成，在前端有cors跨域问题

        // var payment_data =
        // {
        //     "mchid": "1628040916",
        //     "out_trade_no": getOrderNumber(),
        //     "appid": appid,
        //     "description": "亚洲未来科技-话费充值-缅甸话费充值",
        //     "notify_url": "http://web.tcjy33.cn/notify",
        //     "amount": {
        //         "total": amount,
        //         "currency": "CNY"
        //     },
        //     "payer": {
        //         "openid": openid
        //     }
        // }

        //这个请求要放在后端完成
        // await axios.post("https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi", payment_data).then(function (response) {
        //     console.log(response);
        // })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        var rmbToKyats = { 1: 476, 2: 952, 3: 1428, 4: 1902, 5: 2380, 6: 4760, 7: 9520, 8: 14280 };

        const nonceStr = Math.random().toString(36).slice(-10);
        const timestamp = (new Date().getTime() / 1000).toFixed(0);


        var prepayUrl = "http://web.tcjy33.cn/getPrepayId";
        var result_array = await axios.post(prepayUrl, {
            appid, amount: rmbToKyats[amount[0]], openid,nonceStr,timestamp
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });

        var prepay_id = result_array[0];
        var signature = result_array[1];

        //Step3 生成支付签名，这一步需要在微信支付商户平台，得到商户v3支付的私钥，并用私钥进行签名
        //也是在后端中处理，发请求到后端
        var payUrl = "http://web.tcjy33.cn/getPaySign";

        //第三步直接在后端处理，在同一个请求中完成,目前仅仅是获取signature

        //以下操作需要在后端完成
        //const message = `GET\n/v3/certificates\n${timestamp}\n${nonceStr}\n\n`;
        // const signature = crypto.createSign('RSA-SHA256').update(message, 'utf-8').sign(fs.readFileSync('../pem/apiclient_key').toString(), 'base64');

        // var signature = await axios.post(payUrl, {
        //     appid, amount: rmbToKyats[amount[0]], openid,nonceStr,timestamp


        // }).then(function (response) {
        //     console.log(response);
        // })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        wx.chooseWXPay({
            timestamp: timestamp, // 支付签名时间戳，注意微信 jssdk 中的所有使用 timestamp 字段均为小写。但最新版的支付后台生成签名使用的 timeStamp 字段名需大写其中的 S 字符
            nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
            package: "prepay_id=" + prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: "RSA", // 微信支付V3的传入 RSA ,微信支付V2的传入格式与V2统一下单的签名格式保持一致
            paySign: signature, // 支付签名
            success: function (res) {
                // 支付成功后的回调函数
                console.log(res);
            }
        });

    };

    return (
        <div style={{ padding: "1rem 0" }}>
            <div className="Home">
                <div className="Banner">
                    <Image src={bannerImg} />
                </div>

                <Form
                    id="topupForm"
                    layout='horizontal'
                    footer={

                        <Button block color='primary' size='large' shape="rounded" onClick={submit}>
                            充值
                        </Button>
                    }
                >
                    <Form.Header>全网最低缅甸话费充值 <br />（支持Mytel,Telenor,Mpt,Ooredoo）</Form.Header>

                    <Form.Item
                        name='PhoneNumber'

                        rules={[{ required: true, message: '请输入手机号码' }]}
                    >
                        <Input onChange={(data) => {
                            console.log(data);
                            setPhone(data);
                        }} placeholder='请输入缅甸手机号码' />
                    </Form.Item>

                    <Card title={"选择金额"}>
                        <div className="AmountGroup">
                            <Selector
                                name="Amount"

                                columns={3}
                                options={options}

                                onChange={(data) => {
                                    console.log(data);
                                    setAmount(data);

                                }}
                            />


                        </div>
                    </Card>




                </Form>
                <Card className="TextCard">
                    <div className="TextBox">
                        [温馨提示]<br />
                        1.本平台提供全网最低缅甸话费充值，支持缅甸五大运营商（Mytel，Mpt，Telenor，Ooredoo，Mectal）。 <br />
                        2.支持24小时全天候服务，充值快速到账，如果充值未到账请拨打客户电话，或者发信息到公众号。<br />
                        3.如果遇到特殊情况或者需要批量充值，长期合作可以给公众号发信息留言或者联系客服。<br />
                        4.客服热线：09652800280,09664266940(飞机同号)。
                    </div>


                </Card>



            </div>
        </div>
    );
}