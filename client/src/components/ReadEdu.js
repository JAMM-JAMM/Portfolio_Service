import { Container, ListGroup } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const eduUrl = 'http://localhost:5000';

export default function ReadEdu(props) {
    const [university, setUniversity] = useState('');
    const [major, setMajor] = useState('');
    const [degree, setDegree] = useState('');

    useEffect(() => {
        try {
        axios.get(eduUrl+'/portfolio/education', {
            params: {
                user_email: localStorage.getItem('email')
            }
        })
        .then( response => {
            setUniversity(response.data.result[0][1]);
            setMajor(response.data.result[0][2]);
            setDegree(response.data.result[0][3]);
            })
        } catch (error) {
            console.log("error: ", error);
        }
        } 
        , [university, major, degree])
    return (
            <>
                <Container>
                    <ListGroup variant="flush">
                        <ListGroup.Item>학력</ListGroup.Item>
                        <ListGroup.Item>대학교: {university}</ListGroup.Item>
                        <ListGroup.Item>전공: {major}</ListGroup.Item>
                        <ListGroup.Item>학위: {degree}</ListGroup.Item>
                    </ListGroup>
                </Container>
            </>
    );
}
