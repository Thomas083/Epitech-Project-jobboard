import React from 'react';
import { Nav, Navbar, Button, Form, Container, Row, Col, FormControl } from 'react-bootstrap';
import { FcSearch, FcMenu } from 'react-icons/fc';
import Filter_OffCanvas from '../Filter/Filter_OffCanvas'
import "./nav.scss";
const Navigation = () => {

    const is_Society = () => {
        console.log(JSON.parse(localStorage.user).user_society)
        if (JSON.parse(localStorage.user).user_society === 1) {
            return <Nav.Link href="/formsociety"><font color="white">Make Advert</font></Nav.Link>
        }
    }

    const is_in_main = () => {
        if (document.location.pathname === "/main") {
            return (
                <Col className='justify-content-end d-grid d-md-none'>
                    <Filter_OffCanvas />
                </Col>
            )
        }
    }

    return ( 
        <Container className="nav-settings">
            <div className='row-settings'>
                <Navbar expand='md' collapseOnSelect={true} bg="warning">
                    <Form className='d-flex'>
                        <i><FcSearch /></i>
                        <input 
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>

                    <Navbar.Toggle aria-controls="navbarScroll"><FcMenu /></Navbar.Toggle>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Nav.Link href='/'><font color="white">Log in or Sign up</font></Nav.Link>
                            <Nav.Link href="/main"><font color="white">Home</font></Nav.Link>
                            {is_Society()}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {is_in_main()}
            </div>
        </Container >

    );
};

export default Navigation;