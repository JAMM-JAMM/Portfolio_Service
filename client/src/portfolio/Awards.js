import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Container, Badge, ListGroup, ButtonGroup } from 'react-bootstrap';
import RegisterAwd from './RegisterAwd';
import ModifyAwd from './ModifyAwd';

const awdUrl = 'http://localhost:5000';

export default function Awards() {
    const [awdMode, setAwdMode] = useState("READAWD");
    const [awardName, setAwardName] = useState("");
    const [awardDesc, setAwardDesc] = useState("");

    let awdArticle = null;

    const showAwd = async (e) => {
            try {
                await axios.get(awdUrl+'/portfolio/awards', {
                    params: {
                        user_email: localStorage.getItem('email')
                    }
                })
                .then( response => {
                    setAwardName(response.data.result[0][1]);
                    setAwardDesc(response.data.result[0][2]);
                    })
        
            } catch (error) {
                console.log("error: ", error);
                alert("Register Award Info!")
            }
            setAwdMode("READAWD")
    }

    const deleteAwd = async (e) => {
        try {
            await axios.delete(awdUrl+'/portfolio/awards', {
                params: {
                    user_email: localStorage.getItem('email')
                }
            })
            .then( response => {
                    setAwardName('');
                    setAwardDesc('');
                alert("Delete Success!");
                })
        } catch (error) {
            console.log("error: ", error);
            alert("There is no award info");
        }
        setAwdMode("READAWARD")
    }    

    if (awdMode === "REGISTERAWD") {
        awdArticle = <RegisterAwd
                        onChangeMode = {function(_mode) {
                            setAwdMode(_mode)
                        }}
                    />
    } else if (awdMode === "MODIFYAWD") {
        awdArticle = <ModifyAwd 
                        onChangeMode = {function(_mode) {
                            setAwdMode(_mode)
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
                        <Badge variant="secondary">Awards</Badge>
                    </h4>
                        <ButtonGroup variant="light">
                            <Button
                                variant="outline-primary"
                                size="sm"
                                type="button"
                                onClick={showAwd}
                            >
                                show
                            </Button>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                type="button"
                                onClick={function(e) {
                                    e.preventDefault();
                                    setAwdMode("REGISTERAWD");
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
                                    setAwdMode("MODIFYAWD");
                                }}
                            >
                                modify
                            </Button>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                type="button"
                                onClick={deleteAwd}
                            >
                                delete
                            </Button>
                        </ButtonGroup>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Award Name: {awardName}</ListGroup.Item>
                            <ListGroup.Item>Award Description: {awardDesc}</ListGroup.Item>
                        </ListGroup>
                        {awdArticle}
                    </Col>
                    </Col>
                </Row>
                </Col>
            </Row>
        </Container>
    );
}