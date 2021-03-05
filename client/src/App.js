import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './auth/Main';
import Login from './auth/Login';
import Register from './auth/Register';
import Portfolio from './portfolio/Portfolio';
import Navi from './auth/Navi';
import Network from './portfolio/Network';
import User from './portfolio/User';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Home({ match }) {

    return (
        <>  
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
        </>
    )
}

export default Home;