import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import Navigation from "./pages/Navigation";
import "./App.css"

export default function App() {


  return (
    <div className="App">
      <div className="RollingContent">
        <h1 style={{ textAlign: "center" }}>肥猫话费充值中心</h1>

        <Outlet />
      </div>
      <div className="Footer">
      <Navigation />
</div>
    </div>
  );
}