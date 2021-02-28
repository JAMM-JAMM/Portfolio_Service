import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Container, Badge, ListGroup, ButtonGroup } from 'react-bootstrap';
import RegisterEdu from './RegisterEdu';

const eduUrl = 'http://localhost:5000';

export default function Education() {
    const [eduMode, setEduMode] = useState('READEDU');
    const [university, setUniversity] = useState('');
    const [major, setMajor] = useState('');
    const [degree, setDegree] = useState('');

    let eduArticle = null;

    const showEdu = async (e) => {
            try {
                await axios.get(eduUrl+'/portfolio/education', {
                    params: {
                        user_email: localStorage.getItem('email')
                    }
                })
                .then( response => {
                    setUniversity(response.data.result[0][1]);
                    setMajor(response.data.result[0][2]);
                    setDegree(response.data.result[0][3]);
                    })
        
            } catch (error) {
                console.log("error: ", error);
                alert("Register Academic Background Info!")
            }
            setEduMode("READEDU")
    }

    if (eduMode === "REGISTEREDU") {
        eduArticle = <RegisterEdu
                        onChangeMode = {function(_mode) {
                            setEduMode(_mode)
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
                        <Badge variant="secondary">Academic Background</Badge>
                    </h4>
                        <ButtonGroup variant="light">
                            <Button
                                variant="outline-primary"
                                size="sm"
                                type="button"
                                onClick={showEdu}
                            >
                                show
                            </Button>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                type="button"
                                onClick={function(e) {
                                    e.preventDefault();
                                    setEduMode("REGISTEREDU");
                                }}
                            >
                                register
                            </Button>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                type="button"
                            >
                                modify
                            </Button>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                type="button"
                            >
                                delete
                            </Button>
                        </ButtonGroup>
                        <ListGroup variant="flush">
                            <ListGroup.Item>University: {university}</ListGroup.Item>
                            <ListGroup.Item>Major: {major}</ListGroup.Item>
                            <ListGroup.Item>Degree: {degree}</ListGroup.Item>
                        </ListGroup>
                        {eduArticle}
                    </Col>
                    </Col>
                </Row>
                </Col>
            </Row>
        </Container>
    );
}