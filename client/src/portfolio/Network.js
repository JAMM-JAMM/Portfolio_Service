import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from '../auth/Login';
import { Button, Badge, CardDeck, Row, Spinner, Alert, Jumbotron, Col, Form, Container, Card } from 'react-bootstrap';
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
            <Card style = {{ width: '20rem'}}>
                <Card.Img variant="top" src="image/notebook.jpg"/>
                <Card.Header>Elicer</Card.Header>
                <Card.Body>
                    <Card.Title>{user[1]}</Card.Title>
                    <Card.Link onClick={gotoUserPortfolio}>User Portfolio Link</Card.Link>
                </Card.Body>
            </Card>
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
    const history = useHistory();

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
            localStorage.clear();
            console.log(error);
            history.push('/login')
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
        if (searchUser.length < 2) {
            alert("Please enter at least 2 characters.")
        } else {
            axios.get(url+'/search', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                params: {
                    search: searchUser
                }
            })
            .then( response => {
                if (response.data.result.length !== 0) {
                    console.log(response);
                    setSearchData(response.data.result)
                    setMode("search")
                } else if (response.data.result.length === 0) {
                    alert("There is no search data")
                }
            })
            .catch( error => {
                console.log("error: ", error);
            })
        }
    }

    return (
            <div>
                { isLogin &&
                    <Container>
                        <Col>
                        <br/>
                            <Jumbotron>
                                <h2>Network page</h2><br/>
                                <h5>See the portfolio of users on this page.</h5>
                                <h5>Also, search for user's name to view their portfolio</h5>
                            </Jumbotron>
                        </Col>
                        <h4>
                            <Badge variant="secondary">network</Badge>
                        </h4>
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
                        <center>
                        { mode === 'show' &&
                            userPortfolio.map((user) => (
                                <div className="col-sm-8" style={{ 'marginBottom' : '10px' }} key={user.toString()}>
                                    <CardDeck>
                                        <PortfolioList 
                                            user={user}
                                        />
                                    </CardDeck>
                                </div>
                            ))
                        }
                        { mode === 'search' &&
                            searchData.map((user) => (
                                <div className="col-sm-8" style={{ 'marginBottom' : '10px' }} key={user.toString()}>
                                    <CardDeck>
                                        <PortfolioList 
                                            user={user}
                                        />
                                    </CardDeck>
                                </div>
                            ))
                        }
                        </center>
                        <hr/>
                        <Row>
                            <Col>
                                <br/>
                                <br/>
                                <br/>
                            </Col>
                        </Row>
                    </Container>   
                }
                { !isLogin &&
                    <Container>
                        <br/>
                        <br/>
                        <center>
                        <Spinner animation="border" />
                        </center>
                    </Container>
                }
            </div>
    )
}