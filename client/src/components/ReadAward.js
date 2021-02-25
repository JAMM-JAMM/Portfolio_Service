import { Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

export default function ReadAward(props) {
    const awardUrl = "http://localhost:5000/portfolio/awards";
    const [awardInfo, setAwardInfo] = useState([]);

    const FetchAwardInfo = async() => {
        try {
            await axios.get(awardUrl)
                .then( response => {
                    setAwardInfo(response.data.result);
                    console.log('response: ', JSON.stringify(response));
                })
        } catch (error) {
            console.log("error: ", error);
        }
    }

    let awardInfoList = [];
    for (var i=0; i<awardInfo.length; i++) {
        awardInfoList.push(
            <li key = {awardInfo[i][0]}>
                {awardInfo[i][1]}
                {awardInfo[i][2]}
            </li>
        )
    }

    return (
            <>
                <Form>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={function(){
                            FetchAwardInfo();
                        }}
                    >
                        수상정보 보기
                    </Button>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={function(){
                            props.onChangeMode('REGISTERAWARD')
                        }}
                    >
                        수상정보 등록
                    </Button>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={function(){

                        }}
                    >
                        수상정보 수정
                    </Button>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={function(){

                        }}
                    >
                        수상정보 삭제
                    </Button>
                </Form>
                <h4>수상정보</h4>
                <div>{awardInfoList}</div>
            </>
    )
}