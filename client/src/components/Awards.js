import { Button, ButtonGroup } from 'react-bootstrap';
import React, { useState } from 'react';
import ReadAward from './ReadAward';
import RegisterAward from './RegisterAward';

export default function Award() {
    const [awardMode, setAwardMode] = useState("READAWARD");
    let awardArticle = null;
    if (awardMode === "READAWARD") {
        awardArticle = <ReadAward />
    } else if (awardMode === "REGISTEREDU") {
        awardArticle = <RegisterAward
                        onChangeMode = {function(_mode) {
                            setAwardMode(_mode);
                        }}
                    />
    }
    return (
        <>
            <ButtonGroup>
            <Button
                variant="outline-primary"
                size="sm"
                type="button"
                onClick={function(){
                    setAwardMode("READAWARD");
                }}
            >
                수상정보 보기
            </Button>
            <Button
                variant="outline-primary"
                size="sm"
                type="button"
                onClick={function(){
                    setAwardMode("REGISTEREDU");
                }}
            >
                수상정보 등록
            </Button>
            <Button
                variant="outline-primary"
                size="sm"
                type="button"
                onClick={function(){

                }}
            >
                수상정보 수정
            </Button>
            <Button
                variant="outline-primary"
                size="sm"
                type="button"
                onClick={function(){

                }}
            >
                수상정보 삭제
            </Button>
        </ButtonGroup>{' '}
        {awardArticle}
        </>
    );
}