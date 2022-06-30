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



export default function Home() {
    return (
        <div style={{ padding: "1rem 0" }}>
            <div className="Home">
                <Form
                    layout='horizontal'
                    footer={

                        <Button block type='submit' color='primary' size='large' shape="rounded">
                            充值
                        </Button>
                    }
                >
                    <Form.Header>缅甸话费充值</Form.Header>

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




            </div>
        </div>
    );
}