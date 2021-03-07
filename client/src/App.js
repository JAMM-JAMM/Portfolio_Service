import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './auth/Main';
import Login from './auth/Login';
import Register from './auth/Register';
import Portfolio from './portfolio/Portfolio';
import Navi from './auth/Navi';
import Network from './portfolio/Network';
import User from './portfolio/User';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Home() {

    return (
        <div>  
            <Router>
                <Navi />
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route path='/portfolio' component={Portfolio} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register}/>
                    <Route path='/network' component={Network} />
                    <Route path='/user/:id' children={<User/>} />
                </Switch>
            </Router>
            <br/>
            <div className="bottom-nav">
                <Navbar fixed="bottom" bg="light" variant="light">
                    <Navbar.Collapse className="justify-content-center">
                        <Navbar.Text>
                            copyright ⓒ 2021 All rights reserved by JAMM-JAMM.
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    )
}

export default Home;