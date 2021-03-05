import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Badge } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

export default function Navi() {
    const history = useHistory();
    
    const doLogout = () => {
        if (localStorage.getItem('access_token')) {
            alert("Logout Success!")
            localStorage.removeItem('access_token');
            localStorage.removeItem('email');
            history.push('/')
        } else {
            alert("You're not logged in yet. Please log in first!");
        }
    }


    return (
        <div>
            <Navbar className = "justify-context-center" bg = "light" variant = "light">
                    <Navbar.Brand>
                        <Badge variant="secondary"><Link to ="/">Racer Portfolio Service</Link></Badge>
                    </Navbar.Brand>
                    <Nav className = "ml-auto" >
                        <Nav.Item>
                            <Nav.Link href="/login">
                                Login
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/register">
                                Register
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/portfolio">
                                MyPortfolio
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/network">
                                Network
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                        onClick = {doLogout}>
                        Logout
                    </Nav.Link>
                </Nav.Item>
                    </Nav>
                </Navbar>
        </div>
    );
}