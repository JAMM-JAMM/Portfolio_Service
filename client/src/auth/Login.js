import React, { useState } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button, Container, Badge } from 'react-bootstrap';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';

const access_token = localStorage.getItem("access_token");

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authUrl = "http://localhost:5000";
    const history = useHistory();

    const submitLogin = async (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append('email', email);
        form.append('password', password);
        axios.post(authUrl+"/auth/login", form)
            .then( response => {
                console.log(response);
                if (response.data.status === "success") {
                    console.log(response);
                    alert("Login Success, Welcome Racer Portfolio Service!");
                    localStorage.setItem('access_token', response.data.result.access_token);
                    localStorage.setItem('email', response.data.result.email);
                    history.push('/')
                } else {
                    alert(response.data.result.error);
                }
            })
            .catch( error => {
                console.log("error: ", error);
            })
        }

    return (
             <div class="login">   
                <Router>
                    <Container fluid className={"no-gutters mx-0 px-0"}>
                        <Row noGutters={true}>
                            <Col xs={12}>
                            <Row className="justify-content-center">
                                <Col>
                                <Col md={{ span: 4, offset: 4 }}>
                                <h4>
                                    <Badge variant="secondary">Login</Badge>
                                </h4>
                                <Form 
                                    onSubmit = {submitLogin}
                                >
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            onChange = {(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            name="password"
                                            onChange = {(e) => setPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>
                                </Form>
                                </Col>
                                </Col>
                            </Row>
                            </Col>
                        </Row>
                    </Container>
                </Router>
            </div>
    )
}