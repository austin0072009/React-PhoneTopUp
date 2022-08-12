import "./personalInfo.css"
import React, { useState,useEffect } from 'react'
import { List, Avatar, Space } from 'antd-mobile'

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
                </List>

            </div>
        </div>
    );

}