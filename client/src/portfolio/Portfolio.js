import React from 'react';
import Education from './Education';
import Awards from './Awards';
import Project from './Project';
import Certificate from './Certificate';
import { Container } from 'react-bootstrap';

export default function Portfolio() {
    return (
        <Container>
            <Education />
            <Awards />
            <Project />
            <Certificate />
        </Container>
    )
}