import React from "react";
import { Container, Row } from "react-bootstrap";
import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";
import Form_society from "../component/Log/Form/Form_Society";

const Post_Advert = () => {
    return (
        <Container>
            <Row><Header /></Row>
            <Form_society />
            <Footer /> 
        </Container>
    )
}

export default Post_Advert;