import { Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

export default function ReadEdu(props) {
    const eduUrl = "http://localhost:5000";
    const [eduInfo, setEduInfo] = useState([]);
    
    const FetchEduInfo = async () => {
        try {
            await axios.get(eduUrl+'/portfolio/education')
                .then( response => {
                    setEduInfo(response.data.result);
                    console.log('response: ', JSON.stringify(response));
                })
        } catch (error) {
            console.log("error: ", error);
        }
    };

    let eduInfoList = [];
    for (var i=0; i<eduInfo.length; i++) {
        eduInfoList.push(
            <li key={eduInfo[i][0]}>
                {eduInfo[i][1]}
                {eduInfo[i][2]}
                {eduInfo[i][3]}
            </li>
        );
    }

    return (
            <>
                <Form>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={function(){
                            FetchEduInfo();
                        }}
                    >
                        학력정보 보기
                    </Button>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={function(){
                            props.onChangeMode('REGISTEREDU')
                        }}
                    >
                        학력정보 등록
                    </Button>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={function(){

                        }}
                    >
                        학력정보 수정
                    </Button>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={function(){

                        }}
                    >
                        학력정보 삭제
                    </Button>
                </Form>
                <h4>학력</h4>
                <div>{eduInfoList}</div>
            </>
    );
}