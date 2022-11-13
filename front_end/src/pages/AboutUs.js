import React, { useState } from 'react';
import { Button, Offcanvas} from 'react-bootstrap';


const AboutUs = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant='link' onClick={handleShow}>
                About Us
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>About Us</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    We are just two epitech student and we are trying to do 
                    a JobBoard !
                    Please follow us !
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default AboutUs;