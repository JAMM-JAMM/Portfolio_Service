import React from 'react';
import Education from './Education';
import Awards from './Awards';
import { Container } from 'react-bootstrap';

export default function Portfolio() {
    return (
        <Container>
            <Education />
            <Awards />
        </Container>
    )
}