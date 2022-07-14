/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: austin0072009 <2001beijing@163.com>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/15 00:00:42 by austin00720       #+#    #+#             */
/*   Updated: 2022/07/15 00:04:59 by austin00720      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import Navigation from "./pages/Navigation";
import "./App.css"




export default function App() {


  return (
    <div className="App">
      <div className="RollingContent">
        <h1 className="Title">亚洲未来话费充值中心</h1>


        <Outlet />
      </div>
      <div className="Footer">
      <Navigation />
</div>
    </div>
  );
}