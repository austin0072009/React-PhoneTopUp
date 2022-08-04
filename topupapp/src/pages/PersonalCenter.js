import "./personalInfo.css"
import React, { useState } from 'react'
import { List, Avatar, Space } from 'antd-mobile'

export default function PersonalCenter() {


    return (
        <div className="personalCenter">
            <div >
                <List>
                    <List.Item
                        prefix={<Avatar src=""/>}
                    >
                    <div className="personalInfo">
                        用户名称：
                    </div>

                    </List.Item>
                </List>

            </div>
        </div>
    );

}