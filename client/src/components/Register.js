import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

export default function Register(props) {
    
    return (
        <div>
            <Container>
                <h4>Register</h4>
                <Form
                    onSubmit = {async function(e) {
                        e.preventDefault();
                        let form = new FormData();
                        form.append('fullname', e.target.fullname.value);
                        form.append('email', e.target.email.value);
                        form.append('password', e.target.password.value);
                        try {
                            await axios.post("http://localhost:5000/auth/register", form)
                                .then( response => {
                                    console.log('response : ', JSON.stringify(response));
                                })
                        } catch (error) {
                            console.log("error: ", error);
                        }
                        e.target.reset();
                    }}
                    >   
                    <Form.Group controlId="formBasicFullname">
                        <Form.Label>Fullname</Form.Label>
                        <Form.Control 
                            type="fullname"
                            placeholder="Enter fullname"
                            name="fullname"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                        />
                        <Form.Text className="text-muted">
                            Check your email.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="confirm_password"
                        />
                        <Form.Text className="text-muted">
                            Check your password.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </Container>
        </div>
    )
}