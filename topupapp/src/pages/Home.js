/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Home.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: austin0072009 <2001beijing@163.com>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/14 16:56:16 by austin00720       #+#    #+#             */
/*   Updated: 2022/08/14 16:56:16 by austin00720      ###   ########.fr       */
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
import { options2 } from "./options";
import { Image } from "antd-mobile";
import bannerImg1 from "../img/favicon.png";
import bannerImg2 from "../img/banner2.jpg";
import { useEffect, useState } from "react";
import wx from 'weixin-js-sdk';
import axios from 'axios';
import { Space, Swiper, Toast, Tabs } from 'antd-mobile';
import myanmarPhoneNumber from "myanmar-phonenumber";
const config = require('../config/index');

const colors = [bannerImg1, bannerImg2]

const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
        <div

        // onClick={() => {
        //     Toast.show(`你点击了封面图1 ${index + 1}`)
        // }}
        >
            <Image src={color} />
        </div>
    </Swiper.Item>
));



export default function Home() {


    let [phone, setPhone] = useState();
    let [amount, setAmount] = useState();
    let [dataAmount, setDataAmount] = useState();
    // const [signature,setSign] = useState();
    //const [openid, setOpenId] = useState();
    var submit = async () => {
        if (!myanmarPhoneNumber.isValidMMPhoneNumber(phone) || (phone.length == 0)) {
            Toast.show({
                content: '缅甸手机号码的格式不正确！',
                afterClose: () => {
                    console.log('Phone Check Wrong')
                },
            })
        }
        else {
            var time = new Date().getTime();
            var rate = 300;
            
            var rmbToKyats = { 1: (100000 / rate).toFixed(0), 2: (200000 / rate).toFixed(0), 3: (300000 / rate).toFixed(0), 4: (400000 / rate).toFixed(0), 5: (500000 / rate).toFixed(0), 6: (1000000 / rate).toFixed(0), 7: (2000000 / rate).toFixed(0), 8: (3000000 / rate).toFixed(0), 9: (5000000 / rate).toFixed(0) };

            var  url = 'https://payid19.com/api/v1/create_invoice';
            var public_key = config.public_key
            let private_key = config.private_key
            let price_amount = rmbToKyats[amount[0]]
          

            var result_array = await axios.post(url, {
                public_key,private_key,price_amount
            }).then(function (response) {
                console.log(response.data);
                return response.data;
            })
                .catch(function (error) {
                    console.log(error);
                });

        }
    };

    return (
        <div style={{ padding: "0 rem 0" }}>
            <div className="Home">
                <div className="Banner">
                    {/* <Image src={bannerImg} /> */}
                    <Swiper autoplay>{items}</Swiper>
                </div>

                <Form
                    id="topupForm"
                    layout='horizontal'
                    footer={

                        <Button className="topupButton" block size='large' shape="rounded" onClick={submit}>
                            充值
                        </Button>
                    }
                >
                    <Form.Header>全网最低缅甸话费充值 <br />（支持Mytel,Telenor,Mpt,Ooredoo）</Form.Header>


                    <Tabs>
                    
                        <Tabs.Tab title='话费充值' key='phoneBalance'>
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
                        </Tabs.Tab>
                        <Tabs.Tab title='流量充值' key='phoneData'>
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
                                        name="DataAmount"

                                        columns={3}
                                        options={options2}

                                        onChange={(data) => {
                                            console.log(data);
                                            setAmount(data);

                                        }}
                                    />


                                </div>
                            </Card>


                        </Tabs.Tab>
                    </Tabs>


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