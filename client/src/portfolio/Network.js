import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from '../auth/Login';
import { Button, Badge, ButtonGroup, Row, Col, Form, Container, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// https://gongbu-ing.tistory.com/45
const url = 'http://localhost:5000';
const access_token = localStorage.getItem("access_token");

function PortfolioList(props) {
    const user = props.user;

    const history = useHistory();
    const gotoUserPortfolio = (e) => {
        e.preventDefault();
        history.push(
            {
                pathname: "/user/" + user[0], 
                state: {
                    id: user[0],
                    name: user[1],
                    email: user[2]
                }
            }
        );
    }

    return (
        <>
            <br/>
            <Row>
                <Col>
                <Card>
                    <Card.Header>Elicer</Card.Header>
                    <Card.Body>
                        <Card.Title>{user[1]}</Card.Title>
                        <Card.Link onClick={gotoUserPortfolio}>User Portfolio Link</Card.Link>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </>
    )
}

export default function Network() {
    const [mode, setMode] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userPortfolio, setUserPortfolio] = useState([]);
    const [searchUser, setSearchUser] = useState('');
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/protected', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        .then( response => {
            console.log(response);
            setUserEmail(response.logged_in_as);
            setIsLogin(true);
        })
        .catch( error => {
            alert('Login, Please!');
            console.log(error);
        })
    }, [])

    const showUsers = (e) => {
        e.preventDefault();
        axios.get(url+'/network', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        .then( response => {
            if (response.data.status === "success") {
                console.log(response);
                setUserPortfolio(response.data.result);
                setMode("show")
            }
        })
        .catch( error => {
            console.log("error: ", error);
        })
    }

    const searchUsers = (e) => {
        e.preventDefault();
        axios.get(url+'/search', {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: {
                search: searchUser
            }
        })
        .then( response => {
            if (response.data.status === "success") {
                console.log(response);
                setSearchData(response.data.result)
                setMode("search")
            } else if (response.data.status === "failure") {
                alert(response.data.result)
            }
        })
        .catch( error => {
            console.log("error: ", error);
        })
    }

    return (
            <div>
                <Container>
                        { isLogin ?
                            <h4>
                                <Badge variant="secondary">network</Badge>
                            </h4>
                        : <Login />}
                        <br/>
                        <Form onSubmit={searchUsers}>
                                <Button
                                    className = "mb-2"
                                    variant="outline-secondary"
                                    size="sm"
                                    type="button"
                                    onClick={showUsers}
                                >
                                    show
                                </Button>
                                <hr/>
                                <Form.Group controlId="formSearch">
                                    <Form.Control 
                                        column sm={2}
                                        type="search"
                                        placeholder="Search User Name"
                                        name="search"
                                        onChange = {(e) => setSearchUser(e.target.value)}
                                    />
                                </Form.Group>{' '}
                                <Button
                                    variant="outline-secondary"
                                    type="submit"
                                    size="sm"
                                >
                                    search
                                </Button>
                        </Form>
                        <hr />
                        { mode === 'show' &&
                            userPortfolio.map((user) => (
                                <div className="col-sm-8" style={{ 'marginBottom' : '10px' }} key={user.toString()}>
                                    <PortfolioList 
                                        user={user}
                                    />
                                </div>
                            ))
                        }
                        { mode === 'search' &&
                            searchData.map((user) => (
                                <div className="col-sm-8" style={{ 'marginBottom' : '10px' }} key={user.toString()}>
                                    <PortfolioList 
                                        user={user}
                                    />
                                </div>
                            ))
                        }
                </Container>
            </div>
    )
}