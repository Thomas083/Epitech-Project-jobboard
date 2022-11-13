import React, { useEffect, useState } from 'react'
import { Container, Row, Col, useAccordionButton, Accordion, Card, Modal, Button } from 'react-bootstrap';
import { MdWork } from 'react-icons/md';
import ENDPOINTS from '../../api/endpoints';
import "./Add.scss"
import { POST, GET } from '../../api/axios';

const Add = ({ advert }) => {

    const [imgSrc, setImgSrc] = useState("");
    const {
        advert_id,
        advert_title,
        advert_icon,
        advert_contract,
        advert_contract_categories,
        advert_contract_type,
        advert_contract_time,
        advert_description,
        advert_localisation,
        advert_wages,
        user_firstname,
        user_lastname,
    } = advert;

    const [job_info, setJob_info] = useState({
        job_info_description: "",
        advert_id: advert_id,
        user_id: JSON.parse(localStorage.user).user_id,
    })
    const [messageSend, setMessageSend] = useState(false)
    //const for Apply Button
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log('totally custom!'),
        );

        return (
            <button
                type="button"
                onClick={decoratedOnClick}
            >
                {children}
            </button>
        );
    }

    const sendMessage = async (e) => {
        try {
            e.preventDefault();
            //Axios Request
            const response = await POST(ENDPOINTS.SEND_MESSAGE, job_info)
            if (response.status === 200) {
                console.log('error')
            }
            if (response.status === 201) {
                setMessageSend(true);
            }
        } catch (err) {
            throw err;
        }
    }

    // display society icon
    useEffect(() => {
        const toFetchSocietyIcon = async () => {
            try {
                const response = await GET(ENDPOINTS.GET_ONE_IMAGE + advert_id)
                if (advert_icon !== null) {
                    setImgSrc(response.data[0].advert_icon);
                } else {
                    // display default img
                    setImgSrc("./images/advert/default/default.png");
                }

            } catch (error) {
                throw (error)
            }
        }
        toFetchSocietyIcon()
    }, []);

    return (
        <Container className='margin-top'>
            <Accordion>
                <Accordion.Item>
                    <Card>
                        <Card.Header>
                            <Row className='box hover'>
                                <Col xs={4} sm={2} className="align-self-center text-center">
                                    <img src={`${imgSrc}`} alt="compagnies_icon" />
                                </Col>
                                <Col xs={8} sm={10} >
                                    <h1>{advert_title}</h1>
                                    <p><span className='tag'>{advert_contract_categories}</span><span className='tag'>{JSON.parse(advert_contract)}</span></p>
                                    <p>{advert_description}</p>
                                    <Row>
                                        <CustomToggle className='btn-learn-more' eventKey='0'>
                                            <MdWork />
                                            Learn More
                                        </CustomToggle>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Accordion.Collapse eventKey='0' className="bg-lightblue">
                            <Card.Body>
                                <Row>
                                    <p>Description: {advert_description}</p>
                                    <p>Wages: {advert_wages}$</p>
                                    <p>Localisation: {advert_localisation}</p>
                                    <p>Time: {advert_contract_time}</p>
                                    <p>Teleworking: {advert_contract_type ? `yes` : `no`}</p>
                                    <p className='text-end'>{user_lastname}  {user_firstname}</p>
                                </Row>
                                <Row>
                                    <button
                                        type='button'
                                        onClick={handleShow}
                                    >
                                        Apply
                                    </button>

                                    <Modal
                                        show={show}
                                        onHide={handleClose}
                                        centered
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Enter your information for this job</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <form onSubmit={sendMessage}>
                                                <Row>
                                                    <input
                                                        type='text'
                                                        id="firstname"
                                                        name="firstname"
                                                        defaultValue={JSON.parse(localStorage.user).user_firstname}
                                                    />
                                                    <input
                                                        type='text'
                                                        id="lastname"
                                                        name="lastname"
                                                        defaultValue={JSON.parse(localStorage.user).user_lastname}
                                                    />
                                                    <input
                                                        type='text'
                                                        id="email"
                                                        name="email"
                                                        defaultValue={JSON.parse(localStorage.user).user_email}
                                                    />
                                                    <input
                                                        type='phone'
                                                        id="phone"
                                                        name="phone"
                                                        placeholder='Enter your phone number'
                                                        defaultValue={JSON.parse(localStorage.user).user_phone}
                                                    />
                                                    <textarea
                                                        type="textarea"
                                                        id="description"
                                                        name="description"
                                                        placeholder='Write your motivation to this job'
                                                        onChange={(e) => {
                                                            setJob_info({
                                                                ...job_info,
                                                                job_info_description: e.target.value
                                                            })
                                                        }}
                                                    />

                                                </Row>
                                                <hr></hr>
                                                <Row>
                                                    <button type='submit'>
                                                        Send Message
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
                                </Row>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion.Item>
            </Accordion>

        </Container>
    );
};

export default Add;