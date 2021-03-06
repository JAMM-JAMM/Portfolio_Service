import React, { useState, useEffect } from 'react';
import Education from './Education';
import Awards from './Awards';
import Project from './Project';
import Certificate from './Certificate';
import Login from '../auth/Login';
import { Container, Col, Row, Jumbotron } from 'react-bootstrap';
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
                <Col>
                <Jumbotron>
                    <h2>My Portfolio page</h2>
                    <h6>You can register, modify, and delete your portfolio.</h6><br/>
                    <h5>Academic Background: University, Major, Degree</h5>
                    <h5>Award: Award Name, Award Description</h5>
                    <h5>Project: Project Name, Project Description, Project Period</h5>
                    <h5>Certificate: Certificate Name, Certificate Provider, Certificate Issue Date</h5>
                </Jumbotron>
                </Col>
                <Row>
                <Col>
                    <Education />
                </Col>
                <hr />
                <Col>
                    <Awards />
                </Col>
                </Row>
                <hr />
                <Row>
                <Col>
                    <Project />
                </Col>
                <hr />
                <Col>
                    <Certificate />
                </Col>
                </Row>
            </Container>
        : <Login/>}
        </div>
    )
}