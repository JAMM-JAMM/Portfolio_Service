import React, { useState, useEffect } from 'react';
import Education from './Education';
import Awards from './Awards';
import Project from './Project';
import Certificate from './Certificate';
import Login from '../auth/Login';
import { Container, Col, Row, Jumbotron, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Portfolio() {
    const [userEmail, setUserEmail] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const history = useHistory();
   
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
            console.log("error: ", error);
            alert("Login, Please!")
            localStorage.clear();
            history.push('/login')
        })
    },[])

    return (
        <div>
        { isLogin ?
            <Container>
                <Col>
                <br/>
                <Jumbotron>
                    <h2>My Portfolio page</h2>
                    <h6>You can register, modify, and delete your portfolio.</h6><br/>
                    <Row>
                        <Col sm>
                            <h5>Academic Background</h5>
                            <p>University, Major, Degree</p>
                        </Col>
                        <Col sm>
                            <h5>Award</h5>
                            <p>Award Name, Award Description</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <h5>Project</h5>
                            <p>Project Name, Project Description, Project Period</p>
                        </Col>
                        <Col sm>
                            <h5>Certificate</h5>
                            <p>Certificate Name, Certificate Provider, Certificate Issue Date</p>
                        </Col>
                    </Row>
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
                <hr/>
                <Row>
                    <Col>
                        <br/>
                        <br/>
                        <br/>
                    </Col>
                </Row>
            </Container>
        : 
            <Container>
                <br/>
                <br/>
                <center>
                    <Spinner animation="border" />
                </center>
            </Container>
        }
        </div>
    )
}