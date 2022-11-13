import React, { useEffect, useState } from "react";
import Advertissement_Data from "./Advertissement_Data";
import { Table } from "react-bootstrap";

import ENDPOINTS from '../../../api/endpoints';
import { GET } from '../../../api/axios';
import "../../../pages/Admin/Admin.scss";

const Advertissement_Table = () => {
    //Advertissement setdata
    const [dataAdvert, setDataAdvert] = useState([]);
    const [displayDataAdvert, setDisplayDataAdvert] = useState(true)

    useEffect(() => {
        const toFetch = async () => {
            //Get all advert
            const advertissement = await GET(ENDPOINTS.GET_ALL_ADVERT);
            if (advertissement.status === 200) {
                const _dataAdvert = advertissement.data;
                setDataAdvert(
                    _dataAdvert
                )
            }
            else {
                setDisplayDataAdvert(false)
            }
        }
        toFetch()
    }, []);


    return (
        <Table responsive striped bordered hover className="table-settings">
            <thead>
                <tr>
                    <th>Action</th>
                    <th>Advert</th>
                    <th>User</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Contract</th>
                    <th>Categories</th>
                    <th>Teleworking</th>
                    <th>Time</th>
                    <th>Description</th>
                    <th>Localisation</th>
                    <th>Wages</th>
                    <th>Publication Date</th>
                    <th>Update</th>
                    <th>Active</th>
                </tr>
            </thead>
            <tbody>
                {displayDataAdvert ? dataAdvert.map((advert) => {
                    const data = <Advertissement_Data advert={advert} />
                    return (
                        <tr>
                            {data}
                        </tr>
                    )
                }) : `No advert in the database`}
            </tbody>
        </Table>
    )
};

export default Advertissement_Table;