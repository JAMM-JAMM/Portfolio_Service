import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Badge } from 'react-bootstrap';
import axios from 'axios';

export default function RegisterEdu(props) {
    const [university, setUniversity] = useState('');
    const [major, setMajor] = useState('');
    const [degree, setDegree] = useState('');

    const eduUrl = "http://localhost:5000";

    const registerEducation = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('email');
        console.log(email, university, major, degree);
        let eduData = new FormData();
        eduData.append('user_email', email);
        eduData.append('university', university);
        eduData.append('major', major);
        eduData.append('degree', degree);
        try {
            await axios.post(eduUrl+'/portfolio/education', eduData)
                .then( response => {
                    if (response.data.status === "success") {
                        console.log('response: ', JSON.stringify(response));
                        alert("Success, register academic background info!");
                        props.setEduMode("READEDU")
                    } else {
                        alert("Fail")
                    }
                })
        } catch (error) {
            console.log("error: ", error);
        }
        e.target.reset();
    }

    return (
        <>
            <Container>
                <Form
                    onSubmit = {registerEducation}
                >
                    <h4>
                        <Badge variant="secondary">Academic Background Register</Badge>
                    </h4>
                    <Form.Group as={Row} controlId = "formBasicUniversity">
                        <Form.Label column sm={2}>University</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter university"
                                name = "university"
                                onChange = {(e) => setUniversity(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId = "formBasicMajor">
                        <Form.Label column sm={2}>Major</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter major"
                                name = "major"
                                onChange = {(e) => setMajor(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <fieldset>
                    <Form.Group as={Row}>
                        <Form.Label as='legend' column sm={2}>Degree</Form.Label>
                        <Col sm={10}>
                        <Form.Check
                            type = "radio"
                            label= "재학중"
                            name = "degree"
                            id = "1"
                            onChange = {(e) => setDegree("재학중")}
                        />
                        <Form.Check
                            type = "radio"
                            label= "학사 졸업"
                            name = "degree"
                            id = "2"
                            onChange = {(e) => setDegree("학사 졸업")}
                        />
                        <Form.Check
                            type = "radio"
                            label= "석사 졸업"
                            name = "degree"
                            id = "3"
                            onChange = {(e) => setDegree("석사 졸업")}
                        />
                        <Form.Check
                            type = "radio"
                            label= "박사 졸업"
                            name = "degree"
                            id = "4"
                            onChange = {(e) => setDegree("박사 졸업")}
                        />
                        </Col>
                    </Form.Group>
                    </fieldset>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2}}>
                        <Button variant = "primary" type = "submit">
                            Register
                        </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}
