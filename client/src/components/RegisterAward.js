import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function RegisterAward(props) {
    const [awardName, setAwardName] = useState('');
    const [awardDesc, setAwardDesc] = useState('');

    const awardUrl = "http://localhost:5000/portfolio/awards";

    const registerAward = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('email');
        let awardData = new FormData();
        awardData.append('user_email', email);
        awardData.append('awardName', awardName);
        awardData.append('awardDesc', awardDesc);
        try {
            await axios.post(awardUrl, awardData)
                .then( response => {
                    console.log('response: ', JSON.stringify(response));
                })
        } catch (error) {
            console.log("error: ", error)
        }
        e.target.reset();
        props.onChangeMode("READAWARD");
    }
    return (
        <>
            <Container>
                <Form
                    onSubmit = {registerAward}
                >
                    <Form.Group as={Row} controlId = "formBasicAwardName">
                        <Form.Label column sm={2}>Award Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter award name"
                                name = "awardName"
                                onChange = {(e) => setAwardName(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as = {Row} controlId = "formBasicAwardDesc">
                        <Form.Label column sm={2}>Award Desc</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter award description"
                                name = "awardDesc"
                                onChange = {(e) => setAwardDesc(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2}}>
                        <Button variant = "primary" type = "submit">
                            Register
                        </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        </>
    )
}