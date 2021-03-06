import React, { useState, useEffect } from 'react';
import Education from './Education';
import Awards from './Awards';
import Project from './Project';
import Certificate from './Certificate';
import Login from '../auth/Login';
import { Container, Col } from 'react-bootstrap';
import axios from 'axios';

export default function Portfolio() {
    const [userEmail, setUserEmail] = useState('');
    const [isLogin, setIsLogin] = useState(false);
   
    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        axios.get('http://localhost:5000/protected', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then( (response) => {
            console.log(response);
            setUserEmail(response.logged_in_as);
            setIsLogin(true);
        }).catch((error) => {
            alert('Login, Please!');
        })
    },[])

    return (
        <div>
        { isLogin ?
            <Container>
                <Col md={8}>
                    <Education />
                </Col>
                <hr />
                <Col md={8}>
                    <Awards />
                </Col>
                <hr />
                <Col md={8}>
                    <Project />
                </Col>
                <hr />
                <Col md={8}>
                    <Certificate />
                </Col>
            </Container>
        : <Login/>}
        </div>
    )
}