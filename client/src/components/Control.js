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
                    onClick = {function(e) {
                        e.preventDefault();
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('email');
                        props.onChangeMode("HOME");
                    }}
                >
                        Logout
                </Button>
            </Form>
    )
}