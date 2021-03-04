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

function CertificateList(props) {
    const data = props.data;
    const data_id = data[0];

    const deleteCertificate = () => {
        axios.delete(url+'/portfolio/certificate', {
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
            alert("There is no certificate info!")
        })
    }

    return (
        <>
            <ListGroup variant="flush">
                <ListGroup.Item>Certificate Name: {data[1]}</ListGroup.Item>
                <ListGroup.Item>Certificate Provider: {data[2]}</ListGroup.Item>
                <ListGroup.Item>Issue Date: {moment(data[3]).format("YYYY-MM-DD")}</ListGroup.Item>
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
                onClick={deleteCertificate}
            >
                delete
            </Button>
        </>
    )
}

function EditCertificateList(props) {
    const [certificateName, setcertificateName] = useState("");
    const [certificateProvider, setcertificateProvider] = useState("");
    const [certificateIssueDate, setcertificateIssueDate]=  useState(new Date());

    const dataId = props.dataId;

    const modifyCertificate = (e) => {
        e.preventDefault();
        let putCertificateData = new FormData();
        putCertificateData.append('data_id', dataId);
        putCertificateData.append('certificateName', certificateName);
        putCertificateData.append('certificateProvider', certificateProvider);
        putCertificateData.append('certificateIssueDate', moment(certificateIssueDate).format("YYYY-MM-DD"));
        axios.put(url+'/portfolio/certificate', putCertificateData, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        .then( response => {
            if (response.data.status === "success") {
                console.log(response);
                alert("Success modification for certificate info!");
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
                    onSubmit = {modifyCertificate}
                >
                    <h4>
                        <Badge variant="secondary">Certificate Modify</Badge>
                    </h4>
                    <Form.Group as={Row} controlId = "formBasiccertificateNameame">
                        <Form.Label column sm={4}>Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter certificate name"
                                name = "certificateNameame"
                                onChange = {(e) => setcertificateName(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId = "formBasiccertificateProviderrovider">
                        <Form.Label column sm={4}>Provider</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter certificate description"
                                name = "certificateDesc"
                                onChange = {(e) => setcertificateProvider(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <DatePicker 
                            locale={ko}
                            placeholderText="Issue date"
                            selected={certificateIssueDate}
                            onChange={date => setcertificateIssueDate(date)}
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

function RegisterCertificateList(props) {
    const [certificateName, setcertificateName] = useState("");
    const [certificateProvider, setcertificateProvider] = useState("");
    const [certificateIssueDate, setcertificateIssueDate]=  useState(new Date());

    const registerCertificate = (e) => {
        e.preventDefault();
        let postCertificateData = new FormData();
        postCertificateData.append('user_email', email);
        postCertificateData.append('certificateName', certificateName);
        postCertificateData.append('certificateProvider', certificateProvider);
        postCertificateData.append('certificateIssueDate', moment(certificateIssueDate).format("YYYY-MM-DD"));
        axios.post(url+'/portfolio/certificate', postCertificateData, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        .then( response => {
            if (response.data.status === "success") {
                console.log(response);
                alert("Success registragion for certificate info!");
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
                    onSubmit = {registerCertificate}
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
                                onChange = {(e) => setcertificateName(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId = "formBasiccertificateProviderrovider">
                        <Form.Label column sm={4}>Provider</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type = "text"
                                placeholder = "Enter project provider"
                                name = "certificate Provider"
                                onChange = {(e) => setcertificateProvider(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <DatePicker 
                            locale={ko}
                            placeholderText="Issue date"
                            selected={certificateIssueDate}
                            onChange={date => setcertificateIssueDate(date)}
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

export default function Certificate() {
    const [certificateData, setCertificateData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [register, setRegister] = useState(false);
    const [dataId, setDataId] = useState();

    const showCertificate = () => {
        axios.get(url+'/portfolio/certificate', {
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
                setCertificateData(response.data.result);
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
                <Badge variant="secondary">Certificates</Badge>
            </h4>
                <ButtonGroup variant="light">
                    <Button
                        variant="outline-primary"
                        size="sm"
                        type="button"
                        onClick={showCertificate}
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
                    certificateData.map((data) => (
                        <ol key={data.toString()}>
                            <CertificateList 
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
                    <EditCertificateList 
                        dataId={dataId}
                        onChangeEdit={function(_mode) {
                            setEdit(_mode);
                        }}
                    />
                : null }
                { register ?
                    <RegisterCertificateList 
                        onChangeRegister={function(_mode) {
                            setRegister(_mode)
                        }}
                    />
                : null }
        </div>
    )
}