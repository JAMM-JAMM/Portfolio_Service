import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Badge } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment';

const url = "http://elice-kdt-ai-track-vm-racer-31.koreacentral.cloudapp.azure.com:5000/api";

export default function RegisterCer(props) {
    const [certificateN, setCertificateN] = useState("");
    const [certificateP, setCertificateP] = useState("");
    const [certificateI, setCertificateI]=  useState(new Date());

    const registerCer = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('email');
        let cerData = new FormData();
        cerData.append('user_email', email);
        cerData.append('certificateN', certificateN);
        cerData.append('certificateP', certificateP);
        cerData.append('certificateI', moment(certificateI).format("YYYY-MM-DD"));
        try {
            await axios.post(url+'/portfolio/certificate', cerData)
                .then( response => {
                    if (response.data.status === "success") {
                        console.log('response: ', JSON.stringify(response))
                        alert("Success, register certificate info!");
                        props.setCerMode("READCER");
                    } else {
                        alert("Fail");
                    }
                })
        } catch (error) {
            console.log("error: ", error)
        }
    }


    return (
            <Container>
                <Form
                    onSubmit = {registerCer}
                >
                    <h4>
                        <Badge variant="secondary">Certificate Register</Badge>
                    </h4>
                    <Form.Group as={Row} controlId = "formBasicCertificatetName">
                        <Form.Label column sm={4}>Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter certificate name"
                                name = "certificate Name"
                                onChange = {(e) => setCertificateN(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId = "formBasicCertificateProvider">
                        <Form.Label column sm={4}>Provider</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter project provider"
                                name = "certificate Provider"
                                onChange = {(e) => setCertificateP(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label column sm={5}>Issue Date</Form.Label>
                        <DatePicker 
                            locale={ko}
                            placeholderText="Issue date"
                            selected={certificateI}
                            onChange={date => setCertificateI(date)}
                            dateFormat="yyyy-MM-dd"
                        />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2}}>
                        <Button variant = "primary" type = "submit">
                            Register
                        </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
    )
}