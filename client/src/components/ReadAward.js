import { Container, ListGroup } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const awardUrl = 'http://localhost:5000';

export default function ReadArticle(props) {
    const [awardName, setAwardName] = useState('');
    const [awardDesc, setAwardDesc] = useState('');

    useEffect(() => {
        axios.get(awardUrl+'/portfolio/awards', {
            params: {
                user_email: localStorage.getItem('email')
            }
        })
        .then( response => {
            console.log(response);
            setAwardName(response.data.result[0][1]);
            setAwardDesc(response.data.result[0][2]);
        })
    }, [awardName, awardDesc])
    return (
        <>
            <Container>
                <ListGroup variant="flush">
                    <ListGroup.Item>수상 내역: {awardName}</ListGroup.Item>
                    <ListGroup.Item>상세 내역: {awardDesc}</ListGroup.Item>
                </ListGroup>
            </Container>
        </>
    )
}