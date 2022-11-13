import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Filter from './Filter';

const Filter_OffCanvas = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <ul onClick={handleShow} className="white">
                {`> Filter`}
            </ul>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <Offcanvas.Body><Filter /></Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Filter_OffCanvas;