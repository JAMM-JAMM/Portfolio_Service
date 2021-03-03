import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navi() {

    const checkLogout = (e) => {
        e.preventDefault();
        if (localStorage.getItem('access_token')) {
            alert("Logout Success!")
            localStorage.removeItem('access_token');
            localStorage.removeItem('email');
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
                                Portfolio
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                onClick = {checkLogout}>
                                Logout
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
        </div>
    );
}