import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Portfolio from './components/Portfolio';
import { Row, Container, Col, Nav, Navbar } from 'react-bootstrap';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

function Home() {
    return (
        <>  
            <BrowserRouter>
            <Navbar className = "justify-content-center" bg = "light" variant = "lignt">
                <Navbar.Brand>Racer Portfolio Service</Navbar.Brand>
                <Nav className = "justify-content-end" >
                    <Nav.Item>
                        <Nav.Link to="/auth/login">
                            Login
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link to="/auth/register">
                            Register
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/auth/login"
                            onClick = {function() {
                                localStorage.removeItem('access_token');
                                localStorage.removeItem('email');
                            }}>
                            Logout
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>

            <Route path="/auth/login">
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <Login />
                        </Col>
                    </Row>
                </Container>
            </Route>
            </BrowserRouter>
        </>
    )
}

export default Home;