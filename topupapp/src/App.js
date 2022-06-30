import { Link,useLocation,useNavigate,Outlet } from "react-router-dom";
import Navigation from "./pages/Navigation";
export default function App() {


  return (
    <div>
      <h1  style={{textAlign:"center"}}>肥猫话费充值中心</h1>
     
      <Outlet/>
      <Navigation />

    </div>
  );
}