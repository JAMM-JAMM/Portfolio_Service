import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Badge, ButtonGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment';
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
    },
  }))

const url = 'http://localhost:5000';
const access_token = localStorage.getItem("access_token");
const email = localStorage.getItem('email');

function ProjectList(props) {
    const classes = useStyles()
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
            <br/>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                    Project Name
                </Typography>
                <Typography variant="body1">{data[1]}</Typography>
                <Typography variant="h6" gutterBottom>
                    Project Description
                </Typography>
                <Typography variant="body1">{data[2]}</Typography>
                <Typography variant="h6" gutterBottom>
                    Project Period
                </Typography>
                <Typography variant="body1">{moment(data[3]).format("YYYY-MM-DD")} ~ {moment(data[4]).format("YYYY-MM-DD")}</Typography>
            </Paper>
            <br/>
            <Button
                variant="outline-secondary"
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
                variant="outline-secondary"
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
                    <Badge variant="secondary">Project Modify</Badge>
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
                    <Form.Group as={Row} controlId = "formBasicProjectStart">
                        <Form.Label column sm={4}>Project Start</Form.Label>
                        <Col sm={10}>
                        <DatePicker 
                            locale={ko}
                            placeholderText="Project Start"
                            selected={projectStart}
                            onChange={date => setProjectStart(date)}
                            dateFormat="yyyy-MM-dd"
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId = "formBasicProjectEnd">
                        <Form.Label column sm={4}>Project End</Form.Label>
                        <Col sm={10}> 
                        <DatePicker
                            locale={ko}
                            placeholderText="Project End"
                            selected={projectEnd}
                            onChange={date => setProjectEnd(date)}
                            dateFormat="yyyy-MM-dd"
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2}}>
                        <Button variant = "secondary" type = "submit">
                            Modify
                        </Button>{'  '}
                        <Button variant = "secondary" onClick={function(e) {
                            props.onChangeEdit(false)
                        }}>
                            Cancel
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
                    <Badge variant="secondary">Project Register</Badge>
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
                    <Form.Group as={Row} controlId = "formBasicProjectStart">
                        <Form.Label column sm={4}>Project Start</Form.Label>
                        <Col sm={10}>
                        <DatePicker 
                            locale={ko}
                            placeholderText="Project Start"
                            selected={projectStart}
                            onChange={date => setProjectStart(date)}
                            dateFormat="yyyy-MM-dd"
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId = "formBasicProjectEnd">
                        <Form.Label column sm={4}>Project End</Form.Label>
                        <Col sm={10}> 
                        <DatePicker
                            locale={ko}
                            placeholderText="Project End"
                            selected={projectEnd}
                            onChange={date => setProjectEnd(date)}
                            dateFormat="yyyy-MM-dd"
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2}}>
                        <Button variant = "secondary" type = "submit">
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
                        variant="outline-secondary"
                        size="sm"
                        type="button"
                        onClick={showProject}
                    >
                        show
                    </Button>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        type="button"
                        onClick={function(e) {
                        e.preventDefault();
                            setRegister(!register);
                        }}
                    >
                        register
                    </Button>
                </ButtonGroup>
                { register ?
                    <RegisterProjectList
                        onChangeRegister={function(_mode) {
                            setRegister(_mode)
                        }}
                    />
                : null }
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
        </div>
    )
}