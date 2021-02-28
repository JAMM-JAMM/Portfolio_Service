import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './auth/Login';
import Register from './auth/Register';
import Portfolio from './portfolio/Portfolio';
import { Nav, Navbar, Badge } from 'react-bootstrap';
import { BrowserRouter, Redirect, Link, Route, Switch } from 'react-router-dom';

function Home() {

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
        <>  <BrowserRouter>
                <Navbar className = "justify-context-center" bg = "light" variant = "light">
                    <Navbar.Brand>
                        <Badge variant="secondary"><Link to ="/">Racer Portfolio Service</Link></Badge>
                    </Navbar.Brand>
                    <Nav className = "ml-auto" >
                        <Nav.Item>
                            <Nav.Link as={Link} to="/auth/login">
                                Login
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/auth/register">
                                Register
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link to="/"
                                onClick = {checkLogout}>
                                Logout
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                <Switch>
                    <Route exact path="/portfolio" component={Portfolio}/>
                    <Route path="/auth/login">
                        <Login />
                    </Route>
                    <Route path="/auth/register">
                        <Register />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Home;