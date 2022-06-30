import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";
import Home from "./pages/Home";
import Record from "./pages/Record";
import "./index.css"

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes >
      <Route path="/" element={<App />}>
        <Route index element={<Home/>}/>
        <Route path="Record" element = {<Record/>}/>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Error : wrong index</p>
            </main>
          }
        />

      </Route>
    </Routes>
  </BrowserRouter>
);