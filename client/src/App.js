import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Control from './components/Control';
import Login from './components/Login';
import Register from './components/Register';
import { Container } from 'react-bootstrap';

function Home() {
    var [mode, setMode] = useState("HOME");
    var article = null;
    if (mode === "LOGIN") {
        article = <Login />
    } else if (mode === "REGISTER") {
        article = <Register />
    }
    return (
        <>  
            <Container>
                <h3>Racer Portfolio Service</h3>
                <br/>
                <Control 
                    onChangeMode = {function(_mode) {
                        setMode(_mode);
                    }}
                />
                <br/>
                {article}
            </Container>
        </>
    )
}

export default Home;