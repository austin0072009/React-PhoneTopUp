/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: austin0072009 <2001beijing@163.com>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/15 00:01:11 by austin00720       #+#    #+#             */
/*   Updated: 2022/07/16 20:44:45 by austin00720      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

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