import { Form, Button } from 'react-bootstrap';

export default function Control(props) {
    return (
            <Form>
                <Button 
                    variant="primary" 
                    type="button"
                    onClick = {function() {
                    props.onChangeMode('LOGIN')
                    }}   
                >
                    Login
                </Button>
                <Button
                    variant="primary"
                    type="button"
                    onClick = {function() {
                    props.onChangeMode('REGISTER')
                    }}
                >
                        Register
                </Button>
            </Form>
    )
}