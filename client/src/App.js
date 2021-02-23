import React, { useState } from 'react';
import Control from './components/Control';
import Login from './components/Login';
import Register from './components/Register';

function Home() {
    var [mode, setMode] = useState();
    var article = null;
    if (mode === "LOGIN") {
        article = <Login />
    } else if (mode === "REGISTER") {
        article = <Register />
    }
    return (
        <>  <h3>Racer Portfolio Service</h3>
            {article}
            <Control 
                onChangeMode = {function(_mode) {
                    setMode(_mode);
                }}
            />
        </>
    )
}

export default Home;