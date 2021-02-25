import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function RegisterAward(props) {
    const [awardName, setAwardName] = useState('');
    const [awardDesc, setAwardDesc] = useState('');

    const awardUrl = "http://localhost:5000/portfolio/awards";

    const registerAward = async (e) => {
        e.preventDefault();
        let awardData = new FormData();
        awardData.append('awardName', awardName);
        awardData.append('awardDesc', awardDesc);
        try {
            await axios.post(awardUrl, awardData)
                .then( response => {
                    console.log('response: ', JSON.stringify(response));
                })
        } catch (error) {
            console.log("error: ", error)
        }
        e.target.reset();
        props.onChangeMode("READAWARD");
    }
    return (
        <>
            <Container>
                <h4>수상 정보</h4>
                <Form
                    onSubmit = {registerAward}
                >
                    <Form.Group controlId = "formBasicAwardName">
                        <Form.Label>Award Name</Form.Label>
                        <Form.Control
                            type = "text"
                            placeholder = "Enter award name"
                            name = "awardName"
                            onChange = {(e) => setAwardName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId = "formBasicAwardDesc">
                        <Form.Label>Award Desc</Form.Label>
                        <Form.Control
                            type = "text"
                            placeholder = "Enter award description"
                            name = "awardDesc"
                            onChange = {(e) => setAwardDesc(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant = "primary" type = "submit">
                        Register
                    </Button>
                </Form>
            </Container>
        </>
    )
}