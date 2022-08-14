import "./personalInfo.css"
import React, { useState,useEffect } from 'react'
import { List, Avatar, Space,Card } from 'antd-mobile'
import { ListItem } from "antd-mobile/es/components/list/list-item";

export default function PersonalCenter() {

    let [userName,setUserName] = useState("");
    let [userAvatar,setAvatar] = useState("");

    useEffect(() => {
      
        setUserName(window.nickname);
        setAvatar(window.img);
    
        console.log("img",window.img);
      
    }, [])
    

    return (
        <div className="personalCenter">
            <div >
                <List>
                    <List.Item
                        prefix={<Avatar src={userAvatar}/>}
                    >
                    <div className="personalInfo">
                        用户名称：{userName}
                    </div>

                    </List.Item>
                    <ListItem>

                    <Card>
                        由于个人精力有限，许多扩展功能尚未开展。<br/>
                        本人希望打造依赖于微信支付的世界各国华人话费充值的便民系统 <br/>
                        本人作为缅甸人的资源有限，只能拥有缅甸及其周边国家的话费充值渠道 <br/>
                        不论是开发还是提供资源也好，欢迎您联系我，我们一起追求梦想 ！
                    </Card>

                    </ListItem>
                </List>

            </div>
        </div>
    );

}