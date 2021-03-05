import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Badge, ButtonGroup } from 'react-bootstrap';
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
    },
  }))

const eduUrl = 'http://localhost:5000';
const access_token = localStorage.getItem("access_token");
const email = localStorage.getItem('email');

function EduList(props) {
    const classes = useStyles()
    const data = props.data;
    const data_id = data[0]
    
    const deleteEdu = () => {
        axios.delete(eduUrl+'/portfolio/education', {
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
            alert("There is no education info!")
        })
    }
    return (
        <>  
            <br/>
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" gutterBottom>
                        University
                    </Typography>
                    <Typography variant="body1">{data[1]}</Typography>
                    <Typography variant="h6" gutterBottom>
                        Major
                    </Typography>
                    <Typography variant="body1">{data[2]}</Typography>
                    <Typography variant="h6" gutterBottom>
                        Degree
                    </Typography>
                    <Typography variant="body1">{data[3]}</Typography>
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
                onClick={deleteEdu}
            >
                delete
            </Button>
        </>
    )
}

function EditEduList(props) {
    const [university, setUniversity] = useState('');
    const [major, setMajor] = useState('');
    const [degree, setDegree] = useState('');

    const dataId = props.dataId;

    const modifyEducation = (e) => {
        e.preventDefault();
        let putEduData = new FormData();
        putEduData.append('data_id', dataId);
        putEduData.append('university', university);
        putEduData.append('major', major);
        putEduData.append('degree', degree);
        axios.put(eduUrl+'/portfolio/education', putEduData, {
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
        <>
            <Container>
                <Form
                    onSubmit = {modifyEducation}
                >
                    <Badge variant="secondary">Academic Background Modify</Badge>
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
        </>
    )
}

function RegisterEduList(props) {
    const [university, setUniversity] = useState('');
    const [major, setMajor] = useState('');
    const [degree, setDegree] = useState('');

    const registerEducation = (e) => {
        e.preventDefault();
        let postEduData = new FormData();
        postEduData.append('user_email', email);
        postEduData.append('university', university);
        postEduData.append('major', major);
        postEduData.append('degree', degree);
        axios.post(eduUrl+'/portfolio/education', postEduData, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        .then( response => {
            if (response.data.status === "success") {
                console.log(response);
                alert("Success registragion for academic background info!");
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
                    onSubmit = {registerEducation}
                >
                    <Badge variant="secondary">Academic Background Register</Badge>
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
                        <Button variant = "secondary" type = "submit">
                            Register
                        </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
    )
}

export default function Education() {
    const [eduData, setEduData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [register, setRegister] = useState(false);
    const [dataId, setDataId] = useState();



    const showEdu = () => {
        axios.get(eduUrl+'/portfolio/education', {
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
                setEduData(response.data.result);
            }
        })
        .catch( error => {
            console.log("error: ", error);  
        })
        setEdit(false);
        setRegister(false);
    }

    return (
            <div>
                <h4>
                   <Badge variant="secondary">Academic Background</Badge>
                </h4>
                    <ButtonGroup variant="light">
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            type="button"
                            onClick={showEdu}
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
                        <RegisterEduList 
                            onChangeRegister={function(_mode) {
                                setRegister(_mode)
                            }}
                        />
                    : null }
                    {
                        eduData.map((data) => (
                            <ol key={data.toString()}>
                                <EduList 
                                    data = {data}
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
                        <EditEduList 
                            dataId = {dataId}
                            onChangeEdit={function(_mode) {
                                setEdit(_mode);
                            }}
                        />
                    : null }
            </div>  
    );
}