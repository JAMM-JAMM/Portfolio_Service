import React, { useState } from 'react';
import axios from 'axios';
import { Button, Badge, ListGroup, ButtonGroup } from 'react-bootstrap';
import RegisterPro from './RegisterPro';
import ModifyPro from './ModifyPro';
import * as moment from 'moment';

const url = 'http://localhost:5000';

export default function Project() {
    const [proMode, setProMode] = useState("READPRO");
    const [projectName, setProjectName] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [projectStart, setProjectStart] = useState("");
    const [projectEnd, setProjectEnd] = useState("");

    let proArticle = null;

    const showPro = async (e) => {
        try {
            await axios.get(url+'/portfolio/project', {
                params: {
                    user_email: localStorage.getItem('email')
                }
            })
            .then( response => {
                setProjectName(response.data.result[0][1]);
                setProjectDesc(response.data.result[0][2]);
                setProjectStart(moment(response.data.result[0][3]).format("YYYY-MM-DD"));
                setProjectEnd(moment(response.data.result[0][4]).format("YYYY-MM-DD"));
            })
        } catch (error) {
            console.log("error: ", error);
            alert("Register Project Info!");
        }
        setProMode("READPRO");
    }

    const deletePro = async (e) => {
        try {
            await axios.delete(url+'/portfolio/project', {
                params: {
                    user_email: localStorage.getItem('email')
                }
            })
            .then( response => {
                setProjectName('');
                setProjectDesc('');
                setProjectStart('');
                setProjectEnd('');
                alert('Delete Success!')
            })
        } catch (error) {
            console.log("error: ", error);
            alert("There is no project info");
        }
        setProMode("READPRO");
    }

    if (proMode === "REGISTERPRO") {
        proArticle = <RegisterPro 
                        onChangeMode = {function(_mode) {
                            setProMode(_mode)
                        }}
                    />
    } else if (proMode === "MODIFYPRO") {
        proArticle = <ModifyPro 
                        onChangeMode = {function(_mode) {
                            setProMode(_mode)
                        }}
                    />
    }

    return (
        <div>
            <h4>
                <Badge variant="secondary">Project</Badge>
            </h4>
                <ButtonGroup variant="light">
                <Button
                        variant="outline-primary"
                        size="sm"
                        type="button"
                        onClick={showPro}
                    >
                        show
                    </Button>
                    <Button
                        variant="outline-primary"
                        size="sm"
                        type="button"
                        onClick={function(e) {
                            e.preventDefault();
                            setProMode("REGISTERPRO");
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
                            setProMode("MODIFYPRO");
                        }}
                    >
                        modify
                    </Button>
                    <Button
                        variant="outline-primary"
                        size="sm"
                        type="button"
                        onClick={deletePro}
                    >
                        delete
                    </Button>
                </ButtonGroup>
                <ListGroup variant="flush">
                    <ListGroup.Item>Project Name: {projectName}</ListGroup.Item>
                    <ListGroup.Item>Project Description:  {projectDesc}</ListGroup.Item>
                    <ListGroup.Item>Period: {projectStart} ~ {projectEnd}</ListGroup.Item>
                </ListGroup>
                {proArticle}
        </div>
    )
}