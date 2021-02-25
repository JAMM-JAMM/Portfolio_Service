import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export default function Control(props) {
    return (
            <Form >
                <Button 
                    variant="outline-primary" 
                    type="button"
                    onClick = {function() {
                    props.onChangeMode('LOGIN')
                    }}   
                >
                    Login
                </Button>{' '}
                <Button
                    variant="outline-primary"
                    type="button"
                    onClick = {function() {
                    props.onChangeMode('REGISTER')
                    }}
                >
                        Register
                </Button>{' '}
                <Button
                    variant="outline-primary"
                    type="button"
                    onClick = {async function(e) {
                        e.preventDefault();
                        try {
                            await axios.get("http://localhost:5000/auth/logout")
                                .then ( response => {
                                    console.log('response: ', JSON.stringify(response));
                                })
                        } catch (error) {
                            console.log("error: ", error);
                        }
                        if (window.sessionStorage['session']) {
                            window.sessionStorage.clear();
                        }
                        props.onChangeMode("HOME");
                    }}
                >
                        Logout
                </Button>
            </Form>
    )
}