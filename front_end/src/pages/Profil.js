import React, { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const Profil = () => {
    //User data
    const [userUpdate, setUserUpdate] = useState({
        user_firstname: JSON.parse(localStorage.user).user_firstname,
        user_lastname: JSON.parse(localStorage.user).user_lastname,
        user_email: JSON.parse(localStorage.user).user_email,
        user_password: JSON.parse(localStorage.user).user_password,
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Profil;