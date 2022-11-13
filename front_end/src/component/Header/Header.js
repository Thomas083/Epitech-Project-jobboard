import React, { useState } from "react";
import Navigation from '../NavBar/Nav';
import { Container, Row, Col, Nav, Modal, Button } from 'react-bootstrap';
import { BsPeopleFill } from 'react-icons/bs';
import { FaSignInAlt } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import './header.scss';
import axios from "axios";
import { useNavigate } from "react-router-dom";

// signout
const logoutHandler = async () => {
    localStorage.clear();
    await axios.get("http://localhost:3001/api/auth/logout");
    window.location.href = "http://localhost:3000/connexion";
}

const Header = () => {
    const [update_user, setUpdate_user] = useState({
        user_firstname: JSON.parse(localStorage.user).user_firstname,
        user_lastname: JSON.parse(localStorage.user).user_lastname,
        user_email: JSON.parse(localStorage.user).user_email,
        user_password: JSON.parse(localStorage.user).user_password,
        user_phone: JSON.parse(localStorage.user).user_phone
    })

    const if_Admin = () => {
        if (JSON.parse(localStorage.user).user_admin === 1) {
            return <Nav.Link href="/adminpage"><GrUserAdmin /></Nav.Link>
        }
    }

    const navigate = useNavigate();
    const desactivate_account = async (e) => {
        try {
            e.preventDefault();
            const toTrash = await axios.delete(
                `http://localhost:3001/api/user/${JSON.parse(localStorage.user).user_id}`
            );
            if (toTrash.status === 200) localStorage.clear(); navigate('/'); alert('Your account has been disactivated call an admin to reactive')
        } catch (err) {
            throw (err)
        }
    }

    const send_Update = async (e) => {
        // console.dir(update_user)
        try {
            e.preventDefault();
            //Axios Request
            const toUpdate = await axios.put(
                `http://localhost:3001/api/user/${JSON.parse(localStorage.user).user_id}`,
                update_user
            )
            if (toUpdate.status === 200) alert("Your account has been modified"); document.location.reload()
        } catch (err) {
            throw (err)
        }
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container className="header-settings">
            <Row className="row-settings">
                <Col sm={4} xs={4}></Col>
                <Col sm={4} xs={4}>
                    <h4 className="text-center">
                        <font color="black">Job</font>
                        <font color="orange">Wars</font>
                    </h4>
                </Col>
                <Col sm={4} xs={4} className="display-grid justify-content-end">

                    <Nav>
                        <Col sm={4} xs={4} className="display-grid">
                            {if_Admin()}
                        </Col>
                        <Col sm={4} xs={4} className="display-grid">
                            <Nav.Link onClick={handleShow}><BsPeopleFill /></Nav.Link>
                            <Modal
                                show={show}
                                onHide={handleClose}
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>You can modify your profil on this modal</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={send_Update}>
                                        <Row>
                                            <input
                                                type='text'
                                                id="firstname"
                                                name="firstname"
                                                defaultValue={JSON.parse(localStorage.user).user_firstname}
                                                onChange={(e) => {
                                                    setUpdate_user({
                                                        ...update_user,
                                                        user_firstname: e.target.value
                                                    })

                                                }}
                                            />
                                            <input
                                                type='text'
                                                id="lastname"
                                                name="lastname"
                                                defaultValue={JSON.parse(localStorage.user).user_lastname}
                                                onChange={(e) => {
                                                    setUpdate_user({
                                                        ...update_user,
                                                        user_lastname: e.target.value
                                                    })

                                                }}
                                            />
                                            <input
                                                type='text'
                                                id="email"
                                                name="email"
                                                defaultValue={JSON.parse(localStorage.user).user_email}
                                                onChange={(e) => {
                                                    setUpdate_user({
                                                        ...update_user,
                                                        user_email: e.target.value
                                                    })

                                                }}
                                            />
                                            <input
                                                type='password'
                                                id="password"
                                                name="password"
                                                placeholder="Change your password"
                                                onChange={(e) => {
                                                    setUpdate_user({
                                                        ...update_user,
                                                        user_password: e.target.value
                                                    })

                                                }}
                                            />
                                            <input
                                                type="phone"
                                                id="phone"
                                                name="phone"
                                                defaultValue={JSON.parse(localStorage.user).user_phone}
                                                placeholder="Changer your Phone Number"
                                                onChange={(e) => {
                                                    setUpdate_user({
                                                        ...update_user,
                                                        user_phone: e.target.value
                                                    })

                                                }}
                                            />
                                        </Row>
                                        <hr></hr>
                                        <Row>
                                            <button type='submit'>
                                                Modify my account
                                            </button>
                                        </Row>
                                        <hr></hr>
                                        <Row>
                                            <button onClick={desactivate_account}>
                                                Desactivate my account
                                            </button>
                                        </Row>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                        <Col sm={4} xs={4} className="display-grid">
                            <Nav.Link href='/profil'><FaSignInAlt /></Nav.Link>
                        </Col>
                    </Nav>
                </Col>
            </Row>
            <Row>
                <Navigation />
            </Row>
        </Container>
    );
};

export default Header;