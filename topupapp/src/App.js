/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: austin0072009 <2001beijing@163.com>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/15 00:00:42 by austin00720       #+#    #+#             */
/*   Updated: 2022/07/17 16:26:20 by austin00720      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Link, useLocation, useSearchParams, Outlet } from "react-router-dom";
import Navigation from "./pages/Navigation";
import "./App.css"
import { useEffect, useState } from "react";
import axios from "axios";

//paraName 等找参数的名称
function GetUrlParam(paraName) {
  var url = window.location.href.toString();
  var arrObj = url.split("?");

  if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;

      for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");

          if (arr != null && arr[0] == paraName) {
              return arr[1];
          }
      }
      return "";
  }
  else {
      return "";
  }
}

export default function App() {


  //const params = new URLSearchParams(window.location.href);
  console.log(window.location);
  //console.log(GetUrlParam("code"));
  window.austin = "austin0072009";
  window.code = GetUrlParam("code");






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