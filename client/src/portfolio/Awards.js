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

const url = 'http://localhost:5000';
const access_token = localStorage.getItem("access_token");
const email = localStorage.getItem('email');

function AwardList(props) {
    const classes = useStyles()
    const data = props.data;
    const data_id = data[0];

    const deleteAward = () => {
        axios.delete(url+'/portfolio/awards', {
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
                <Typography variant="h6" fontWeight="fontWeightBold" gutterBottom>
                    Award Name
                </Typography>
                <Typography variant="body1">{data[1]}</Typography>
                <Typography variant="h6" fontWeight="fontWeightBold" gutterBottom>
                    Award Description
                </Typography>
                <Typography variant="body1">{data[2]}</Typography>
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
                onClick={deleteAward}
            >
                delete
            </Button>
        </>
    )
}

function EditAwardList(props) {
    const [awardName, setAwardName] = useState('');
    const [awardDesc, setAwardDesc] = useState('');

    const dataId = props.dataId;

    const modifyAward = (e) => {
        e.preventDefault();
        let putAwardData = new FormData();
        putAwardData.append('data_id', dataId);
        putAwardData.append('awardName', awardName);
        putAwardData.append('awardDesc', awardDesc);
        axios.put(url+'/portfolio/awards', putAwardData, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        .then( response => {
            if (response.data.status === "success") {
                console.log(response);
                alert("Success modification for awards info!");
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
                <hr/>
                <Form
                    onSubmit = {modifyAward}
                >
                    <Badge variant="secondary">Awards Modify</Badge>
                    <Form.Group as={Row} controlId = "formBasicAwardName">
                        <Form.Label column sm={2}>Award Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter award name"
                                name = "awardName"
                                onChange = {(e) => setAwardName(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId = "formBasicAwardDesc">
                        <Form.Label column sm={2}>Description</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter award description"
                                name = "awardDescr"
                                onChange = {(e) => setAwardDesc(e.target.value)}
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
        </>
    )
}

function RegisterAwardList(props) {
    const [awardName, setAwardName] = useState('');
    const [awardDesc, setAwardDesc] = useState('');

    const registerAward = (e) => {
        e.preventDefault();
        let postAwardData = new FormData();
        postAwardData.append('user_email', email);
        postAwardData.append('awardName', awardName);
        postAwardData.append('awardDesc', awardDesc);
        axios.post(url+'/portfolio/awards', postAwardData, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        .then( response => {
            if (response.data.status === "success") {
                console.log(response);
                alert("Success registragion for awards info!");
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
        <>
            <Container>
                <hr/>
                <Form
                    onSubmit = {registerAward}
                >
                    <Badge variant="secondary">Awards Register</Badge>
                    <Form.Group as={Row} controlId = "formBasicAwardName">
                        <Form.Label column sm={4}>Award Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter award name"
                                name = "awardName"
                                onChange = {(e) => setAwardName(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId = "formBasicAwardDesc">
                        <Form.Label column sm={4}>Description</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter award description"
                                name = "awardDescr"
                                onChange = {(e) => setAwardDesc(e.target.value)}
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
        </>
    )

}

export default function Awards() {
    const [awardData, setAwardData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [register, setRegister] = useState(false);
    const [dataId, setDataId] = useState();

    const showAward = () => {
        axios.get(url+'/portfolio/awards', {
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
                setAwardData(response.data.result);
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
                <Badge variant="secondary">Awards</Badge>
            </h4>
                <ButtonGroup variant="lignt">
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        type="button"
                        onClick={showAward}
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
                    <RegisterAwardList 
                        onChangeRegister={function(_mode) {
                            setRegister(_mode);
                        }}
                    />
                : null}
                {
                    awardData.map((data) => (
                        <ol key={data.toString()}>
                            <AwardList
                                data={data}
                                onChangeEdit={function(_mode) {
                                    setEdit(_mode);
                                }}
                                onChangeEditId={function(_editId) {
                                    setDataId(_editId)
                                }}
                            />
                        </ol>
                    ))
                }
                { edit ?
                    <EditAwardList 
                        dataId={dataId}
                        onChangeEdit={function(_mode) {
                            setEdit(_mode);
                        }}
                    />
                : null }
        </div>
    )
}