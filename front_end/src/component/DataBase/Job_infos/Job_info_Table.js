import React, { useEffect, useState } from "react";
import Job_info_Data from "./Job_info_data";
import { Table } from "react-bootstrap";
import ENDPOINTS from '../../../api/endpoints';
import { GET } from '../../../api/axios';
import "../../../pages/Admin/Admin.scss";

const Job_info = () => {
    //Job_info setdata
    const [dataJob_info, setDataJob_info] = useState([])
    const [displayDataJob_info, setDisplayDataJob_info] = useState(true)

    useEffect(() => {
        const toFetch = async () => {
            //Get all Job_info message
            const job_info = await GET(ENDPOINTS.GET_ALL_MESSAGE);
            if (job_info.status === 200) {
                const _dataJob_info = job_info.data;
                setDataJob_info(
                    _dataJob_info
                )
            }
            else {
                setDisplayDataJob_info(false)
            }
        }
        toFetch()
    }, []);
    return (
        <Table responsive striped bordered hover className="table-settings">
            <thead>
                <tr>
                    <th>Action</th>
                    <th>Info</th>
                    <th>Advert</th>
                    <th>User</th>
                    <th>Description</th>  
                    <th>Active</th>                  
                </tr>
            </thead>
            <tbody>
                {displayDataJob_info ? dataJob_info.map((job_info) => {
                     const data = <Job_info_Data job_info={job_info} />
                     return (<tr>
                                 {data}
                             </tr>
                     )
                 }) : `No message in the database`}
            </tbody>
        </Table>
    )
};

export default Job_info;