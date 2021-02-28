import { Button, ButtonGroup } from 'react-bootstrap';
import React, { useState } from 'react';
import ReadEdu from './ReadEdu';
import RegisterEdu from './RegisterEdu';

export default function Education() {
    const [eduMode, setEduMode] = useState("");
    let eduArticle = null;
    if (eduMode === "READEDU") {
        eduArticle = <ReadEdu />
    } else if (eduMode === "REGISTEREDU") {
        eduArticle = <RegisterEdu 
                        onChangeMode = {function(_mode) {
                            setEduMode(_mode);
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
                    setEduMode("READEDU");
                }}
            >
                학력정보 보기
            </Button>
            <Button
                variant="outline-primary"
                size="sm"
                type="button"
                onClick={function(){
                    setEduMode("REGISTEREDU");
                }}
            >
                학력정보 등록
            </Button>
            <Button
                variant="outline-primary"
                size="sm"
                type="button"
                onClick={function(){

                }}
            >
                학력정보 수정
            </Button>
            <Button
                variant="outline-primary"
                size="sm"
                type="button"
                onClick={function(){

                }}
            >
                학력정보 삭제
            </Button>
        </ButtonGroup>{' '}
        {eduArticle}
        </>
    );
}