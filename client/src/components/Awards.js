import React, { useState } from 'react';
import RegisterAward from './RegisterAward';
import ReadAward from './ReadAward';

export default function Awards() {
    const [awardMode, setAwardMode] = useState("READAWARD");
    let awardArticle = null;
    if (awardMode === "READAWARD") {
        awardArticle = <ReadAward
                        onChangeMode = {function(_mode) {
                            setAwardMode(_mode)
                        }}
                    />
    } else if (awardMode === "REGISTERAWARD") {
        awardArticle = <RegisterAward 
                        onChangeMode = {function(_mode) {
                            setAwardMode(_mode)
                        }}
                    />
    }
    return (
        <>
            {awardArticle}
        </>
    )
}