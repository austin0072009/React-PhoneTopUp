import { Link,useLocation,useNavigate,Outlet } from "react-router-dom";
import { Badge, TabBar } from 'antd-mobile';
// import Home from "./pages/Home";
// import Record from "./pages/Record";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons';
import { useState } from "react";

export default function App() {

  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const setRouteActive = (value) => {
    navigate(value);
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
  const [activeKey, setActiveKey] = useState('todo');
  return (
    <div>
      <h1>肥猫话费充值中心</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet/>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Record" element={<Record />} />
        </Routes>


      </BrowserRouter> */}
      <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
    </div>
  );
}