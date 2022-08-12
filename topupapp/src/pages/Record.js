import "./Record.css"
import React, { useState, useEffect } from 'react'
import { InfiniteScroll, List } from 'antd-mobile'
// import { mockRequest } from "../components/mockRequest";
import axios from 'axios';
import moment from "moment";

export default function Record() {

    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    // async function loadMore() {
    //     const append = await mockRequest()
    //     setData(val => [...val, ...append])
    //     setHasMore(append.length > 0)
    // }
    async function loadOrder() {

        console.log("fetching!");
    }

    useEffect(() => {

        async function fetchData() {


            //拉取数据
            let fetchUrl = `http://web.tcjy33.cn/orders/user/${window.openid}`;
            let result = await axios.get(fetchUrl).catch(err => {
                console.log(err)
            });

            console.log("data", result);

            setData(result);

        }

        fetchData();



    }, [])


    return (
        <div className="record">
            <List header="充值记录">
                {data.map((item, index) => (
                    <List.Item key={index}>时间：{moment((item.topup_data*1000)).format("YYYY-MM-DD HH:mm:ss")
} 充值金额： {item.topup_Amount_Kyat}  </List.Item>
                ))}


            </List>
            {/* <InfiniteScroll  loadMore={loadOrder} hasMore={hasMore} /> */}
        </div>
    );

}