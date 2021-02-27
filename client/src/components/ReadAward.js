import { Container, ListGroup } from 'react-bootstrap';
import React from 'react';

export default function ReadArticle(props) {
    return (
        <>
            <Container>
                <ListGroup variant="flush">
                    <ListGroup.Item>수상 내역</ListGroup.Item>
                    <ListGroup.Item>상세 내역</ListGroup.Item>
                </ListGroup>
            </Container>
        </>
    )
}