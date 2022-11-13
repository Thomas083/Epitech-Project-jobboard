import React, { useState } from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import Tab from "../../component/Log/Tab/Tab";
import { Col, Container, Row } from "react-bootstrap";
import "../../component/Log/IdentificationForm.scss";
import Job_info_Table from "../../component/DataBase/Job_infos/Job_info_Table";
import Users_Table from "../../component/DataBase/Users/Users_Table";
import Advertissement_Table from "../../component/DataBase/Advertissements/Advertissment_Table";
import "./Admin.scss"


const Admin = () => {
    const [database, setDatabase] = useState({
        advertissement: "advertissement",
        job_info: "null",
        users: "null",
    });
    // check if user is an admin
    if (JSON.parse(localStorage.user).user_admin === 1) {
        const displayAdvertissement = () => {

            setDatabase({
                advertissement: "advertissement",
                job_info: null,
                users: null,
            });
        };

        const displayjob_info = () => {

            setDatabase({
                advertissement: null,
                job_info: "job_info",
                users: null,
            });
        };

        const displayUsers = () => {

            setDatabase({
                advertissement: null,
                job_info: null,
                users: "users",
            })
        }

        return (
            <div>
                <Container >
                    <Row className="bg-white">
                        <Row><Header /></Row>
                        <Row className="display-settings">
                            <Col xs='6' sm='4'>
                                <Tab
                                    onClick={displayAdvertissement}
                                    className="tab"
                                >
                                    Advertissement
                                </Tab>
                            </Col>
                            <Col xs='6' sm='4'>
                                <Tab
                                    onClick={displayjob_info}
                                    className="tab"
                                >
                                    Job_info
                                </Tab>
                            </Col>
                            <Col xs='12' sm='4'>
                                <Tab
                                    onClick={displayUsers}
                                    className="tab"
                                >
                                    Users
                                </Tab>
                            </Col>
                        </Row>
                    </Row>
                    <Row>
                        {database.advertissement === "advertissement" ?
                            <Advertissement_Table />
                            : database.job_info === "job_info" ?
                                <Job_info_Table />
                                : database.users === "users" ?
                                    <Users_Table />
                                    : `No data in the database`}
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    } else {
        return (
            <div>
                <h1>Sorry you are not an admin</h1>
            </div>
        )
    }
}



export default Admin;