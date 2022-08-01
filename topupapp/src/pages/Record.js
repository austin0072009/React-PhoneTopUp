import "./Record.css"
import React, { useState } from 'react'
import { InfiniteScroll, List } from 'antd-mobile'
// import { mockRequest } from "../components/mockRequest";

export default function Record() {

    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    // async function loadMore() {
    //     const append = await mockRequest()
    //     setData(val => [...val, ...append])
    //     setHasMore(append.length > 0)
    // }
    async function loadOrder(){
        
    }

    return (
        <div className="record">
            <List header="充值记录">


            </List>
            <InfiniteScroll  hasMore={hasMore} />
        </div>
    );
    
}