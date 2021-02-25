import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function RegisterEdu(props) {
    const [university, setUniversity] = useState('');
    const [major, setMajor] = useState('');
    const [degree, setDegree] = useState('');

    const eduUrl = "http://localhost:5000";

    const registerEducation = async (e) => {
        e.preventDefault();
        let eduData = new FormData();
        eduData.append('university', university);
        eduData.append('major', major);
        eduData.append('degree', degree);
        try {
            await axios.post(eduUrl+'/portfolio/education', eduData)
                .then( response => {
                    console.log('response: ', JSON.stringify(response));
                })
        } catch (error) {
            console.log("error: ", error);
        }
        e.target.reset();
        props.onChangeMode("READEDU");
    }

    return (
        <>
            <Container>
                <h4>학력</h4>
                <Form
                    onSubmit = {registerEducation}
                >
                    <Form.Group controlId = "formBasicUniversity">
                        <Form.Label>University</Form.Label>
                        <Form.Control
                            type = "text"
                            placeholder = "Enter university"
                            name = "university"
                            onChange = {(e) => setUniversity(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId = "formBasicMajor">
                        <Form.Label>Major</Form.Label>
                        <Form.Control
                            type = "text"
                            placeholder = "Enter major"
                            name = "major"
                            onChange = {(e) => setMajor(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId = "formBasicDegree">
                        <Form.Label>Degree</Form.Label>
                        <Form.Control
                            type = "text"
                            placeholder = "Enter degree"
                            name = "degree"
                            onChange = {(e) => setDegree(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant = "primary" type = "submit">
                        Register
                    </Button>
                </Form>
            </Container>
        </>
    );
}
