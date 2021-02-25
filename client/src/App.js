import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Control from './components/Control';
import Login from './components/Login';
import Register from './components/Register';
import { Container } from 'react-bootstrap';

function Education() {

    var [eduData, setEduData] = useState([]);

    const eduUrl = `http://localhost:5000/education`;

    async function Fetcheducation() {
        const response = await axios.get(eduUrl);
        console.log(response);
        setEduData(response.data);
    };

    return (
        <>
            <h4>학력</h4>
            <div></div>
        </>
    );
}

function Portfolio() {
    return (
        <Education/>
    );
}

function Home() {
    var [mode, setMode] = useState("HOME");
    var article = null;
    if (mode === "LOGIN") {
        article = <Login 
                    onChangeMode = {function(_mode) {
                        setMode(_mode);
                    }}
                />
    } else if (mode === "REGISTER") {
        article = <Register 
                    onChangeMode = {function(_mode) {
                        setMode(_mode);
                    }}
                />
    } else if (mode === "PORTFOLIO") {
        article = <Portfolio />
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