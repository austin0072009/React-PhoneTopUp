/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: austin0072009 <2001beijing@163.com>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/15 00:00:42 by austin00720       #+#    #+#             */
/*   Updated: 2022/07/16 21:23:18 by austin00720      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Link, useLocation, useSearchParams, Outlet } from "react-router-dom";
import Navigation from "./pages/Navigation";
import "./App.css"
import { useEffect, useState } from "react";


export default function App() {


  const params = new URLSearchParams(window.location.href);
  console.log(window.location);
  console.log(params.get("code"));
  window.austin = "austin0072009";

  global.code = "111";
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