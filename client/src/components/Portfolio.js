import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

function Education() {
    var [university, setUniversity] = useState(null);
    var [major, setMajor] = useState(null);
    var [degree, setDegree] = useState(null);

    const eduUrl = "http://localhost:5000";

    const registerEducation = async (e) => {
        e.preventDefault();
        let eduData = {'university': university, 'major': major, 'degree': degree};
        try {
            await axios.post(eduUrl+'/portfolio/education', eduData)
                .then( response => {
                    console.log('response: ', JSON.stringify(response));
                })
        } catch (error) {
            console.log("error: ", error);
        }
        e.target.reset();
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

export default function Portfolio() {
    return (
        <Education/>
    );
}