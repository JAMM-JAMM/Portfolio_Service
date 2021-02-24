import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';


export default function Login(props) {
    var [sessionResult, setSessionResult] = useState({status: '', session: ''});
    return (
        <div>
            <Container>
                <h4>Login</h4>
                <Form
                    onSubmit = {async function(e) {
                        e.preventDefault();
                        let form = new FormData();
                        form.append('email', e.target.email.value);
                        form.append('password', e.target.password.value);
                        try {
                            await axios.post("http://localhost:5000/auth/login", form)
                                .then( response => {
                                    console.log('response: ', JSON.stringify(response));
                                    setSessionResult({
                                        status: JSON.stringify(response.status),
                                        session: JSON.stringify(response.data.result.session)
                                    });
                                    window.sessionStorage.setItem('session', sessionResult.session);
                                    console.log(sessionResult.status, sessionResult.session);
                                })
                            
                        } catch (error) {
                            console.log("error: ", error);
                        }
                        e.target.reset();
                    }}
                >   
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        </div>
    )
}