import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Badge } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment';

const url = "http://elice-kdt-ai-track-vm-racer-31.koreacentral.cloudapp.azure.com/api";

export default function RegisterPro(props) {
    const [projectName, setProjectName] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [projectStart, setProjectStart] = useState(new Date());
    const [projectEnd, setProjectEnd] = useState(new Date());

    const registerPro = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('email');
        let proData = new FormData();
        proData.append('user_email', email);
        proData.append('projectName', projectName);
        proData.append('projectDesc', projectDesc);
        proData.append('projectStart', moment(projectStart).format("YYYY-MM-DD"));
        proData.append('projectEnd', moment(projectEnd).format("YYYY-MM-DD"));
        try {
            await axios.post(url+'/portfolio/project', proData)
                .then( response => {
                    if (response.data.status === "success") {
                        console.log('response: ', JSON.stringify(response))
                        alert("Success, register project info!");
                        props.setProMode("READPRO");
                    } else {
                        alert("Fail")
                    }
                })
        } catch (error) {
            console.log("error: ", error);
        }
    }

    return (
            <Container>
                <Form
                    onSubmit = {registerPro}
                >
                    <h4>
                        <Badge variant="secondary">Project Register</Badge>
                    </h4>
                    <Form.Group as={Row} controlId = "formBasicProjectName">
                        <Form.Label column sm={4}>Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter project name"
                                name = "projectName"
                                onChange = {(e) => setProjectName(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId = "formBasicProjectDesc">
                        <Form.Label column sm={4}>Description</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter project description"
                                name = "projectDesc"
                                onChange = {(e) => setProjectDesc(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label column sm={5}>Period</Form.Label>
                        <DatePicker 
                            locale={ko}
                            placeholderText="Project Start"
                            selected={projectStart}
                            onChange={date => setProjectStart(date)}
                            dateFormat="yyyy-MM-dd"
                        />
                        <DatePicker
                            locale={ko}
                            placeholderText="Project End"
                            selected={projectEnd}
                            onChange={date => setProjectEnd(date)}
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