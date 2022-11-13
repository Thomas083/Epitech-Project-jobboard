import React, { useState, useEffect } from "react";
import Add from "./Add";
import ENDPOINTS from '../../api/endpoints';
import { GET } from '../../api/axios';

const Ads = () => {

    const [dataApi, setDataApi] = useState([]);
    const [displayData, setDisplayData] = useState(true)
    const [Loading, setLoading] = useState(true);
    const [count, setCount] = useState(5);

    const state = {
        items: Array.from({ length: 3 }),
        hasMore: true
    };

    // infinite scroll
    const fetchMoreData = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoading(true);
            setCount(count + 5);
        }
    };

    useEffect(() => {
        const toFetch = async () => {
            const axiosResponse = await GET(ENDPOINTS.GET_ALL_ADVERT);
            if (axiosResponse.status === 200) {
                const _dataApi = axiosResponse.data;
                const _dataApiSlice = _dataApi.slice(0, count);
                if(setLoading) {
                setDataApi(
                    _dataApiSlice
                )
                setLoading(false)
                }
            }
            else {
                setDisplayData(false)
            }
        }
        toFetch()
        // infinite scroll
         window.addEventListener ('scroll', fetchMoreData);
            return () => { window.removeEventListener('scroll', fetchMoreData) }
    }, [setLoading, count]);

    return (
        <div>
                {displayData ? dataApi.map((advert) => {
                    return <Add advert={advert} />
                }) : `You need to be connected`}
        </div >
    );
};

export default Ads;