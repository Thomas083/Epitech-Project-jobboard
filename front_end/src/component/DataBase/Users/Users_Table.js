import React, { useEffect, useState } from "react";
import Users_Data from "./Users_Data";
import { Table } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";
import { ImCross } from "react-icons/im"
import ENDPOINTS from '../../../api/endpoints';
import { GET } from '../../../api/axios';
import "../../../pages/Admin/Admin.scss";

const Users = () => {
    //User setdata
    const [dataUser, setDataUser] = useState([])
    const [displayDataUser, setDisplayDataUser] = useState(true)

    useEffect(() => {
        const toFetch = async () => {
            //Get all user
            const users = await GET(ENDPOINTS.GET_ALL);
            if (users.status === 200) {
                const _dataUser = users.data;
                setDataUser(
                    _dataUser
                )
            }
            else {
                setDisplayDataUser(false)
            }
        }
        toFetch()
    }, []);

    return (
        <Table responsive striped bordered hover className="table-settings">
            <thead>
                <tr>
                    <th>Action</th>
                    <th>User</th>
                    <th>Lastname</th>
                    <th>Firstname</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Phone</th>
                    <th>Society</th>
                    <th>Active</th>
                    <th>Admin</th>
                </tr>
            </thead>
            <tbody>
                {displayDataUser ? dataUser.map((users) => {
                    const data = <Users_Data users={users} />
                    return (
                        <tr>
                            {data}
                        </tr>
                    )
                }) : `No users in the database`}
            </tbody>
        </Table>
    )
};

export default Users;