import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { FaFacebookSquare, FaInstagramSquare, FaTiktok } from 'react-icons/fa';
import AboutUs from '../../pages/AboutUs';
import { ExternalLink } from 'react-external-link';
import axios from 'axios';
import "./footer.scss"

const Footer = () => {
    const [cvAdded, setCvAdded] = useState({ user_cv: "" })

    // import cv for user

    const sumbit_cv = async (e) => {
        try {
            e.preventDefault()
            const add_cv = new FormData()
            add_cv.append("user_cv", document.getElementById("user_cv").files[0])
            const toUpdate = await axios.put(
                `http://localhost:3001/api/user/cv/${JSON.parse(localStorage.user).user_id}`,
                add_cv
            )
            if (toUpdate.status === 200) alert("Your cv has been added to your account"); document.location.reload()
        } catch (err) {
            throw (err)
        }
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
            <Container>
                <Row className='footer-settings'>
                    <Col xs={4} className='p-0 text-center'>
                        <AboutUs />
                    </Col>
                    <Col xs={5} className="text-center">
                        <Button onClick={handleShow}>Import my CV</Button>
                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Import my CV</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    <form onSubmit={sumbit_cv}>
                                        <Row>
                                            <input
                                                type="file"
                                                id="user_cv"
                                                name="user_cv"
                                                accept='.pdf'
                                                onChange={(e) => {

                                                    setCvAdded({
                                                        ...cvAdded,
                                                        user_cv: e.slice(12).target.value
                                                    })
                                                }}
                                            />
                                        </Row>
                                        <hr></hr>
                                        <Row>
                                            <button type='submit'>
                                                Add my CV
                                            </button>
                                        </Row>
                                    </form>
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                    <Col xs={3} className='p-0'>
                        <Row>Follow us on:</Row>
                        <Row>
                            <Col sm={4} xs={4}>
                                <ExternalLink href="https://www.facebook.com/">
                                    <FaFacebookSquare />
                                </ExternalLink>
                            </Col>
                            <Col sm={4} xs={4} >
                                <ExternalLink href="https://www.instagram.com/?hl=fr">
                                    <FaInstagramSquare />
                                </ExternalLink>
                            </Col>
                            <Col sm={4} xs={4}>
                                <ExternalLink href="https://www.tiktok.com/fr/">
                                    <FaTiktok />
                                </ExternalLink>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container >
    )
};

export default Footer;