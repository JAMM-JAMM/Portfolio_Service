import { Container, ListGroup } from 'react-bootstrap';
import React from 'react';

export default function ReadEdu(props) {
    return (
            <>
                <Container>
                    <ListGroup variant="flush">
                        <ListGroup.Item>학력</ListGroup.Item>
                        <ListGroup.Item>대학교</ListGroup.Item>
                        <ListGroup.Item>전공</ListGroup.Item>
                        <ListGroup.Item>학위</ListGroup.Item>
                    </ListGroup>
                </Container>
            </>
    );
}
