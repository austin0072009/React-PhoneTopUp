import "./Record.css"
import React, { useState, useEffect } from 'react'
import { InfiniteScroll, List } from 'antd-mobile'
// import { mockRequest } from "../components/mockRequest";
import axios from 'axios';

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
            let fetchUrl = `http://web.tcjy33.cn/users/record/${window.openid}`;
            let result = await axios.get(fetchUrl).catch(err => {
                console.log(err)
            });

            console.log("data", result);

        }

        fetchData();



    }, [])


    return (
        <div className="record">
            <List header="充值记录">
                {data.map((item, index) => (
                    <List.Item key={index}>{item}</List.Item>
                ))}


            </List>
            {/* <InfiniteScroll  loadMore={loadOrder} hasMore={hasMore} /> */}
        </div>
    );

}