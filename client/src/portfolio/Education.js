import React, { useState } from 'react';
import axios from 'axios';
import { Button, Badge, ListGroup, ButtonGroup } from 'react-bootstrap';
import RegisterEdu from './RegisterEdu';
import ModifyEdu from './ModifyEdu';

const eduUrl = 'http://localhost:5000';

export default function Education() {
    const [eduMode, setEduMode] = useState('READEDU');
    const [university, setUniversity] = useState('');
    const [major, setMajor] = useState('');
    const [degree, setDegree] = useState('');

    let eduArticle = null;

    const showEdu = async (e) => {
            try {
                await axios.get(eduUrl+'/portfolio/education', {
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
                alert("Register Academic Background Info!")
            }
            setEduMode("READEDU")
    }

    const deleteEdu = async (e) => {
        try {
            await axios.delete(eduUrl+'/portfolio/education', {
                params: {
                    user_email: localStorage.getItem('email')
                }
            })
            .then( response => {
                setUniversity('');
                setMajor('');
                setDegree('');
                alert("Delete Success!");
                })
        } catch (error) {
            console.log("error: ", error);
            alert("There is no acdemic background info");
        }
        setEduMode("READEDU")
    }    

    if (eduMode === "REGISTEREDU") {
        eduArticle = <RegisterEdu
                        onChangeMode = {function(_mode) {
                            setEduMode(_mode)
                        }}
                    />
    } else if (eduMode === "MODIFYEDU") {
        eduArticle = <ModifyEdu 
                        onChangeMode = {function(_mode) {
                            setEduMode(_mode)
                        }}
                    />
    }

    return (
            <div>
                <h4>
                   <Badge variant="secondary">Academic Background</Badge>
                </h4>
                    <ButtonGroup variant="light">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            type="button"
                            onClick={showEdu}
                        >
                            show
                        </Button>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            type="button"
                            onClick={function(e) {
                                e.preventDefault();
                                setEduMode("REGISTEREDU");
                            }}
                        >
                            register
                        </Button>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            type="button"
                            onClick={function(e) {
                                e.preventDefault();
                                setEduMode("MODIFYEDU");
                            }}
                        >
                            modify
                        </Button>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            type="button"
                            onClick={deleteEdu}
                        >
                            delete
                        </Button>
                    </ButtonGroup>
                    <ListGroup variant="flush">
                        <ListGroup.Item>University: {university}</ListGroup.Item>
                        <ListGroup.Item>Major: {major}</ListGroup.Item>
                        <ListGroup.Item>Degree: {degree}</ListGroup.Item>
                    </ListGroup>
                    {eduArticle}
            </div>  
    );
}