import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';


export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authUrl = "http://localhost:5000";

    const submitLogin = async (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append('email', email);
        form.append('password', password);
        try {
            await axios.post(authUrl+"/auth/login", form)
                .then( response => {
                    console.log('response: ', JSON.stringify(response));
                    if (response.data.status === "success") {
                        props.onChangeMode("PORTFOLIO");
                        localStorage.setItem('access_token', response.data.result.access_token);
                        localStorage.setItem('email', response.data.result.email);
                    } else {
                        props.onChangeMode("LOGIN");
                    }
                })
        } catch (error) {
            console.log("error: ", error);
        }
        e.target.reset();
    }
    return (
        <div>
            <Container>
                <h4>Login</h4>
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
            </Container>
        </div>
    )
}