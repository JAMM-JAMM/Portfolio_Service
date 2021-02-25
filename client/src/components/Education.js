import React, { useState } from 'react';
import ReadEdu from './ReadEdu';
import RegisterEdu from './RegisterEdu';

export default function Education() {
    const [eduMode, setEduMode] = useState("READEDU");
    let eduArticle = null;
    if (eduMode === "READEDU") {
        eduArticle = <ReadEdu 
                        onChangeMode = {function(_mode) {
                            setEduMode(_mode);
                        }}
                    />
    } else if (eduMode === "REGISTEREDU") {
        eduArticle = <RegisterEdu 
                        onChangeMode = {function(_mode) {
                            setEduMode(_mode);
                        }}
                    />
    }
    return (
        <>
            {eduArticle}
        </>
    );
}