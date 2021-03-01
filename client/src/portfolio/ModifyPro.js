import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Badge } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment';



const url = 'http://localhost:5000';

export default function RegisterPro(props) {
    const [projectName, setProjectName] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [projectStart, setProjectStart] = useState(new Date());
    const [projectEnd, setProjectEnd] = useState(new Date());

    const modifyPro = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('email');
        let proData = new FormData();
        proData.append('user_email', email);
        proData.append('projectName', projectName);
        proData.append('projectDesc', projectDesc);
        proData.append('projectStart', moment(projectStart).format("YYYY-MM-DD"));
        proData.append('projectEnd', moment(projectEnd).format("YYYY-MM-DD"));
        try {
            await axios.put(url+'/portfolio/project', proData)
                .then( response => {
                    if (response.data.status === "success") {
                        console.log('response: ', JSON.stringify(response))
                        alert("Success, modify project info!");
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
                    onSubmit = {modifyPro}
                >
                    <h4>
                        <Badge variant="secondary">Project Modify</Badge>
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
                            Modify
                        </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
    )
}