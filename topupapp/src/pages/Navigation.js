
import { Link,useLocation,useNavigate,Outlet } from "react-router-dom";
import { Badge, TabBar,Card } from 'antd-mobile';
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons';
import { useState } from "react";

export default function Navigation (){

    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();
    const setRouteActive = (value) => {
      navigate(value);
      console.log(value);
      setActiveKey(value);
      if (value == "home")
      {
        navigate("/")
      }
    }
  
    const tabs = [
      {
        key: 'home',
        title: '首页',
        icon: <AppOutline />,
        badge: Badge.dot,
      },
      {
        key: 'todo',
        title: '我的待办',
        icon: <UnorderedListOutline />,
        badge: '5',
      },
      {
        key: 'message',
        title: '我的消息',
        icon: (active: boolean) =>
          active ? <MessageFill /> : <MessageOutline />,
        badge: '99+',
      },
      {
        key: 'personalCenter',
        title: '个人中心',
        icon: <UserOutline />,
      },
    ]
    const [activeKey, setActiveKey] = useState('home');


    return(
        <TabBar activeKey={activeKey} onChange={value => setRouteActive(value)}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    )
}