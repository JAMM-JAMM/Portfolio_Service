import axios from 'axios';


export default function Login(props) {
    return (
        <div>
            <h4>Login</h4>
            <form
                onSubmit = {async function(e) {
                    e.preventDefault();
                    let form = new FormData();
                    form.append('email', e.target.email.value);
                    form.append('password', e.target.password.value);
                    try {
                        await axios.post("http://localhost:5000/auth/login", form)
                            .then( response => {
                                console.log('response: ', JSON.stringify(response));
                            })
                    } catch (error) {
                        console.log("error: ", error);
                    }
                }}
            >
                <p>
                    ID: <input type="text" name="email" placeholder="email" />
                </p>
                <p>
                    PW: <input type="text" name="password" placeholder="password" />
                </p>
                <p>
                    <input type="submit" name="search" />
                </p>
            </form>
        </div>
    )
}