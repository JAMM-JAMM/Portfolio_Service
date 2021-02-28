import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './auth/Main';
import Login from './auth/Login';
import Register from './auth/Register';
import Portfolio from './portfolio/Portfolio';
import { Nav, Navbar, Badge } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route, Switch, useHistory } from 'react-router-dom';

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
        <>  
            <Router>
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
                            <Nav.Link href="/"
                                onClick = {checkLogout}>
                                Logout
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route path='/portfolio' component={Portfolio} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register}/>
                </Switch>
            </Router>
        </>
    )
}

export default Home;