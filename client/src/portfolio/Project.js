import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Badge, ListGroup, ButtonGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment';

const url = 'http://localhost:5000';
const access_token = localStorage.getItem("access_token");
const email = localStorage.getItem('email');

function ProjectList(props) {
    const data = props.data;
    const data_id = data[0]

    const deleteProject = () => {
        axios.delete(url+'/portfolio/project', {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: {
                data_id: data_id
            }
        })
        .then( response => {
            console.log(response);
            alert("Delete Success!");
        })
        .catch( error => {
            console.log("error: ", error);
            alert("There is no project info!")
        })
    }

    return (
        <>
            <ListGroup variant="flush">
                <ListGroup.Item>Project Name: {data[1]}</ListGroup.Item>
                <ListGroup.Item>Project Description: {data[2]}</ListGroup.Item>
                <ListGroup.Item>Period: {moment(data[3]).format("YYYY-MM-DD")} ~ {moment(data[4]).format("YYYY-MM-DD")}</ListGroup.Item>
            </ListGroup>
            <Button
                variant="outline-primary"
                size="sm"
                type="button"
                onClick={function(e) {
                    e.preventDefault();
                    props.onChangeEdit(true);
                    props.onChangeEditId(data_id);
                }}
            >
                modify
            </Button>
            <Button
                variant="outline-primary"
                size="sm"
                type="button"
                onClick={deleteProject}
            >
                delete
            </Button>
        </>
    )
}

function EditProjectList(props) {
    const [projectName, setProjectName] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [projectStart, setProjectStart] = useState(new Date());
    const [projectEnd, setProjectEnd] = useState(new Date());

    const dataId = props.dataId;

    const modifyProject = (e) => {
        e.preventDefault();
        let putProjectData = new FormData();
        putProjectData.append('data_id', dataId);
        putProjectData.append('projectName', projectName);
        putProjectData.append('projectDesc', projectDesc);
        putProjectData.append('projectStart', moment(projectStart).format("YYYY-MM-DD"));
        putProjectData.append('projectEnd', moment(projectEnd).format("YYYY-MM-DD"));
        axios.put(url+'/portfolio/project', putProjectData, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        .then( response => {
            if (response.data.status === "success") {
                console.log(response);
                alert("Success modification for academic background info!");
                props.onChangeEdit(false);
            } else {
                alert(response.data.result.message);
            }
        })
        .catch( error => {
            console.log("error: ", error);
        })
    }

    return (
            <Container>
                <Form
                    onSubmit = {modifyProject}
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

function RegisterProjectList(props) {
    const [projectName, setProjectName] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [projectStart, setProjectStart] = useState(new Date());
    const [projectEnd, setProjectEnd] = useState(new Date());

    const registerProject = (e) => {
        e.preventDefault();
        let postProjectData = new FormData();
        postProjectData.append('user_email', email);
        postProjectData.append('projectName', projectName);
        postProjectData.append('projectDesc', projectDesc);
        postProjectData.append('projectStart', moment(projectStart).format("YYYY-MM-DD"));
        postProjectData.append('projectEnd', moment(projectEnd).format("YYYY-MM-DD"));
        axios.post(url+'/portfolio/project', postProjectData, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        .then( response => {
            if (response.data.status === "success") {
                console.log(response);
                alert("Success registragion for project info!");
                props.onChangeRegister(false);
            } else {
                alert(response.data.result.message);
            }
        })
        .catch( error => {
            console.log("error: ", error);
        })
    }

    return (
        <Container>
                <Form
                    onSubmit = {registerProject}
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

export default function Project() {
    const [projectData, setProjectData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [register, setRegister] = useState(false);
    const [dataId, setDataId] = useState();

    const showProject = () => {
        axios.get(url+'/portfolio/project', {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: {
                user_email: email
            }
        })
        .then( response => {
            if (response.data.status === "success") {
                console.log(response);
                setProjectData(response.data.result);
            }
        })
        .catch( error => {
            console.log("error: ", error);
        })
        setEdit(false)
        setRegister(false)
    }

    return (
        <div>
            <h4>
                <Badge variant="secondary">Projects</Badge>
            </h4>
                <ButtonGroup variant="light">
                    <Button
                        variant="outline-primary"
                        size="sm"
                        type="button"
                        onClick={showProject}
                    >
                        show
                    </Button>
                    <Button
                        variant="outline-primary"
                        size="sm"
                        type="button"
                        onClick={function(e) {
                        e.preventDefault();
                            setRegister(true);
                        }}
                    >
                        register
                    </Button>
                </ButtonGroup>
                {
                    projectData.map((data) => (
                        <ol key={data.toString()}>
                            <ProjectList 
                                data={data}
                                onChangeEdit={function(_mode) {
                                    setEdit(_mode);
                                }}
                                onChangeEditId={function(_editId) {
                                    setDataId(_editId);
                                }}
                            />
                        </ol>
                    ))
                }
                { edit ?
                    <EditProjectList 
                        dataId={dataId}
                        onChangeEdit={function(_mode) {
                            setEdit(_mode);
                        }}
                    />
                : null }
                { register ?
                    <RegisterProjectList
                        onChangeRegister={function(_mode) {
                            setRegister(_mode)
                        }}
                    />
                : null }
        </div>
    )
}