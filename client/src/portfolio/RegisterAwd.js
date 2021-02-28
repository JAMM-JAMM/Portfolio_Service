import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Badge } from 'react-bootstrap';
import axios from 'axios';

const awdUrl = 'http://localhost:5000';

export default function RegisterAwd(props) {
    const [awardName, setAwardName] = useState("");
    const [awardDesc, setAwardDesc] = useState("");

    const registerAwd = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('email');
        let awdData = new FormData();
        awdData.append('user_email', email);
        awdData.append('awardName', awardName);
        awdData.append('awardDesc', awardDesc);
        try {
            await axios.post(awdUrl+'/portfolio/awards', awdData)
                .then( response => {
                    if (response.data.status === "success") {
                        console.log('response: ', JSON.stringify(response));
                        alert("Success, register awards info!");
                        props.setAwdMode("READAWD")
                    } else {
                        alert("Fail")
                    }
                })
        } catch (error) {
            console.log("error: ", error);
        }
        e.target.reset();
    }

    return (
        <>
            <Container>
                <Form
                    onSubmit = {registerAwd}
                >
                    <h4>
                        <Badge variant="secondary">Awards Register</Badge>
                    </h4>
                    <Form.Group as={Row} controlId = "formBasicAwardName">
                        <Form.Label column sm={2}>Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter award name"
                                name = "awardName"
                                onChange = {(e) => setAwardName(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId = "formBasicAwardDesc">
                        <Form.Label column sm={2}>Description</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter award description"
                                name = "awardDescr"
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
    );
}
