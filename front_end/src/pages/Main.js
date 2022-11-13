import React from 'react';
import Header from '../component/Header/Header';
import Footer from '../component/Footer/Footer';
import Filter from '../component/Filter/Filter';
import { Container, Row, Col } from 'react-bootstrap';
import Ads from '../component/Add/Ads';

const Main = () => {

    return (
        <main>
            <Container>
                <Row><Header /></Row>
                <Row id="scroll" className='scroll-settings'>
                    <Col className="d-none d-md-block" sm='2'><Filter /></Col>
                    <Col xs='12' md='10'>
                        <Ads />
                    </Col>
                </Row>
                <Row><Footer /></Row>
            </Container>
        </main>
    );
};

export default Main;