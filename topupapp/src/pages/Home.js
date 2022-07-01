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


export default function Home() {
    return (
        <div style={{ padding: "1rem 0" }}>
            <div className="Home">
                <div className="Banner">
                    <Image src={bannerImg} />
                </div>

                <Form
                    layout='horizontal'
                    footer={

                        <Button block type='submit' color='primary' size='large' shape="rounded">
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
                        4.客服热线：09664255940(飞机同号)。
                    </div>


                </Card>



            </div>
        </div>
    );
}