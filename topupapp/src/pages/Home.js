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
import { useEffect } from "react";
import wx from 'weixin-js-sdk';
import axios from 'axios';

export default function Home() {

     useEffect(()=>{
        console.log("author",window.austin);

        async function initWechat(){
        var url = "http://web.tcjy33.cn/jsapi";

        await axios.get(url).then((result) => {

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
          })
        }

        initWechat();


    },[]);


    var submit = ()=>{

        console.log(document.getElementById("topupForm"));
        console.log("submit test");

    };

    return (
        <div style={{ padding: "1rem 0" }}>
            <div className="Home">
                <div className="Banner">
                    <Image src={bannerImg} />
                </div>

                <Form
                    id = "topupForm"
                    layout='horizontal'
                    footer={

                        <Button block  color='primary' size='large' shape="rounded" onClick={submit}>
                            充值
                        </Button>
                    }
                >
                    <Form.Header>全网最低缅甸话费充值 <br />（支持Mytel,Telenor,Mpt,Ooredoo）</Form.Header>

                    <Form.Item
                        name='PhoneNumber'

                        rules={[{ required: true, message: '请输入手机号码' }]}
                    >
                        <Input onChange={console.log} placeholder='请输入缅甸手机号码' />
                    </Form.Item>

                    <Card title={"选择金额"}>
                        <div className="AmountGroup">
                            <Selector


                                columns={3}
                                options={options}
                            />


                        </div>
                    </Card>




                </Form>
                <Card className="TextCard">
                    <div className="TextBox">
                        [温馨提示]<br/>
                        1.本平台提供全网最低缅甸话费充值，支持缅甸五大运营商（Mytel，Mpt，Telenor，Ooredoo，Mectal）。 <br/>
                        2.支持24小时全天候服务，充值快速到账，如果充值未到账请拨打客户电话，或者发信息到公众号。<br/>
                        3.如果遇到特殊情况或者需要批量充值，长期合作可以给公众号发信息留言或者联系客服。<br/>
                        4.客服热线：09652800280,09664266940(飞机同号)。
                    </div>


                </Card>



            </div>
        </div>
    );
}