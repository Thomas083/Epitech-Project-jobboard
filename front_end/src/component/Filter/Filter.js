import React from 'react';
import { Form, Accordion } from 'react-bootstrap';


const Filter = () => {
    return (
        <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Contract</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Form.Check type="checkbox" label="CDI" />
                        <Form.Check type="checkbox" label="CDD" />
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Date of Publication</Accordion.Header>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>TeleWorking</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Form.Check type="checkbox" label="Yes" />
                        <Form.Check type="checkbox" label="No" />
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Categories</Accordion.Header>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
                <Accordion.Header>Wages</Accordion.Header>
            </Accordion.Item>
        </Accordion>
    );
}

export default Filter;