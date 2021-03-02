import React, { useState } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button, Container, Badge } from 'react-bootstrap'; 
import { BrowserRouter, useHistory } from 'react-router-dom';

export default function Register() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const serverUrl = "http://elice-kdt-ai-track-vm-racer-31.koreacentral.cloudapp.azure.com:5000/api";

    const history = useHistory();

    const submitRegister = async (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append('fullname', fullname);
        form.append('email', email);
        if (password === confirmPassword) {
            form.append('password', confirmPassword);
        }
        try {
            await axios.post(serverUrl+"/auth/register", form)
                .then( response => {
                    console.log('response: ', JSON.stringify(response));
                    if (response.data.status === "success") {
                        console.log(response);
                        alert("Register Success, Go to Login!");
                        history.push("/login");
                    } else {
                        alert(response.data.result.error);
                    }
                })
        } catch (error) {
            console.log("error: ", error);
        }
        e.target.reset();
    }
    
    return (
        <BrowserRouter>
        <Container className="vh-100" fluid>
            <Row className="h-100">
                <Col xs={12} className="login">
                <Row className="justify-content-center">
                    <Col>
                    <Col md={{ span: 4, offset: 4 }}>
                    <h4>
                        <Badge variant="secondary">Register</Badge>
                    </h4>
                    <Form 
                        onSubmit = {submitRegister}
                    >
                        <Form.Group controlId="formBasicFullname">
                            <Form.Label>Fullname</Form.Label>
                            <Form.Control 
                                type="fullname"
                                placeholder="Enter fullname"
                                name="fullname"
                                onChange = {(e) => setFullname(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange = {(e) => setEmail(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                Check your email.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                onChange = {function(e) {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="confirm_password"
                                onChange = {function(e) {
                                    setConfirmPassword(e.target.value);
                                }}
                            />
                            <Form.Text className="text-muted">
                                Check your password.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                    </Col>
                    </Col>
                </Row>
                </Col>
            </Row>
        </Container>
        </BrowserRouter>
    )
}