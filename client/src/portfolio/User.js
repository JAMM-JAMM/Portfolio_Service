import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Badge, ButtonGroup, Row, Col, Jumbotron, Container } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as moment from 'moment';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
    },
  }))

const url = 'http://localhost:5000';
const access_token = localStorage.getItem("access_token");

export default function User() {
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [edu, setEdu] = useState([]);
    const [award, setAward] = useState([]);
    const [project, setProject] = useState([]);
    const [certificate, setCertificate] = useState([]);
    const location = useLocation()
    const history = useHistory()
    const classes = useStyles()

    useEffect(() => {

        if (location.state === undefined) {
            console.log(location.state)
            history.push("/network");
        } else {
            console.log(location.state)
            setUserEmail(location.state.email)
            setUserName(location.state.name)
        }
    }, [history, location.state])

    const showEdu = () => {
        axios.get(url+'/portfolio/education', {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: {
                user_email: userEmail
            }
        })
        .then( response => {
            if (response.data.status === "success") {
                console.log(response);
                setEdu(response.data.result);
            } else {
                alert(response.data.message)
            }
        })
        .catch( error => {
            console.log("error: ", error);  
        })
    }
    const showAward = () => {
        axios.get(url+'/portfolio/awards', {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: {
                user_email: userEmail
            }
        })
        .then( response => {
            if (response.data.status === "success") {
                console.log(response);
                setAward(response.data.result);
            } else {
                alert(response.data.message)
            }
        })
        .catch( error => {
            console.log("error: ", error);  
        })
    }
    const showProject = () => {
        axios.get(url+'/portfolio/project', {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: {
                user_email: userEmail
            }
        })
        .then( response => {
            if (response.data.status === "success") {
                console.log(response);
                setProject(response.data.result);
            } else {
                alert(response.data.message)
            }
        })
        .catch( error => {
            console.log("error: ", error);  
        })
    }
    const showCertificate = () => {
        axios.get(url+'/portfolio/certificate', {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: {
                user_email: userEmail
            }
        })
        .then( response => {
            if (response.data.status === "success") {
                console.log(response);
                setCertificate(response.data.result);
            } else {
                alert(response.data.message)
            }
        })
        .catch( error => {
            console.log("error: ", error);  
        })
    }
    return (
        <>
            <Container>
            <Col>
            <br/>
                <Jumbotron>
                    <h2>Elice Racer {userName}'s portfolio</h2><br/>
                    <h5>You cannot modify this portfolio.</h5>
                </Jumbotron>
            </Col>
            <ButtonGroup variant="light">
                <Button
                    variant="outline-secondary"
                    size="sm"
                    type="button"
                    onClick={showEdu}
                >
                    Edu
                </Button>
                <Button
                    variant="outline-secondary"
                    size="sm"
                    type="button"
                    onClick={showAward}
                >
                    Award
                </Button>
                <Button
                    variant="outline-secondary"
                    size="sm"
                    type="button"
                    onClick={showProject}
                >
                    Project
                </Button>
                <Button
                    variant="outline-secondary"
                    size="sm"
                    type="button"
                    onClick={showCertificate}
                >
                    Certificate
                </Button>
            </ButtonGroup>
            <hr/>
            <Row>
            <Col>
            <h4>
                <Badge variant="secondary">Academic Background</Badge>
            </h4>
            {
                edu.map((data) => (
                    <div key={data.toString()}>
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
                    </div>
                ))
            }
            </Col>
            <br/>
            <Col>
            <h4>
                <Badge variant="secondary">Awards</Badge>
            </h4>
            {
                award.map((data) => (
                    <div key={data.toString()}>
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
                    </div>
                ))
            }
            </Col>
            </Row>
            <hr/>
            <Row>
            <Col>
            <h4>
                <Badge variant="secondary">Projects</Badge>
            </h4>
            {
                project.map((data) => (
                    <div key={data.toString()}>
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
                    </div>
                ))
            }
            </Col>
            <br/>
            <Col>
            <h4>
                <Badge variant="secondary">Certificates</Badge>
            </h4>
            {
                certificate.map((data) => (
                    <div key={data.toString()}>
                        <Paper elevation={3} className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                Certificate Name
                            </Typography>
                            <Typography variant="body1">{data[1]}</Typography>
                            <Typography variant="h6" gutterBottom>
                                Certificate Provider
                            </Typography>
                            <Typography variant="body1">{data[2]}</Typography>
                            <Typography variant="h6" gutterBottom>
                                Certificate Issue Date
                            </Typography>
                            <Typography variant="body1">{moment(data[3]).format("YYYY-MM-DD")}</Typography>
                        </Paper>
                        <br/>
                    </div>
                ))
            }
            </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    <br/>
                    <br/>
                    <br/>
                </Col>
            </Row>
            </Container>
        </>
    )
}