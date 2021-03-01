import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Container, Badge, ListGroup, ButtonGroup } from 'react-bootstrap';
import RegisterCer from './RegisterCer';
import ModifyCer from './ModifyCer';
import * as moment from 'moment';

const url = 'http://localhost:5000';

export default function Certificate() {
    const [cerMode, setCerMode] = useState("READCER");
    const [certificateN, setCertificateN] = useState("");
    const [certificateP, setCertificateP] = useState("");
    const [certificateI, setCertificateI] = useState("");

    let cerArticle = null;

    const showCer = async (e) => {
        try {
            await axios.get(url+'/portfolio/certificate', {
                params: {
                    user_email: localStorage.getItem('email')
                }
            })
            .then( response => {
                setCertificateN(response.data.result[0][1]);
                setCertificateP(response.data.result[0][2]);
                setCertificateI(moment(response.data.result[0][3]).format("YYYY-MM-DD"));
            })
        } catch (error) {
            console.log("error: ", error);
            alert("Register Certificate Info!");
        }
        setCerMode("READCER");
    }

    const deleteCer = async (e) => {
        try {
            await axios.delete(url +'/portfolio/certificate', {
                params: {
                    user_email: localStorage.getItem('email')
                }
            })
            .then( response => {
                setCertificateN('');
                setCertificateP('');
                setCertificateI('');
                alert("Delete Success!")
            })
        } catch (error) {
            console.log("error: ", error);
            alert("There is no certificate info");
        }
        setCerMode("READCER");
    }

    if (cerMode === "REGISTERCER") {
        cerArticle = <RegisterCer 
                        onChangeMode = {function(_mode) {
                            setCerMode(_mode)
                        }}
                    />
    } else if (cerMode === "MODIFYCER") {
        cerArticle = <ModifyCer 
                        onChangeMode = {function(_mode) {
                            setCerMode(_mode)
                        }}
                    />
    }

    return (
        <Container className="vh-100" fluid>
            <Row className="h-100">
                <Col xs={12} className="login">
                <Row className="justify-content-center">
                    <Col>
                    <Col md={{ span: 4, offset: 4 }}>
                    <h4>
                        <Badge variant="secondary">Certificate</Badge>
                    </h4>
                        <ButtonGroup variant="light">
                            <Button
                                variant="outline-primary"
                                size="sm"
                                type="button"
                                onClick={showCer}
                            >
                                show
                            </Button>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                type="button"
                                onClick={function(e) {
                                    e.preventDefault();
                                    setCerMode("REGISTERCER");
                                }}
                            >
                                register
                            </Button>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                type="button"
                                onClick={function(e) {
                                    e.preventDefault();
                                    setCerMode("MODIFYCER");
                                }}
                            >
                                modify
                            </Button>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                type="button"
                                onClick={deleteCer}
                            >
                                delete
                            </Button>
                        </ButtonGroup>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Certificate: {certificateN}</ListGroup.Item>
                            <ListGroup.Item>Certificate Provider:  {certificateP}</ListGroup.Item>
                            <ListGroup.Item>Issue Date: {certificateI}</ListGroup.Item>
                        </ListGroup>
                        {cerArticle}
                    </Col>
                    </Col>
                </Row>
                </Col>
            </Row>
        </Container>
    )
}
